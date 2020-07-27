// eslint-disable-next-line
import React, { Fragment, Component } from 'react';
import axios from 'axios';

import './App.css';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
// import UserItem from './components/users/UserItem';

class App extends Component {
  gitHubApiOne = 'https://api.github.com/users';
  gitHubApiTwo = 'https://api.github.com/search/users';

  state = {
    users: [],
    loading: false,
  };

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
  searchUser = async (text) => {
    // console.log(text);

    this.setState({ loading: true });

    const res = await axios.get(
      `${this.gitHubApiTwo}?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
    // console.log(res);
  };

  // Clear Users from State
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  render() {
    const { users, loading } = this.state;

    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search
            searchUser={this.searchUser}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
