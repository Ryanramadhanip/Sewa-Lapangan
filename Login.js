import React, { Component } from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      role: "",
      message: "",
    }
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  Login = (event) => {
    event.preventDefault();
    let url = "http://localhost/lapangan/public/login";
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    axios.post(url, form)
      .then(response => {
        let logged = response.data.status;
        let role = response.data.role;
        if (logged) {
          if (role === "admin") {
            window.location = "/";
          } else {
            window.location = "/home";
          }
          this.setState({ message: "Login Berhasil" });
          //menyimpan data token pada local storage
          localStorage.setItem("Token", response.data.token);
          //menyimpan data login user ke local storage
          localStorage.setItem("id", JSON.stringify(response.data.users.id));
          //direct ke halaman data siswa
          localStorage.setItem("role", JSON.stringify(response.data.users.role))
        } else {
          this.setState({ message: "Login Gagal" });
        }
        $("#message").toast("show");
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="background">
        <div className="container">
          <div className="col-md-6 mt-5 mx-auto">
            <h5 className="h3 mb-3 font-weight-normal">Login</h5>
            <form onSubmit={this.Login}>
              <div className="form-group">
                <label for="name">Username</label>
                <input type="text" className="form-control" name="username" placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.bind}
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" name="password" placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.bind}
                />
              </div>
              <div className="col-md-13 mb-6">
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                  Login
                                </button>
                <a href="/register">Dont have an account?</a>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;