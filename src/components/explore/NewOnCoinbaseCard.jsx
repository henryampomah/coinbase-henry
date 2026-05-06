import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { newOnCoinbase } from "../../data/exploreData";
import { cryptoService } from "../../services/cryptoService";

function ListingAvatar({ image, letter, color }) {
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

const NewOnCoinbaseCard = () => {
  const [idx, setIdx] = useState(0);
  const [newListings, setNewListings] = useState(newOnCoinbase);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    const loadNewListings = async () => {
      try {
        setLoading(true);
        const data = await cryptoService.getNewListings();
        if (Array.isArray(data)) {
          if (data.length > 0) {
            setNewListings(
              data.map((item) => ({
                id: item._id,
                ticker: item.symbol,
                name: item.name,
                date: item.createdAt
                  ? `Added ${new Date(item.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
                  : "Recently added",
                color: "#0052ff",
                letter: (item.symbol || "?").slice(0, 1).toUpperCase(),
                image: item.image,
              }))
            );
          } else {
            setNewListings([]);
          }
          setFromApi(true);
        }
      } catch (error) {
        console.error("Failed to load new listings", error);
        setFromApi(false);
      } finally {
        setLoading(false);
      }
    };

    loadNewListings();
  }, []);

  const shift = (dir) => {
    if (newListings.length <= 2) return;
    setIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return newListings.length - 2;
      if (next > newListings.length - 2) return 0;
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
          New on Coinbase
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
      <p className="text-sm text-gray-500 mb-4">from GET /crypto/new</p>
      {loading && <p className="text-sm text-gray-400 mb-3">Loading new listings…</p>}
      {!loading && fromApi && newListings.length === 0 && (
        <p className="text-sm text-gray-500">No new listings yet. Add an asset in the table section.</p>
      )}
      <div className="flex gap-3 overflow-hidden">
        {newListings.slice(idx, idx + 2).map((n) => (
          <div key={n.id || n.ticker} className="flex-1 bg-gray-50 rounded-xl p-4 min-w-0">
            <ListingAvatar image={n.image} letter={n.letter} color={n.color} />
            <p className="text-xs text-gray-500 uppercase">{n.ticker}</p>
            <p className="text-sm font-bold text-gray-900">{n.name}</p>
            <p className="text-xs text-gray-400 mt-1">{n.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewOnCoinbaseCard;
