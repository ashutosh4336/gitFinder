// eslint-disable-next-line
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import './App.css';

// import UserItem from './components/users/UserItem';

const App = () => {
  const gitHubApiOne = 'https://api.github.com/users';
  const gitHubApiTwo = 'https://api.github.com/search/users';

  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // async componentDidMount() {
  //   // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `${this.gitHubApiOne}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  //   // console.log(res);
  // }

  // Search Github Users
  const searchUser = async (text) => {
    // console.log(text);
    // this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(
      `${gitHubApiTwo}?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // this.setState({ users: res.data.items, loading: false });
    // console.log(res);
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get Single User Details
  const getUser = async (username) => {
    // this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(
      `${gitHubApiOne}/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // this.setState({ user: res.data, loading: false });
    setUser(res.data);
    setLoading(false);
  };

  // Get Single User Repos
  const getUserRepos = async (username) => {
    // this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(
      `${gitHubApiOne}/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // this.setState({ repos: res.data, loading: false });
    setRepos(res.data);
    setLoading(false);
  };

  // Clear Users from State
  const clearUsers = () => {
    // this.setState({ users: [], loading: false });
    setUsers([]);
    setLoading(false);
  };

  // Alert Message
  const showAlert = (msg, type) => {
    // this.setState({ alert: { msg, type } });
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUser={searchUser}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
