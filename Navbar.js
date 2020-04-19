import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    Logout = () => {
        localStorage.removeItem("Token");
        window.location = "/login";
    }

    navGuest = () => {
        return (
            <div className="navbar-collapse collapse" id="menu">
                <ul className="navbar-nav">
                    {/* List menu */}
                    <li className="navbar-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        )
    }
    navAdmin = () => {
        return (
            <div className="navbar-collapse collapse" id="menu">
                <ul className="navbar-nav">
                    {/* List menu */}
                    <li className="navbar-item">
                        <Link className="nav-link" to="/lapangan">Lapangan</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/member">Member</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/sewa">Penyewaan</Link>
                    </li>
                    {/* <li className="navbar-item">
                        <Link className="nav-link" to="/profil">Profil</Link>
                    </li> */}
                    <li className="navbar-item">
                        <Link className="nav-link" onClick={this.Logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        )
    }
    navMember = () => {
        return (
            <div className="navbar-collapse collapse" id="menu">
                <ul className="navbar-nav">
                    {/* List menu */}
                    <li className="navbar-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/sewa2">Penyewaan</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/profil">Profil</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" onClick={this.Logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        )
    }
    render() {
        let auth = localStorage.getItem("Token")
        let role = JSON.parse(localStorage.getItem("role"))
        return (
            <div>
                <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                    <a className="navbar-brand">Champs</a>
                    <button type="button" className="navbar-toggler navbar-toggler-right"
                        data-toggle="collapse" data-target="#navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar navbar-toggler-icon"></span>
                    </button>
                    { !auth ? this.navGuest() : role === "admin" ? this.navAdmin() : this.navMember() }
                </div>
            </div>
        )
    }
}
export default Navbar;