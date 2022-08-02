import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import NFTDetails from "./pages/NFTDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="details/:asset_identifier/:id" element={<NFTDetails />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <h2>There's nothing here!</h2>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
