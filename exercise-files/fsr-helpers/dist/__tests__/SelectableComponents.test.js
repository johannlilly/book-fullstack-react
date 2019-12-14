"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _SelectableComponents = require("../SelectableComponents");

var _SelectableComponents2 = _interopRequireDefault(_SelectableComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const App1 = () => {};
const App2 = () => {};

const components = {
  "App-1": App1,
  "App-2": App2
};

describe("SelectableComponents", () => {
  let wrapper;

  describe("selecting via UI", () => {
    beforeEach(() => {
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SelectableComponents2.default, { components: components }));
    });

    it("defaults to rendering first component", () => {
      expect(wrapper.containsMatchingElement(_react2.default.createElement(App1, null))).toBe(true);
    });

    it("renders `ComponentMenu` with the right props", () => {
      const el = wrapper.find("ComponentMenu");
      expect(el.props()).toMatchSnapshot();
    });

    describe("selecting another component", () => {
      beforeEach(() => {
        wrapper.instance().handleComponentSelect("App-2");
        wrapper.update();
      });

      it("should update the state", () => {
        expect(wrapper.state()).toMatchSnapshot();
      });

      it("should render the second component", () => {
        expect(wrapper.containsMatchingElement(_react2.default.createElement(App2, null))).toBe(true);
      });
    });
  });

  describe("selecting via query params", () => {
    const props = {
      components
    };

    it("should select component on mount based on query params", () => {
      props.search = "?app_slug=App-1";
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SelectableComponents2.default, props));
      expect(wrapper.state()).toMatchSnapshot();
      props.search = "?app_slug=App-2";
      wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SelectableComponents2.default, props));
      expect(wrapper.state()).toMatchSnapshot();
    });
  });
});

describe("ComponentMenu", () => {
  let wrapper;
  const onComponentSelect = jest.fn();
  const slugs = Object.keys(components);

  beforeEach(() => {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_SelectableComponents.ComponentMenu, { onComponentSelect: onComponentSelect, slugs: slugs }));
  });

  it("renders a list of components", () => {
    expect(wrapper.find("div > .menu > .item").map(i => i.html())).toMatchSnapshot();
  });

  it("calls `onComponentSelect` when one is clicked", () => {
    wrapper.find("#App-1").simulate("click");
    expect(onComponentSelect.mock.calls.length).toEqual(1);
    let callArgs = onComponentSelect.mock.calls[0];
    expect(callArgs[0]).toEqual("App-1");

    wrapper.find("#App-2").simulate("click");
    expect(onComponentSelect.mock.calls.length).toEqual(2);
    callArgs = onComponentSelect.mock.calls[1];
    expect(callArgs[0]).toEqual("App-2");
  });
});
