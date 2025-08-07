import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GenericLayout } from "~app/layout";
import { tandaPageRoute } from "~pages/tanda";
import { TestPageRoute } from "~pages/tandaTestPage";
import { LoginPageRoute } from "~pages/tandaLoginPage/tandaLogin.route";
import { ResultPageRoute } from "~pages/tandaResultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GenericLayout />,
    errorElement: <h1>Error 404!</h1>,
    children: [tandaPageRoute, TestPageRoute, LoginPageRoute, ResultPageRoute],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
