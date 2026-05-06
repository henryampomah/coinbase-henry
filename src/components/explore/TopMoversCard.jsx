import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { topMovers } from "../../data/exploreData";
import { cryptoService } from "../../services/cryptoService";
import { formatUsdPrice, formatPctChange, changeToneClass } from "../../utils/cryptoFormat";

function MoverAvatar({ image, letter, color }) {
  const [broken, setBroken] = useState(false);
  if (image && !broken) {
    return (
      <img
        src={image}
        alt=""
        className="w-10 h-10 rounded-full object-cover mb-3 bg-gray-100"
        onError={() => setBroken(true)}
      />
    );
  }
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3"
      style={{ backgroundColor: color }}
    >
      {letter}
    </div>
  );
}

const TopMoversCard = () => {
  const [idx, setIdx] = useState(0);
  const [movers, setMovers] = useState(topMovers);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    const loadGainers = async () => {
      try {
        setLoading(true);
        const data = await cryptoService.getGainers();
        if (Array.isArray(data)) {
          if (data.length > 0) {
            const sorted = [...data].sort(
              (a, b) => (Number(b.change24h) || 0) - (Number(a.change24h) || 0)
            );
            setMovers(
              sorted.map((item) => ({
                id: item._id,
                ticker: item.symbol,
                name: item.name,
                change: Number(item.change24h) || 0,
                priceUsd: Number(item.price) || 0,
                color: "#0052ff",
                letter: (item.symbol || "?").slice(0, 1).toUpperCase(),
                image: item.image,
              }))
            );
          } else {
            setMovers([]);
          }
          setFromApi(true);
        } else {
          setFromApi(false);
        }
      } catch (error) {
        console.error("Failed to load gainers", error);
        setFromApi(false);
      } finally {
        setLoading(false);
      }
    };

    loadGainers();
  }, []);

  const shift = (dir) => {
    if (movers.length <= 2) return;
    setIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return movers.length - 2;
      if (next > movers.length - 2) return 0;
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
          Top movers
        </h3>
        <div className="flex gap-2">
          <button onClick={() => shift(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button onClick={() => shift(1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">24hr change · from GET /crypto/gainers</p>
      {loading && <p className="text-sm text-gray-400 mb-3">Loading top gainers…</p>}
      {!loading && fromApi && movers.length === 0 && (
        <p className="text-sm text-gray-500">No positive 24h movers in the database yet.</p>
      )}
      <div className="flex gap-3 overflow-hidden">
        {movers.slice(idx, idx + 2).map((m) => (
          <div key={m.id || m.ticker} className="flex-1 bg-gray-50 rounded-xl p-4 min-w-0">
            <MoverAvatar image={m.image} letter={m.letter} color={m.color} />
            <p className="text-sm font-semibold text-gray-700">{m.ticker}</p>
            {m.name && <p className="text-xs text-gray-500 truncate">{m.name}</p>}
            <p className={`text-sm font-bold mt-1 ${changeToneClass(m.change)}`}>
              {formatPctChange(m.change)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {fromApi ? `$${formatUsdPrice(m.priceUsd)}` : m.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMoversCard;
