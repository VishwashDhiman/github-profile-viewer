import React, { Component } from 'react';
import request from "superagent";
import debounce from "lodash.debounce";
import { Redirect } from 'react-router-dom';

const URL = 'https://api.github.com/'
class UserService extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      userName: "",
      data: "",
      showData: false,
      error: false,
      hasMore: true,
      isLoading: false,
      page: 1,
      users: [],
      name: null,

    };
    window.onscroll = debounce(() => {
      const {
        loadUsers,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;


      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadUsers();
      }
    }, 10);
  }
  // Initially loads some users
  componentWillMount() {
    this.loadUsers();
  }
  // Fetches users  
  loadUsers = () => {
    let userName = this.props.userName;
    let { page } = this.state
    this.setState((prevState) => ({
      page: prevState.page + 1
    }))
    let api = URL + 'search/users?q=' + userName + '&page=' + page;
    this.setState({ isLoading: true }, () => {
      request.get(api)
        .then(response => {

          // Getting new user's data
          const nextUsers = response.body.items.map(data => data)

          // Merging new user data
          this.setState({
            hasMore: (this.state.users.length < response.body.total_count),
            isLoading: false,
            users: [
              ...this.state.users,
              ...nextUsers,
            ],
            showData: true
          });
          this.props.show(true);
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
          });
        })
    });
  }
  render() {
    const {
      error,
      hasMore,
      isLoading,
      users,
    } = this.state;
    return (
      <div>
        {users.map((value, key) => {
          return (
            <div
              className="col s12 m6"
              onClick={() => this.setState({ name: value.login })}
              key={key}>
              <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                  <div className="col s2">
                    <img
                      src={value.avatar_url}
                      alt={value.login}
                      className="circle responsive-img" />
                  </div>
                  <div className="col s10">
                    <h5>{value.login}</h5>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }

        {this.state.name ?
          <Redirect
            to={{
              pathname: '/user',
              state: { id: this.state.name }
            }}
          />
          : null}
        {isLoading &&
          <div className="col s12 center-align">
            <div className="preloader-wrapper small active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        }
        {!hasMore &&
          <div className="col s12 center-align"><h4>No more results found!!!</h4></div>
        }
      </div>
    )
  }
}

export default UserService;