import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import TermsAndConditions from "./TermsAndConditions";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <TermsAndConditions />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
