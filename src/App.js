import { Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import Dogs from './components/Dogs/Dogs';
import NewDog from './components/NewDog/NewDog';
import UpdateDog from './components/UpdateDog/UpdateDog';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        <Route exact path="/" component={Dogs} />
        <Route path="/newdog" component={NewDog} />
        <Route path="/updatedog/:id" component={UpdateDog} />
      </Switch>
    </div>
  );
}

export default App;
