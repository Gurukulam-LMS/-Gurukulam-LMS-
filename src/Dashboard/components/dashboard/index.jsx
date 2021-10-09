import '../../assets/css/student.css'
import Section2 from './section2'
import Section3 from './section3'
const Dashboard = () => {
    return (
        <>
            <div className="container col-12 col-lg-9 section-1">
                <div className="row">
                    <div className="col-lg-7 col-12 section-left mt-lg-3 mt-5">
                        <div className="card c1">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8 text">
                                        <h3 className="h3 ">Welcome</h3>
                                        <p className="lead  ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
                                            impedit qui laboriosam.</p>
                                    </div>
                                    <div className="col">
                                        <img src="dashboard/img.png" className="img img-fluid" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex mt-3">
                            <h5 className="">All Course</h5>
                            <input type="button" className="btn btn-sm ml-auto btn-pink"
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

                    <div className="col-lg-5 col-12 section-right mt-lg-3 mt-5">
                        <div className="card c2 ">
                            <div className="card-body">
                                <div className="row align-middle mt-2">
                                    <div className="col-6 text-center name">
                                        <img src="dashboard/Group 199.png" alt="" />
                                        <h6>Anne Frank</h6>
                                        <h7>Student</h7>
                                    </div>
                                    <div className="col-6 text-center align-middle">
                                        <div className="circle">
                                            <p><span>7.6</span><br />Hourse Spent<br />This Week</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-5 mb-4">
                                    <div className="col-4 text-left">
                                        <div className="box">
                                            <h5>4</h5>
                                            <h7>Cours <br /> Entrolled</h7>
                                        </div>
                                    </div>
                                    <div className="col-4 text-left">
                                        <div className="box">
                                            <h5>2</h5>
                                            <h7>Cours <br /> Completed</h7>
                                        </div>
                                    </div>
                                    <div className="col-4 text-left">
                                        <div className="box">
                                            <h5>2</h5>
                                            <h7>Cours in <br /> Progress</h7>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <Section2 />
            <Section3 />
        </>
    )
}
export default Dashboard;