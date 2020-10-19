import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AboutUs from "./AboutUs";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AboutUs />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
