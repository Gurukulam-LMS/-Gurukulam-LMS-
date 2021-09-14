const Section2 = () => {
    return (
        <div className="container col-12 col-lg-9 section-2">
            <div className="row">
                <div className="col-lg-7 col-12 section-left  mt-5">
                    <div className="d-flex ">
                        <h5 className="">Top Course</h5><input type="button" className="btn btn-sm ml-auto btn-pink"
                            value="See All" />
                    </div>
                    <div className="row ">
                        <div className="col-lg-6 col-12 mt-lg-3 mt-4">
                            <div className="media m1 border">
                                <img className="mr-3 img img-fluid" src="dashboard/Mask Group 41.png"
                                    alt="Generic placeholder image" />
                                <div className="media-body">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint doloribus</p>
                                    <span>Lorem ipsum dolor</span>
                                    <p className="rating"><span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12 mt-lg-3 mt-4">
                            <div className="media m1 border">
                                <img className="mr-3 img img-fluid" src="dashboard/Mask Group 42.png"
                                    alt="Generic placeholder image" />
                                <div className="media-body">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint doloribus</p>
                                    <span>Lorem ipsum dolor</span>
                                    <p className="rating"><span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-lg-5 col-12 test mt-5">
                    <div className="card c2 ">
                        <div className="card-body">
                            <div className="d-flex ">
                                <h6 className="">Test Series</h6>
                                <input type="button" className="btn btn-sm ml-auto btn-pink"
                                    value="See All" />
                            </div>
                            <div className="row mt-2">
                                <div className="col-8">
                                    <ul className="list-group">
                                        <li><span className="far fa-file-alt mr-3"></span> Lorem ipsum dolor sit</li>
                                        <li><span className="far fa-file-alt mr-3"></span> Lorem ipsum dolor sit</li>
                                        <li><span className="far fa-file-alt mr-3"></span> Lorem ipsum dolor sit</li>
                                    </ul>
                                </div>
                                <div className="col-4">
                                    <img src="dashboard/Group 253.png" className="img img-fluid img-test" alt="" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default Section2;
