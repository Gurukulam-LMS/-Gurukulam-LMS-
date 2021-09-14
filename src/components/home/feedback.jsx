
const FeedBackDiv = () => {
    return (
        <div class="col-sm-12 col-lg-5 mx-3">
            <div class="card card-1 text-center">
                <div class="card-head">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem doloremque vitae itaque. Maiores aut possimus culpa facilis suscipit alias nisi, at dicta recusandae! Voluptas, fugiat soluta ut assumenda blanditiis asperiores!</p>
                    <h6>Mellissa Roberts</h6>
                    <h7>Product Designer,USA</h7>
                </div>
                <div class="card-body">
                    <img src="Images/Group 212.png" class=" mt-2 rounded-circle img-1" width="75px" height="75px" />
                    <p class="rating"><span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                    </p>
                </div>
            </div>
        </div>
    )
}
const FeedBack = () => {
    return (
        <>
            <div class="container feedback-carousel  d-none d-lg-block mt-5 mb-5 p-2 col-12 col-lg-9 ">
                <div class="row">
                    <div class="col-12 text-center">
                        <h5>Student Testimonial</h5>
                        <h2>Feedback From <span>Student</span></h2>
                    </div>
                    <div class="col-12">
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators ">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active bg-danger"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1" class=" bg-danger"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <div class="row mt-5 mb-5">
                                        <FeedBackDiv />
                                        <FeedBackDiv />

                                    </div>
                                </div>

                                <div class="carousel-item">
                                    <div class="row mt-5 mb-5">
                                        <FeedBackDiv />
                                        <FeedBackDiv />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FeedBack;
