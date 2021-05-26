import { formatDate } from "./../utils";

const filterCenters = (centers, filters, filterFunctions) => {
  if (centers?.length > 0) {
    return centers.filter((center) => {
      const filterResults = filterFunctions.map((filterFun) =>
        filterFun(center, filters)
      );
      return filterResults.indexOf(false) === -1;
    });
  }
};
const filterByAge = (center, age) => {
  return (
    center?.sessions.filter((session) => session.min_age_limit <= age)?.length >
    0
  );
};
const filterByAvailability = (center) => {
  return (
    center?.sessions.filter((session) => session?.available_capacity > 0)
      .length > 0
  );
};

const filterByDate = (center, filters) => {
  const dateString = formatDate(filters.date, "dd-MM-yyyy");
  return (
    center?.sessions.filter((session) => session.date === dateString).length > 0
  );
};

export const ABOVE_AGE_18 = "ABOVE_AGE_18";
export const ABOVE_AGE_45 = "ABOVE_AGE_45";
export const AVAILABLITY = "AVAILABLITY";
export const DATE = "DATE";

const filterMap = {
  [ABOVE_AGE_18]: (data) => filterByAge(data, 18),
  [ABOVE_AGE_45]: (data) => filterByAge(data, 45),
  [AVAILABLITY]: filterByAvailability,
  [DATE]: filterByDate,
};

export const useFilters = (data, filters) => {
  const { categories } = filters;
  const filterFunctions = categories.map((category) => {
    return filterMap[category];
  });
  return filterCenters(data, filters, filterFunctions);
};
