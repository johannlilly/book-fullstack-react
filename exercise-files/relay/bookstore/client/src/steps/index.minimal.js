/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import '../semantic-dist/semantic.css';
import './styles/index.css';

// Customize this based on your server's URL
const graphQLUrl = 'http://localhost:3001/graphql';

// Configure Relay with a "NetworkLayer"
Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(graphQLUrl));

// Create the top-level query that we'll execute
class AppQueries extends Relay.Route {
  static routeName = 'AppQueries';
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `
  };
}

// A basic component that renders the list of authors
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Authors list</h1>
        <ul>
          {this.props.viewer.authors.edges.map(edge => (
            <li key={edge.node.id}>{edge.node.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

// A Relay Container that specifies the fragment to be used in our query above
const AppContainer = Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        authors(first: 100) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `
  }
});

ReactDOM.render(
  <Relay.Renderer
    environment={Relay.Store}
    Container={AppContainer}
    queryConfig={new AppQueries()}
  />,
  document.getElementById('root')
);
