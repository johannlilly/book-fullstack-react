import { hashHistory } from 'react-router';
import { Router, Route, IndexRoute } from 'react-router';

const Main = ({children}) => (
  <div>
    <h2>Main</h2>
    <div className='content'>
      {children}
    </div>
  </div>
);

const Home = () => <div>Home</div>;
const PromptContainer = () => <div>Prompt</div>;
const ConfirmBattleContainer = () => (
  <div>
    <h1>Match off</h1>
  </div>
);

const ResultsContainer = () => <div>Results</div>;

export const Routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route
        path='players/:playerOne?'
        component={PromptContainer}
      />
      <Route
        path='battle'
        component={ConfirmBattleContainer}
      />
      <Route
        path='results'
        component={ResultsContainer}
      />
    </Route>
  </Router>
);


export default Routes;
