import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//Load Navbar
import Navbar from "./component/Navbar";
//Load halaman 
import Siswa from "./page/Siswa";
import Pelanggaran from "./page/Pelanggaran";
import User from "./page/User";
import PelanggaranSiswa from "./page/PelanggaranSiswa";
import Login from "./page/Login";

class Main extends Component{
    render = () => {
        return(
            <Switch>
                {/* load component tiap halaman */}
                <Route path="/login" component={Login} />
                <Route path="/siswa">
                    <Navbar />
                    <Siswa />
                </Route>
                <Route path="/pelanggaran">
                    <Navbar />
                    <Pelanggaran />
                </Route>
                <Route path="/user">
                    <Navbar />
                    <User />
                </Route>
                <Route path="/pelanggaran_siswa">
                    <Navbar />
                    <PelanggaranSiswa />
                </Route>
            </Switch>
        );
    }
}
export default Main;