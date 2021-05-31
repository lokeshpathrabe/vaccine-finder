import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { light_theme, dark_theme } from "./theme";
import Header from "./components/header";

const themeMap = {
  light: light_theme,
  dark: dark_theme,
};
const queryClient = new QueryClient();

const Layout = () => {
  const [theme, setTheme] = useState("light");
  console.log("updated theme", theme);
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={createMuiTheme(themeMap[theme])}>
          <Header theme={theme} setTheme={setTheme} />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Layout />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
