/* Here we hit server's auth route i.e. /api/users/auth to check authentication */

import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/user_actions";
import CircularProgress from "@material-ui/core/CircularProgress";

// composed component - A function that returns another function
export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    // Dispatch action to Node server to check whether user is authenticated
    componentDidMount() {
      this.props.dispatch(auth()).then(response => {
        let user = this.props.user.userData; // response is saved in redux state - check debugging tool
        this.setState({ loading: false });

        if (!user.isAuth) {
          if (reload) {
            // private route
            this.props.history.push("/register_login");
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            // admin
            this.props.history.push("/user/dashboard");
          } else {
            if (reload === false) {
              // semi-public route - should not go to login or register page
              this.props.history.push("/user/dashboard");
            }
          }
        }
      });
    }
    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
      // Parameter 1 is component
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(mapStateToProps)(AuthenticationCheck);
}
