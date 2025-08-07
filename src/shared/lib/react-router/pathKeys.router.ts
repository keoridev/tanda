export const pathKeys = {
  root: "/",
  tanda: {
    root() {
      return pathKeys.root.concat("tanda/");
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
};
