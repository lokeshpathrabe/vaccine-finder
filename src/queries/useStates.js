import { useQuery } from "react-query";

const stateURL = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
const getStatesAPI = async () => {
  const response = await fetch(`${stateURL}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const useStates = () => {
  const { data, isLoading, isError, status } = useQuery(
    "states",
    () => getStatesAPI(),
    {
      staleTime: Infinity,
    }
  );
  const states = data?.states || [];

  return {
    data: states,
    isLoading,
    isError,
    status,
  };
};
