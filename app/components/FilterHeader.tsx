import React from "react";
import FilterItem from "./FilterItem";
import SortItem from "./SortItem";
import { FilterHeaderProps } from "../types/types";

const FilterHeader: React.FC<FilterHeaderProps> = ({
  countries,
  cities,
  onFilterChange,
  onSortChange,
  priceSortOrder,
  starsSortOrder,
  itemsPerPage,
  onItemsPerPageChange,
  loading,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mx-8 gap-4 w-full">
      <div className="flex flex-grow lg:gap-6 gap-4 items-center">
        <FilterItem
          countries={countries}
          cities={cities}
          onFilterChange={onFilterChange}
          disabled={loading}
        />
        <SortItem
          onSortChange={onSortChange}
          priceSortOrder={priceSortOrder}
          starsSortOrder={starsSortOrder}
          disabled={loading}
        />
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="border border-gray-300 rounded-lg p-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out mx-12 -mt-0.5"
          disabled={loading}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default FilterHeader;
