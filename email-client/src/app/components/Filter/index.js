import { useEmailListStore } from "@/store/useEmailListStore";
import { useState } from "react";

const Filter = ({ setShowEmailBody }) => {
  const { setCurrentFilter } = useEmailListStore();
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setShowEmailBody(false);
    setActiveFilter(filter);
  };

  const buttonClass = (filter) =>
    `${
      activeFilter === filter
        ? "bg-[#E1E4EA] text-[#636363] border border-[#CFD2DC]"
        : "bg-[#f4f5f9] text-black border border-transparent"
    } px-3 rounded-2xl`;

  return (
    <div className="flex gap-5 text-lg text-[#636363] items-center">
      <span className="pr-3">Filter By: </span>
      <button
        onClick={() => handleFilterChange("all")}
        className={buttonClass("all")}
      >
        All
      </button>
      <button
        onClick={() => handleFilterChange("unread")}
        className={buttonClass("unread")}
      >
        Unread
      </button>
      <button
        onClick={() => handleFilterChange("read")}
        className={buttonClass("read")}
      >
        Read
      </button>
      <button
        onClick={() => handleFilterChange("favorites")}
        className={buttonClass("favorites")}
      >
        Favorites
      </button>
    </div>
  );
};

export default Filter;
