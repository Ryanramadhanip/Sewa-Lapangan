import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Toast from "../component/Toast";
import Modal from "../component/Modal";

class Sewa extends Component {
    constructor() {
        super();
        this.state = {
            sewa: [],
            id: "",
            id_lapangan: "",
            nama_lapangan: "",
            id_user: "",
            username: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: "",
            action: "",
            find: "",
            message: ""
        }

        // jika tidak terdapat data token pada local storage
        if (!localStorage.getItem("Token")) {
            // direct ke halaman login
            window.location = "/login";
        }
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    // bindImage = (e) => {
    //   this.setState({image: e.target.files[0]})
    // }

    Add = () => {
        // membuka modal
        $("#modal_sewa").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            id: "",
            id_lapangan: "",
            nama_lapangan: "",
            id_user: "",
            username: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: "booked",
        });
    }

    Edit = (item) => {
        // membuka modal
        $("#modal_sewa").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id: item.id,
            id_lapangan: item.id_lapangan,
            id_user: item.id_user,
            tgl_book: item.tgl_book,
            wkt_mulai: item.wkt_mulai,
            wkt_selesai: item.wkt_selesai,
        });
    }

    get_sewa = () => {
        // $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/sewa";
        axios.get(url)
            .then(response => {
                this.setState({ sewa: response.data.sewa });
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    Used = (id) => {
        if (window.confirm("Apakah lapangan sedang digunakan?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/used/" + id;
            axios.post(url)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ message: response.data.message });
                    $("message").toast("show");
                    this.get_sewa();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    Done = (id) => {
        if (window.confirm("Apakah lapangan sudah digunakan?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/done/" + id;
            axios.post(url)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ message: response.data.message });
                    $("message").toast("show");
                    this.get_sewa();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/drop/" + id;
            axios.delete(url)
                .then(response => {
                    $("#loading").toast("hide");
                    alert(response.data.message)
                    $("#message").toast("show");
                    this.get_sewa();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount = () => {
        this.get_sewa();
    }

    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal
        $("#modal_sewa").modal("hide");
        let url = "http://localhost/lapangan/public/sewa/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("id_lapangan", this.state.id_lapangan);
        form.append("nama_lapangan", this.state.nama_lapangan);
        form.append("id_user", this.state.id_user);
        form.append("username", this.state.username);
        form.append("tgl_book", this.state.tgl_book);
        form.append("wkt_mulai", this.state.wkt_mulai);
        form.append("wkt_selesai", this.state.wkt_selesai);
        form.append("durasi", this.state.durasi);
        form.append("biaya", this.state.biaya);
        form.append("status", this.state.status);

        axios.post(url, form)

            .then(response => {
                // $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_sewa();
            })
            .catch(error => {
                console.log(error);
            });
    }

    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/find";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ sewa: response.data.sewa });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Penyewaan</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                    placeholder="Pencarian..." />
                            </div>
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="true" title="Informasi">
                            <span className="fa fa-spin faspinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama Lapangan</th>
                                    <th>Username</th>
                                    <th>Tanggal Book</th>
                                    <th>Waktu Mulai</th>
                                    <th>Waktu Selesai</th>
                                    <th>Biaya</th>
                                    <th>Status</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.sewa.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nama_lapangan}</td>
                                            <td>{item.username}</td>
                                            <td>{item.tgl_book}</td>
                                            <td>{item.wkt_mulai}</td>
                                            <td>{item.wkt_selesai}</td>
                                            <td>{item.biaya}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info"
                                                    onClick={() => this.Used(item.id)}>
                                                    <span>Used</span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                    onClick={() => this.Done(item.id)}>
                                                    <span>Done</span>
                                                </button>
                                                <br />
                                                <button className="m-1 btn btn-sm btn-info"
                                                    onClick={() => this.Edit(item.id)}>
                                                    <span>Edit</span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                    onClick={() => this.Drop(item.id)}>
                                                    <span>Drop</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* tombol tambah */}
                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>
                        <Modal id="modal_sewa" title="Form Sewa" bg_header="success" text_header="white">
                            <form onSubmit={this.Save}>
                                {/* <div className="col-md-4 mb-3">
                                    <label htmlFor="state">Lapangan</label>
                                    <select className="form-control" name="id_lapangan" value={this.state.id_lapangan} onChange={this.bind} required>
                                        <option>Select</option>
                                        {this.state.sewa.map((item) => {
                                            return (
                                                <option value={item.id_lapangan}>{item.nama_lapangan}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">User</label>
                                    <select className="form-control" name="id_user" value={this.state.id_user} onChange={this.bind} required>
                                        <option>Select</option>
                                        {this.state.sewa.map((item) => {
                                            return (
                                                <option value={item.id_user}>{item.username}</option>
                                            )
                                        })}
                                    </select>
                                </div> */}
                                ID Lapangan
                                <input type="number" className="form-control" name="id_lapangan"
                                    value={this.state.id_lapangan} onChange={this.bind} required />
                                ID User
                                <input type="number" className="form-control" name="id_user"
                                    value={this.state.id_user} onChange={this.bind} required />
                                Tanggal Book
                                <input type="date" className="form-control" name="tgl_book"
                                    value={this.state.tgl_book} onChange={this.bind} required />
                                Waktu Mulai
                                <input type="time" className="form-control" name="wkt_mulai"
                                    value={this.state.wkt_mulai} onChange={this.bind} required />
                                Waktu Selesai
                                <input type="time" className="form-control" name="wkt_selesai"
                                    value={this.state.wkt_selesai} onChange={this.bind} required />

                                <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                        <Modal id="modal_used" title="Used" bg-header="warning" text_header="white">
                            <form onSubmit={this.Used}>
                                <input type="text" className="form-control" name="status" value={this.state.status} onChange={this.bind} placeholder="Status" required />
                                <button type="submit" className="btn btn-dark m-2">
                                    <span className="fa fa-check-circle"></span> Save
                            </button>
                            </form>
                        </Modal>

                        <Modal id="modal_done" title="Done" bg-header="warning" text_header="white">
                            <form onSubmit={this.Done}>
                                <input type="text" className="form-control" name="status" value={this.state.status} onChange={this.bind} placeholder="Status" required />
                                <button type="submit" className="btn btn-dark m-2">
                                    <span className="fa fa-check-circle"></span> Save
                            </button>
                            </form>
                        </Modal>
                    </div>
                </div>


            </div>


        );
    }
}
export default Sewa