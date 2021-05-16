const filterCenters = (centers, filters) => {
  if (centers?.length > 0) {
    return centers.filter((center) => {
      const filterResults = filters.map((filter) => filter(center));
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
    center?.sessions.filter((session) => session.available_capacity > 0)
      .length > 0
  );
};

export const ABOVE_AGE_18 = "ABOVE_AGE_18";
export const ABOVE_AGE_45 = "ABOVE_AGE_45";
export const AVAILABLITY = "AVAILABLITY";

const filterMap = {
  [ABOVE_AGE_18]: (data) => filterByAge(data, 18),
  [ABOVE_AGE_45]: (data) => filterByAge(data, 45),
  [AVAILABLITY]: filterByAvailability,
};

export const useFilters = (data, filters) => {
  const filterFunctions = filters.map((filter) => {
    return filterMap[filter];
  });
  return filterCenters(data, filterFunctions);
};
