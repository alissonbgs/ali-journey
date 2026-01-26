const React = require("react");

require("@testing-library/jest-dom");

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => React.createElement("img", props),
}));