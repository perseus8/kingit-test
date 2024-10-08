import { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { FilterItemProps } from "../types/types";

const FilterItem: React.FC<FilterItemProps & { disabled?: boolean }> = ({
  countries,
  cities,
  onFilterChange,
  disabled,
}) => {
  console.log("countries", countries);
  console.log("cities", cities);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    const countryId = e.target.value;
    setSelectedCountryId(countryId);
    onFilterChange(countryId, selectedCityId);
  };

  const handleCityChange = (e: SelectChangeEvent<string>) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
    onFilterChange(selectedCountryId, cityId);
  };

  return (
    <Grid container spacing={1} mb={2}>
      <Grid item xs={6}>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          disabled={disabled}
        >
          <InputLabel>Country</InputLabel>
          <Select
            value={selectedCountryId}
            onChange={handleCountryChange}
            label="Country"
            color="primary"
            size="small"
          >
            <MenuItem value="">
              <em>All Countries</em>
            </MenuItem>
            {countries.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          disabled={disabled}
        >
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCityId}
            onChange={handleCityChange}
            label="City"
            color="primary"
            size="small"
          >
            <MenuItem value="">
              <em>All Cities</em>
            </MenuItem>
            {cities.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FilterItem;
