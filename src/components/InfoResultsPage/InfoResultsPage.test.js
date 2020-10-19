import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import InfoResultsPage from "./InfoResultsPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <InfoResultsPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
