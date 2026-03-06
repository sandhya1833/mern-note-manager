import React, { useRef } from "react";

const FilterComponent = ({ setFilterStatus, filterStatus }) => {
  const detailsRef = useRef(null);

  const filters = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
    { label: "Asc", value: "asc" },
    { label: "Desc", value: "desc" },
    { label: "Listing By Category", value: "category" },
  ];

  const handleClick = (value) => {
    setFilterStatus(value);
    if (detailsRef.current) detailsRef.current.open = false; // auto close dropdown
  };

  return (
    <div className="w-full">
      {/* Mobile Dropdown */}
      <details
        ref={detailsRef}
        className="dropdown w-full max-[425px]:block min-[426px]:hidden"
      >
        <summary className="btn btn-outline btn-sm w-full">Filters</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box w-full p-2 shadow-md mt-2 z-10">
          {filters.map((item) => (
            <li key={item.value}>
              <button
                onClick={() => handleClick(item.value)}
                className={`justify-between ${filterStatus === item.value ? "active font-semibold" : ""}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </details>

      {/* Desktop Buttons */}
      <div className="hidden min-[426px]:flex gap-2 flex-wrap">
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilterStatus(item.value)}
            className={`btn btn-xs rounded-md ${
              filterStatus === item.value ? "btn-primary text-white" : "btn-outline"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;