"use client";

import { useState, useEffect } from "react";
import HotelList from "./components/HotelList";
import Filters from "./components/Filters";
import Sorting from "./components/Sorting";
import Pagination from "./components/Pagination";

interface Hotel {
  id: string;
  name: string;
  country: string;
  countryId: string;
  city: string;
  cityId: string;
  price: number;
  stars: number;
  imageUrl?: string;
}

interface Filter {
  id: string;
  name: string;
}

const Page = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [countryIdFilter, setCountryIdFilter] = useState<string>("");
  const [cityIdFilter, setCityIdFilter] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("price");
  const [priceSortOrder, setPriceSortOrder] = useState<"asc" | "desc">("asc");
  const [starsSortOrder, setStarsSortOrder] = useState<"asc" | "desc">("asc");
  const [countries, setCountries] = useState<Filter[]>([]);
  const [cities, setCities] = useState<Filter[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/hotels");
        const data: Hotel[] = await response.json();
        setHotels(data);
        updateFilters(data);
        updatePagination(data);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [itemsPerPage]);

  const updateFilters = (data: Hotel[]) => {
    const countries = Array.from(
      new Map(data.map((hotel) => [hotel.countryId, hotel.country])).entries()
    ).map(([id, name]) => ({ id, name }));

    const cities = Array.from(
      new Map(data.map((hotel) => [hotel.cityId, hotel.city])).entries()
    ).map(([id, name]) => ({ id, name }));

    setCountries(countries);
    setCities(cities);
  };

  const updatePagination = (data: Hotel[]) => {
    setFilteredHotels(data);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    setCurrentPage(1);
  };

  useEffect(() => {
    let updatedHotels = hotels.filter((hotel) =>
      (!countryIdFilter || hotel.countryId === countryIdFilter) &&
      (!cityIdFilter || hotel.cityId === cityIdFilter)
    );

    updatedHotels.sort((a, b) => {
      if (sortOption === "price") {
        return priceSortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortOption === "stars") {
        return starsSortOrder === "asc" ? a.stars - b.stars : b.stars - a.stars;
      }
      return 0;
    });

    setFilteredHotels(updatedHotels);
    setTotalPages(Math.ceil(updatedHotels.length / itemsPerPage));
    setCurrentPage(1);
  }, [countryIdFilter, cityIdFilter, sortOption, priceSortOrder, starsSortOrder, hotels, itemsPerPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleFilterChange = (countryId: string, cityId: string) => {
    setCountryIdFilter(countryId);
    setCityIdFilter(cityId);
  };

  const handleSortChange = (sortBy: string) => {
    setSortOption(sortBy);
    if (sortBy === "price") {
      setPriceSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else if (sortBy === "stars") {
      setStarsSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
  };

  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mx-8 gap-4 w-full">
        <div className="flex flex-grow lg:gap-6 gap-4 items-center">
          <Filters
            countries={countries}
            cities={cities}
            onFilterChange={handleFilterChange}
            disabled={loading}
          />
          <Sorting
            onSortChange={handleSortChange}
            priceSortOrder={priceSortOrder}
            starsSortOrder={starsSortOrder}
            disabled={loading}
          />
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
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
      <HotelList hotels={paginatedHotels.length ? paginatedHotels : placeholders} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
