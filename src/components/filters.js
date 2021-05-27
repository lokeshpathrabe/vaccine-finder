import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import {
  ABOVE_AGE_18,
  ABOVE_AGE_45,
  AVAILABLITY,
} from "../queries/useFilteredSlots";
import { useDistricts } from "../queries/useDistricts";
import { useStates } from "../queries/useStates";
import { useQuery, useQueryClient } from "react-query";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/autocomplete";
import { formatDate } from "../utils";

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    padding: "8px 0 8px 0",
  },
  filterRow: {
    padding: theme.spacing(2),
  },
}));

const FilterButton = ({ label, onClick, classes, className, ...props }) => {
  const [active, setActive] = useState(false);
  return (
    <Button
      {...props}
      size="small"
      style={{ margin: "4px" }}
      variant="contained"
      color={active ? "primary" : "default"}
      onClick={(e) => {
        setActive(!active);
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {label}
    </Button>
  );
};

const Filters = ({ filters, setFilters }) => {
  const styles = useStyles();
  const { data: states, isLoading: isLoadingStates } = useStates();
  const { data: districts, isLoading: isLoadingDistricts } = useDistricts(
    filters?.state?.state_id
  );
  const onFilterClick = (filter_type) => {
    const idx = filters?.categories?.indexOf(filter_type);
    const categories = [...filters.categories];

    if (idx > -1) {
      categories.splice(idx, 1);
      setFilters({ ...filters, categories });
    } else {
      setFilters({ ...filters, categories: [...categories, filter_type] });
    }
  };

  return (
    <Grid className={styles.filterContainer} container xs={12}>
      <Grid
        className={styles.filterRow}
        container
        xs={12}
        justify="flex-start"
        spacing={4}
      >
        <Grid item>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={filters.date && formatDate(filters.date, "yyyy-MM-dd")}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              console.log("date value", e);
              setFilters({ ...filters, date: e.target.valueAsDate });
            }}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="states"
            disabled={isLoadingStates}
            options={states}
            getOptionLabel={(option) => option.state_name}
            getOptionSelected={(option, value) =>
              option.state_id === value.state_id
            }
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="State" variant="outlined" />
            )}
            onChange={async (e, newValue) => {
              setFilters({ ...filters, state: newValue });
            }}
          />
        </Grid>

        <Grid item>
          <Autocomplete
            key={filters?.state?.state_id || 0}
            id="district"
            disabled={isLoadingDistricts}
            options={districts}
            getOptionLabel={(option) => option.district_name}
            getOptionSelected={(option, value) =>
              option.district_id === value.district_id
            }
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="District" variant="outlined" />
            )}
            onChange={(e, newValue) => {
              setFilters({ ...filters, district: newValue });
            }}
          />
        </Grid>
      </Grid>
      <Grid className={styles.filterRow} container xs={12} justify="flex-end">
        <FilterButton label="18+" onClick={() => onFilterClick(ABOVE_AGE_18)} />
        <FilterButton label="45+" onClick={() => onFilterClick(ABOVE_AGE_45)} />
        <FilterButton
          label="Available"
          onClick={() => onFilterClick(AVAILABLITY)}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
