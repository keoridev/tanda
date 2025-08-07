import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { TandaLogin } from "./tandaLogin.ui";
import { createElement } from "react";

export const LoginPageRoute: RouteObject = {
  path: pathKeys.tanda.tandaLogin(),
  element: createElement(TandaLogin),
};
