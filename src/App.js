import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EditDb from './components/EditDb.js/EditDb';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/flagit' exact>
          {authCtx.isLoggedIn && <HomePage />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/change-password'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/edit-db'>
          {authCtx.isLoggedIn && <EditDb />}
          {/* {!authCtx.isLoggedIn && <Redirect to='/auth' />} */}
        </Route>
        <Route path='*'>
          <Redirect to='/flagit' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;