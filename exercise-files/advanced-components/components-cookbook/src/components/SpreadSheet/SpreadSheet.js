import PropTypes from 'prop-types';
/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import styles from './SpreadSheet.css';

class SpreadSheetCell extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  };

  state = {
    currentValue: this.props.value,
    initialValue: this.props.value
  };

  handleChange = e => {
    const val = e.target.value;
    if (val !== this.state.currentValue) {
      this.setState({
        currentValue: val
      });
    }
  };

  handleBlur = e => {
    if (this.state.currentValue !== this.state.initialValue) {
      const title = this.props.title;
      const currentValue = this.state.currentValue;

      this.setState({
        currentValue: currentValue,
        initialValue: currentValue
      });
      this.props.onUpdate(title, currentValue);
    }
  };

  shouldComponentUpdate(newProps, newState) {
    return (
      newProps.value !== this.props.value ||
      newProps.title !== this.props.title ||
      newState.currentValue !== this.state.currentValue
    );
  }

  render() {
    return (
      <td>
        <input
          type="string"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.state.currentValue}
        />
      </td>
    );
  }
}

class SpreadSheetRow extends React.Component {
  static propTypes = {
    idx: PropTypes.number.isRequired,
    rowData: PropTypes.object.isRequired,
    columnNames: PropTypes.array.isRequired,
    onUpdate: PropTypes.func
  };

  shouldComponentUpdate(newProps, newState) {
    return newProps.rowData !== this.props.rowData;
  }

  handleUpdate = (key, value) => {
    const newData = Object.assign({}, this.props.rowData, {[key]: value});
    this.props.onUpdate(this.props.idx, newData);
  };

  renderCells = () => {
    return this.props.columnNames.map((key, idx) => (
      <SpreadSheetCell
        key={key}
        idx={idx}
        onUpdate={this.handleUpdate}
        title={key}
        value={this.props.rowData[key]}
      />
    ));
  };

  render() {
    const klasses = [styles.row];
    return <tr className={klasses}>{this.renderCells()}</tr>;
  }
}

const SpreadSheetHeaderRow = props => (
  <tr>{props.columnNames.map(key => <th key={key}>{key}</th>)}</tr>
);

class SpreadSheet extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columnNames: PropTypes.array
  };

  constructor(props) {
    super(props);
    const first = props.data ? props.data[0] : {};
    const columnNames = props.columnNames || Object.keys(first);

    this.state = {
      columnNames: columnNames,
      data: props.data
    };
  }

  onUpdate = (idx, row) => {
    const newData = this.state.data;
    newData[idx] = row;
    this.setState({
      data: newData
    });
  };

  render() {
    const dataArr = this.state.data;
    const columnNames = this.state.columnNames;
    return (
      <div className={styles.container}>
        <table className={styles.spreadsheet}>
          <thead>
            <SpreadSheetHeaderRow columnNames={columnNames} />
          </thead>
          <tbody>
            {dataArr.map((o, idx) => {
              return (
                <SpreadSheetRow
                  idx={idx}
                  key={idx}
                  onUpdate={this.onUpdate}
                  columnNames={columnNames}
                  rowData={o}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SpreadSheet;
