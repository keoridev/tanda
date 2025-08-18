export const pathKeys = {
  root: "/",
  tanda: {
    root() {
      return pathKeys.root.concat("/");
    },
    tandaTest() {
      return pathKeys.tanda.root().concat("test/");
    },
    tandaLogin() {
      return pathKeys.tanda.root().concat("login/");
    },
    tandaResult() {
      return pathKeys.tanda.root().concat("result/");
    },
  },

  mentors: {
    root() {
      return pathKeys.root.concat("mentors/");
    },
    byId(mentorId: string) {
      return pathKeys.mentors.root().concat(`${mentorId}`);
    },
  },
};
