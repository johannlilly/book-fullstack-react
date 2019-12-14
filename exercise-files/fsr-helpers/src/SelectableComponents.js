import React from "react";

export class ComponentMenu extends React.Component {
  state = {
    visible: false
  };
  handleClick = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  render() {
    const activeClass = this.state.visible ? "simple active" : "";
    return (
      <div
        className="ui text menu"
        style={{ marginRight: "50px" }}
        onClick={this.handleClick}
      >
        <div className={`ui right dropdown item ${activeClass}`}>
          Select Component
          <i className="dropdown icon" />
          <div className={`menu`}>
            {this.props.slugs.map((slug, idx) => {
              const divClass = (slug === this.props.activeSlug) ? 'active item': 'item'
              return (
                <div
                  className={divClass}
                  id={slug} // for nightwatch
                  key={slug}
                  onClick={() => this.props.onComponentSelect(slug)}
                >
                  {slug}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

class SelectableComponents extends React.Component {
  constructor(props) {
    super(props);

    let activeSlug = Object.keys(this.props.components)[0];

    const search = (window && window.location.search) || this.props.search;

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
  handleComponentSelect = slug => {
    this.setState({
      activeSlug: slug
    });
  };

  render() {
    const { components } = this.props;
    const component = components[this.state.activeSlug];
    const slugs = Object.keys(components);

    return (
      <div>
        <ComponentMenu
          onComponentSelect={this.handleComponentSelect}
          activeSlug={this.state.activeSlug}
          slugs={slugs}
        />
        {React.createElement(component)}
      </div>
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

export default SelectableComponents;
