import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Import ChakraProvider
import { ChakraProvider } from "@chakra-ui/react";
// for color mode
// 1)Import
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";
// 2)Option
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100, #000")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

// 3) extend the theme
const theme = extendTheme({ config, styles });

//1)Install Chakra UI Using npm
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap App With ChakraProvider */}
    {/* Pass the theme prop */}
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
