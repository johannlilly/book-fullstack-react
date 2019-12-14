"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentMenu = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ComponentMenu extends _react2.default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      visible: false
    }, this.handleClick = () => {
      this.setState(prevState => ({
        visible: !prevState.visible
      }));
    }, _temp;
  }

  render() {
    const activeClass = this.state.visible ? "simple active" : "";
    return _react2.default.createElement(
      "div",
      {
        className: "ui text menu",
        style: { marginRight: "50px" },
        onClick: this.handleClick
      },
      _react2.default.createElement(
        "div",
        { className: `ui right dropdown item ${activeClass}` },
        "Select Component",
        _react2.default.createElement("i", { className: "dropdown icon" }),
        _react2.default.createElement(
          "div",
          { className: `menu` },
          this.props.slugs.map((slug, idx) => {
            const divClass = slug === this.props.activeSlug ? 'active item' : 'item';
            return _react2.default.createElement(
              "div",
              {
                className: divClass,
                id: slug // for nightwatch
                , key: slug,
                onClick: () => this.props.onComponentSelect(slug)
              },
              slug
            );
          })
        )
      )
    );
  }
}

exports.ComponentMenu = ComponentMenu;
class SelectableComponents extends _react2.default.Component {
  constructor(props) {
    super(props);

    this.handleComponentSelect = slug => {
      this.setState({
        activeSlug: slug
      });
    };

    let activeSlug = Object.keys(this.props.components)[0];

    const search = window && window.location.search || this.props.search;

    if (search) {
      const params = getUrlParams(search);
      if (params.app_slug) {
        activeSlug = params.app_slug;
      }
    }

    this.state = {
      activeSlug
    };
  }


  render() {
    const { components } = this.props;
    const component = components[this.state.activeSlug];
    const slugs = Object.keys(components);

    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(ComponentMenu, {
        onComponentSelect: this.handleComponentSelect,
        activeSlug: this.state.activeSlug,
        slugs: slugs
      }),
      _react2.default.createElement(component)
    );
  }
}

function getUrlParams(search) {
  const hashes = search.slice(search.indexOf("?") + 1).split("&");
  const params = {};
  hashes.map(hash => {
    const [key, val] = hash.split("=");
    params[key] = val;
  });

  return params;
}

exports.default = SelectableComponents;
