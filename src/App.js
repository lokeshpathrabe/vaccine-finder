import { useSlotsByDistrict } from "./queries/useSlotsByDistrict";
import { useFilters } from "./queries/useFilteredSlots";
import Container from "./components/container";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Filters from "./components/filters";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "24px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "90vw",
  },
}));

const initialFilters = {
  category: [],
  state: {},
  district: {},
  date: new Date(),
};

function App() {
  const [filters, setFilters] = useState(initialFilters);
  const { data, isLoading } = useSlotsByDistrict(
    filters?.district?.district_id,
    filters.date
  );
  const filteredData = useFilters(data, filters.category);
  const styles = useStyles();
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Filters filters={filters} setFilters={setFilters} />
        {isLoading ? (
          <div>loading ....</div>
        ) : (
          <Container data={filteredData} />
        )}
      </div>
    </div>
  );
}

export default App;
