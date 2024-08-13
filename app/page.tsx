"use client";

import { useState, useEffect } from "react";
import HotelList from "./components/HotelList";
import FilterHeader from "./components/FilterHeader";
import Pagination from "./components/Pagination";
import { FilterSchema, HotelItemSchema } from "./types/types";

const HotelsPage = () => {
  const [hotelList, setHotelList] = useState<HotelItemSchema[]>([]);
  const [filteredHotelList, setFilteredHotelList] = useState<HotelItemSchema[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPageCount, setTotalPageCount] = useState<number>(1);
  const [filterByCountryId, setFilterByCountryId] = useState<string>("");
  const [filterByCityId, setFilterByCityId] = useState<string>("");
  const [selectedSortOption, setSelectedSortOption] = useState<string>("price");
  const [sortOrderByPrice, setSortOrderByPrice] = useState<"asc" | "desc">("asc");
  const [sortOrderByStars, setSortOrderByStars] = useState<"asc" | "desc">("asc");
  const [availableCountryFilters, setAvailableCountryFilters] = useState<FilterSchema[]>([]);
  const [availableCityFilters, setAvailableCityFilters] = useState<FilterSchema[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHotelList = async () => {
      setIsDataLoading(true);
      try {
        const response = await fetch("/api/HotelLists");
        const data: HotelItemSchema[] = await response.json();
        setHotelList(data);
        updateFilterOptions(data);
        updatePaginationData(data);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchHotelList();
  }, [itemsPerPage]);

  const updateFilterOptions = (data: HotelItemSchema[]) => {
    const countries = Array.from(
      new Map(data.map((hotel) => [hotel.countryId, hotel.country])).entries()
    ).map(([id, name]) => ({ id, name }));

    const cities = Array.from(
      new Map(data.map((hotel) => [hotel.cityId, hotel.city])).entries()
    ).map(([id, name]) => ({ id, name }));

    setAvailableCountryFilters(countries);
    setAvailableCityFilters(cities);
  };

  const updatePaginationData = (data: HotelItemSchema[]) => {
    setFilteredHotelList(data);
    setTotalPageCount(Math.ceil(data.length / itemsPerPage));
    setActivePage(1);
  };

  useEffect(() => {
    let updatedHotelList = hotelList.filter((hotel) =>
      (!filterByCountryId || hotel.countryId === filterByCountryId) &&
      (!filterByCityId || hotel.cityId === filterByCityId)
    );

    updatedHotelList.sort((a, b) => {
      if (selectedSortOption === "price") {
        return sortOrderByPrice === "asc" ? a.price - b.price : b.price - a.price;
      } else if (selectedSortOption === "stars") {
        return sortOrderByStars === "asc" ? a.stars - b.stars : b.stars - a.stars;
      }
      return 0;
    });

    setFilteredHotelList(updatedHotelList);
    setTotalPageCount(Math.ceil(updatedHotelList.length / itemsPerPage));
    setActivePage(1);
  }, [filterByCountryId, filterByCityId, selectedSortOption, sortOrderByPrice, sortOrderByStars, hotelList, itemsPerPage]);

  const handlePageChange = (page: number) => setActivePage(page);

  const handleFilterChange = (countryId: string, cityId: string) => {
    setFilterByCountryId(countryId);
    setFilterByCityId(cityId);
  };

  const handleSortChange = (sortBy: string) => {
    setSelectedSortOption(sortBy);
    if (sortBy === "price") {
      setSortOrderByPrice((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else if (sortBy === "stars") {
      setSortOrderByStars((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
  };

  const paginatedHotelList = filteredHotelList.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const placeholders = Array.from({ length: itemsPerPage }, (_, index) => ({
    id: `placeholder-${index}`,
    name: "Loading...",
    country: "",
    countryId: "",
    city: "",
    cityId: "",
    price: 0,
    stars: 0,
    imageUrl: "https://ucarecdn.com/faff2888-016b-4c54-9870-25f9a21129f5/-/preview/1600x900/-/blur/500/",
  }));

  return (
    <div className="container mx-auto p-4">
      <FilterHeader
        countries={availableCountryFilters}
        cities={availableCityFilters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        priceSortOrder={sortOrderByPrice}
        starsSortOrder={sortOrderByStars}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        loading={isDataLoading}
      />
      <HotelList HotelLists={paginatedHotelList.length ? paginatedHotelList : placeholders} />
      <Pagination
        currentPage={activePage}
        totalPages={totalPageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HotelsPage;
