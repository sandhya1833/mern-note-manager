import FilterComponent from "./FilterComponent";

const Searchbar = ({
  searchData,
  setSearchData,
  setFilterStatus,
  filterStatus,
}) => {
  return (
    <div className="w-full px-3">
      <div className="max-w-5xl mx-auto flex flex-col gap-3 md:flex-row md:items-center">
        <label
          className="
            input input-bordered input-sm
            flex items-center gap-2
            w-full
            sm:w-[320px]
            md:w-[380px]
            lg:w-[420px]
            rounded-lg
          "
        >
          <input
            type="text"
            className="grow text-sm"
            placeholder="Search notes by subject and title..."
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </label>
        <div className="md:ml-auto shrink-0">
          <FilterComponent
            setFilterStatus={setFilterStatus}
            filterStatus={filterStatus}
          />
        </div>

      </div>
    </div>
  );
};

export default Searchbar;