import '../../assets/css/test-series.css'
import data from '../../api/test-series.json'
const TestSeries = () => {
    return (
        <>
            <div className="container test-series col-12 col-lg-9">
                <div className="row">
                    <div className="col-12">
                        <h3>Test Series</h3>
                        <ul className="list-group">
                            {
                                data.map(e => (
                                    <li key={e.id} className="list-group-item d-flex justify-content-between align-items-center mt-2 mb-2">
                                        <div className="media align-middle">
                                            {/* <img className="align-self-center mr-3" src="..." alt="Generic placeholder image"/> */}
                                            <span className="far fa-file-alt mr-3 pt-2"></span>
                                            <div className="media-body">
                                                <h5 className="">{e.name}</h5>
                                                <p>{e.details}</p>
                                            </div>
                                        </div>
                                        <span className="badge text-dark">{e.currentState}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TestSeries;