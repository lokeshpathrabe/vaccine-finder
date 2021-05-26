import { useQuery, useQueryClient } from "react-query";
import { formatDate } from "../utils";

const slotByDistrictURL =
  "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict";
const getSlotByDistrictAPI = async (district_id, date) => {
  const response = await fetch(
    `${slotByDistrictURL}?district_id=${district_id}&date=${date}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const useSlotsByDistrict = (district_id, date) => {
  const dateString = formatDate(date, "dd-MM-yyyy");
  const { data, isLoading, isError, status } = useQuery(
    `slotsByDistrict-${district_id}-${dateString}`,
    () => getSlotByDistrictAPI(district_id, dateString),
    {
      refetchInterval: 60000,
      enabled: !!district_id && !!date,
    }
  );
  const centers = data?.centers;

  return {
    data: centers,
    isLoading,
    isError,
    status,
  };
};
