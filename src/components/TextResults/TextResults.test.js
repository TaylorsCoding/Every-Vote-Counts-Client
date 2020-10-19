import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import TextResults from "./TextResults";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <TextResults />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
