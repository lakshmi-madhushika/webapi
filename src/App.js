//import logo from './logo.svg';
import './App.css';

import { Navi } from './Navi';
import { Home } from './Home';
import { Employees } from './Employees';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>

            <div className="Container ">
              <h3 className="m-3 d-flex justify-content-center">
                   Employees Data
              </h3>
              <Navi />
              <Switch>
                    <Route path='/' component={Home} exact />
                    
                    <Route path='/employee' component={Employees} />
              </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;
