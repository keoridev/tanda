import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { createElement } from "react";
import { TandaPage } from "./tanda.ui";

export const tandaPageRoute: RouteObject = {
  path: pathKeys.tanda.root(),
  element: createElement(TandaPage),
};
