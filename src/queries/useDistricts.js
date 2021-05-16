import { useQuery } from "react-query";

const districtURL = "https://cdn-api.co-vin.in/api/v2/admin/location/districts";
const getDistrictAPI = async (state) => {
  const response = await fetch(`${districtURL}/${state}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const useDistricts = (state) => {
  console.log("useDistricts", state);
  const { data, isLoading, isError, status } = useQuery(
    `districts-${state}`,
    () => getDistrictAPI(state),
    {
      staleTime: Infinity,
      enabled: !!state,
    }
  );
  const districts = data?.districts || [];

  return {
    data: districts,
    isLoading,
    isError,
    status,
  };
};
