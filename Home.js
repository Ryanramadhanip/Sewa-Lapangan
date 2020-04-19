import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slide1 from '../image/Slide1.jpg';
// import Slide2 from '../image/Slide2.jpg';
// import Slide3 from '../image/Slide3.jpg';
// import Slide4 from '../image/Slide4.jpg';

export default class Home extends React.Component {
    render() {
        return (
            <div className=" container">
                <div className="row">
                    <div className="col-lg-3">
                        <h2 className="my-4">Champs Futsal</h2>
                        <div className="form-group">
                            <label for="name">Lapangan</label>
                            <input type="text" className="form-control"
                                value="Lapangan Futsal A"
                            />
                            <input type="text" className="form-control"
                                value="Lapangan Futsal B"
                            />
                        </div>
                        <div className="form-group">
                            <label for="name">Alamat</label>
                            <input type="text" className="form-control"
                                value="Jalan Futsal no. 666"
                            />
                        </div>
                        <div className="form-group">
                            <label for="name">Kontak</label>
                            <input type="text" className="form-control"
                                value="+62 856 6600 7011"
                            />
                        </div>
                        <div className="form-group">
                            <label for="name">Panduan</label>
                            <input type="text" className="form-control"
                                value=
                                "Pilih Lapangan -> Order"
                            />
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#slideshow" data-slide-to="0" className="active"></li>
                                <li data-target="#slideshow" data-slide-to="1"></li>
                            </ol>
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active">
                                    <img className="d-block img-fluid" src={Slide1} alt="First slide" />
                                </div>
                                {/* <div className="carousel-item">
                                    <img className="d-block img-fluid" src={Slide2} alt="Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={Slide3} alt="Third slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={Slide4} alt="Fourth slide" />
                                </div> */}
                            </div>
                            <a className="carousel-control-prev" href="#slideshow" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#slideshow" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}