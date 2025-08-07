import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { TandaResult } from "./tandaResult.ui";
import { createElement } from "react";

export const ResultPageRoute: RouteObject = {
  path: pathKeys.tanda.tandaResult(),
  element: createElement(TandaResult),
};
