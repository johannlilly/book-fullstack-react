/* eslint no-underscore-dangle: [2, { "allow": ["_loading", "_saveStatus"] }] */

import React from 'react';
import isEmail from 'validator/lib/isEmail';

const Field = require('./08-field-component-field.js');
const CourseSelect = require('./09-course-select.js');

const content = document.createElement('div');
document.body.appendChild(content);

let apiClient;
module.exports = class extends React.Component {
  static displayName = '10-remote-persist';

  state = {
    fields: {
      name: '',
      email: '',
      course: null,
      department: null
    },
    fieldErrors: {},
    people: [],
    _loading: false,
    _saveStatus: 'READY'
  };

  componentDidMount() {
    this.setState({_loading: true});
    apiClient.loadPeople().then(people => {
      this.setState({_loading: false, people: people});
    });
  }

  onFormSubmit = evt => {
    const person = this.state.fields;

    evt.preventDefault();

    if (this.validate()) return;

    const people = [...this.state.people, person];

    this.setState({_saveStatus: 'SAVING'});
    apiClient
      .savePeople(people)
      .then(() => {
        this.setState({
          people: people,
          fields: {
            name: '',
            email: '',
            course: null,
            department: null
          },
          _saveStatus: 'SUCCESS'
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({_saveStatus: 'ERROR'});
      });
  };

  onInputChange = ({name, value, error}) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({fields, fieldErrors, _saveStatus: 'READY'});
  };

  validate = () => {
    const person = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);

    if (!person.name) return true;
    if (!person.email) return true;
    if (!person.course) return true;
    if (!person.department) return true;
    if (errMessages.length) return true;

    return false;
  };

  render() {
    if (this.state._loading) {
      return <img alt="loading" src="/img/loading.gif" />;
    }

    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder="Name"
            name="name"
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={val => (val ? false : 'Name Required')}
          />

          <br />

          <Field
            placeholder="Email"
            name="email"
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={val => (isEmail(val) ? false : 'Invalid Email')}
          />

          <br />

          <CourseSelect
            department={this.state.fields.department}
            course={this.state.fields.course}
            onChange={this.onInputChange}
          />

          <br />

          {
            {
              SAVING: <input value="Saving..." type="submit" disabled />,
              SUCCESS: <input value="Saved!" type="submit" disabled />,
              ERROR: (
                <input
                  value="Save Failed - Retry?"
                  type="submit"
                  disabled={this.validate()}
                />
              ),
              READY: (
                <input
                  value="Submit"
                  type="submit"
                  disabled={this.validate()}
                />
              )
            }[this.state._saveStatus]
          }
        </form>

        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({name, email, department, course}, i) => (
              <li key={i}>{[name, email, department, course].join(' - ')}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

apiClient = {
  loadPeople: function() {
    return {
      then: function(cb) {
        setTimeout(() => {
          cb(JSON.parse(localStorage.people || '[]'));
        }, 1000);
      }
    };
  },

  savePeople: function(people) {
    const success = !!(this.count++ % 2);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({success});

        localStorage.people = JSON.stringify(people);
        return resolve({success});
      }, 1000);
    });
  },

  count: 1
};
