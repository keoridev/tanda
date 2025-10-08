import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GenericLayout } from "~app/layout";
import { tandaPageRoute } from "~pages/tanda";
import { TestPageRoute } from "~pages/tandaTestPage";
import { LoginPageRoute } from "~pages/tandaLoginPage/tandaLogin.route";
import { ResultPageRoute } from "~pages/tandaResultPage";
import { MentorPageRoute } from "~pages/mentor-page";
import { InterLayout } from "~app/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GenericLayout />,
    errorElement: <h1>Error 404!</h1>,
    children: [tandaPageRoute, ResultPageRoute, MentorPageRoute],
  },
  {
    path: "/",
    element: <InterLayout />,
    errorElement: <h1>Error 404!</h1>,
    children: [TestPageRoute, LoginPageRoute],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
