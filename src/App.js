import { useSlotsByDistrict } from "./queries/useSlotsByDistrict";
import { useFilters } from "./queries/useFilteredSlots";
import Container from "./components/container";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Filters from "./components/filters";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#6573c3",
      main: "#3f51b5",
      dark: "#2c387e",
      contrastText: "#fff",
    },
    secondary: {
      light: "#a2cf6e",
      main: "#8bc34a",
      dark: "#618833",
      contrastText: "#000",
    },
  },
});

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
  categories: ["DATE"],
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
  const filteredData = useFilters(data, filters);
  const styles = useStyles();
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
