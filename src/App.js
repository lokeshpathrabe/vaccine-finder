import { useSlotsByDistrict } from "./queries/useSlotsByDistrict";
import { useFilters } from "./queries/useFilteredSlots";
import Container from "./components/container";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Filters from "./components/filters";
import Header from "./components/header";

const useStyles = makeStyles((theme) => ({
  app: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "24px",
    backgroundColor: theme.palette.background.default,
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
  categories: ["DATE"],
  state: {},
  district: {},
  date: new Date(),
};

function App() {
  const [filters, setFilters] = useState(initialFilters);
  const theme = useTheme();
  const { data, isLoading } = useSlotsByDistrict(
    filters?.district?.district_id,
    filters.date
  );
  const filteredData = useFilters(data, filters);
  const styles = useStyles();

  document.querySelector("html").style.backgroundColor =
    theme.palette.background.default;

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
