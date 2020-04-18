import React, { Component } from "react";
import FormField from "../utils/Form/formfield";
import { update, generateData, isFormValid } from "../utils/Form/formActions";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";

class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "login");

    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "login"); // get key-value pair to data to save
    let formIsValid = isFormValid(this.state.formdata, "login"); // check validations before submit

    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          console.log(response.payload);
          this.props.history.push("/user/dashboard");
        } else {
          this.setState({
            formError: true
          });
        }
        console.log(response.payload);
      });
      // console.log(dataToSubmit);     {email: "amirengg15@gmail.com", password: "Admin@123"}
    } else {
      this.setState({
        formError: true
      });
    }
  };
  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={() => this.submitForm()}>
          <FormField
            id={"email"}
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"password"}
            formdata={this.state.formdata.password}
            change={element => this.updateForm(element)}
          />

          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}

          <button onClick={event => this.submitForm(event)}>Log in</button>
        </form>
      </div>
    );
  }
}
export default connect()(withRouter(Login));
