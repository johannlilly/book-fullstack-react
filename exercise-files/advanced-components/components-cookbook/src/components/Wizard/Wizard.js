import PropTypes from 'prop-types';
/* eslint-disable react/no-unused-prop-types */
import React, { Children } from 'react';
import styles from './Wizard.css';

class Breadcrumb extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  };

  onClick = (e) => {
    this.props.onClick(this.props.idx);
  };

  render() {
    return (
      <a className={this.props.className} onClick={this.onClick}>
        {this.props.title}
      </a>
    );
  }
}

class WizardStep extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    validateComplete: PropTypes.func,
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      canGoNext: this.isValid(newProps.data),
    });
  }

  isValid = (data) => {
    let validateComplete = this.props.validateComplete;
    if (!validateComplete) {
      validateComplete = function () {
        return true;
      };
    }
    return validateComplete(data);
  };

  state = {
    canGoNext: this.isValid(this.props.data),
  };

  render() {
    const Component = this.props.component;
    const compProps = Object.assign({}, this.props, this.state);
    const content = React.createElement(Component, compProps);
    return (
      <div>
        {content}
      </div>
    );
  }
}

class Wizard extends React.Component {
  static propTypes = {
    initialIndex: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    initialData: PropTypes.object,
  };

  static defaultProps = {
    initialIndex: 0,
    initialData: {},
  };

  state = {
    currentStepIdx: this.props.initialIndex,
    data: this.props.initialData,
  };

  onChangeStep = (idx) => {
    if (this.canGoTo(idx)) {
      this.setState({
        currentStepIdx: idx,
      });
    }
  };

  onNext = (e) => {
    e.preventDefault();

    let nextIdx = this.state.currentStepIdx + 1;
    if (nextIdx >= this.props.children.length) {
      nextIdx = 0;
    }

    this.setState({
      currentStepIdx: nextIdx,
    });
  };

  isActive = (idx) => {
    return idx === this.state.currentStepIdx;
  };

  canGoTo = (nextIdx) => {
    const TrueFn = () => true;
    const falsyCount = this.props.children
      .filter((c, idx) => idx <= nextIdx)
      .map(c => (c.props.validateComplete || TrueFn)(this.state.data))
      .filter(c => !c);

    return falsyCount.length === 0;
  };

  renderBreadcrumbs = () => {
    const crumbs = this.props.children.map((c, idx) => {
      return (
        <Breadcrumb
          key={c.props.title}
          idx={idx}
          className={this.isActive(idx) ? styles.active : ''}
          onClick={this.onChangeStep}
          title={c.props.title}
        />
      );
    });
    return (
      <div className={styles.breadcrumbs}>
        {crumbs}
      </div>
    );
  };

  onChangeInput = (name) => {
    const that = this;
    return function (e) {
      const newData = Object.assign({}, that.state.data, {});
      newData[name] = e.target.value;
      that.setState({
        data: newData,
      });
    };
  };

  renderContent = () => {
    const content = this.props.children[this.state.currentStepIdx];

    return (
      <div className={styles.container}>
        {React.createElement(WizardStep, {
          key: `step-${this.state.currentStepIdx}`,
          data: this.state.data,
          title: content.props.title,
          component: content.props.component,
          validateComplete: content.props.validateComplete,
          onChangeInput: this.onChangeInput,
          onNext: this.onNext,
        })}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        {this.renderBreadcrumbs()}
        {this.renderContent()}
      </div>
    );
  }
}

Wizard.Step = WizardStep;

export default Wizard;
