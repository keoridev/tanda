import { RouteObject } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { MentorPage } from "./mentor-page.ui";
import { createElement } from "react";

export const MentorPageRoute: RouteObject = {
  path: pathKeys.mentors.byId(":mentorId"),
  element: createElement(MentorPage),
};
