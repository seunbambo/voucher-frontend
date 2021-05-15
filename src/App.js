import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Login from './componets/auth/Login';
import Register from './componets/auth/Register';
import { store, persistor } from './redux/store';
import Dashboard from './componets/main/home/Dashboard';
import PrivateRoute from './componets/private/PrivateRoute';
import Navbar from './componets/layouts/Navbar';
import FilteredTable from './componets/main/table-elements/table/FilteredTable';
import { getWeb3 } from './utils.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      if (networkId !== 4) {
        return (
          <div>
            Please install Metamask plugin and ensure you switch to Rinkeby Test
            Network.
          </div>
        );
      }

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
    };
    init();
    window.ethereum.on('accountsChanged', (accounts) => {
      setAccounts(accounts);
    });
  });

  const isReady = () => {
    return (
      typeof contract !== 'undefined' &&
      typeof web3 !== 'undefined' &&
      typeof accounts !== 'undefined'
    );
  };

  // if (isReady()) {
  //   return (
  //     <div className='text-light'>
  //       Please install Metamask plugin and ensure you switch to Rinkeby Test
  //       Network.
  //     </div>
  //   );
  // } else {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Navbar />
          <div className='App container'>
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/vouchers/:status/:type'
                component={FilteredTable}
              />
              <Route exact path='/' component={Login} />
              <Route exact path='/sign-in' component={Login} />
              <Route exact path='/sign-up' component={Register} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}
// }

export default App;
