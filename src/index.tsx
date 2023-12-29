import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Reset } from "styled-reset";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <Reset />
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);
