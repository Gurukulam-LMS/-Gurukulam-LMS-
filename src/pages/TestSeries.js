import React from 'react'
import "../assets/css/Courses.css"
import { Link } from 'react-router-dom'
import { Testitems } from '../components/Tableitems'
function TestSeries() {
    return (
        <>
            <div className="container">
                <div className="headline" style={{ marginTop: "40px" }}>
                    <h2>Test Series</h2>
                    <Link to={'/createtests'} >Create Tests</Link>
                </div>

                <ul className="responsive-table">
                    <li className="table-header">

                        <div className="col col-2">Series Name</div>
                        <div className="col col-3">Category </div>
                        <div className="col col-4">Price</div>
                        <div className="col col-5">Total Lectures</div>

                    </li>
                    <Testitems c2="col-2" c3="col-3" c4="col-4" c5="col-5" Tname="Data Science and Machine Learning with Python - Hands On!" category="Science" price="$523" lectures="29 lectures" />
                    <Testitems c2="col-2" c3="col-3" c4="col-4" c5="col-5" Tname="Creat Amazing Color Schemes for Your UX Design Projects" category="reactjs" price="$523" lectures="29 lectures"  />
                    <Testitems c2="col-2" c3="col-3" c4="col-4" c5="col-5" Tname="Culture & Leadership: startergies for a Successful Business" category="Business" price="$523" lectures="29 lectures"  />
                    <Testitems c2="col-2" c3="col-3" c4="col-4" c5="col-5" Tname="Finance Series: Learn to Budget and Calculated your Net Worth." category="Finance" price="$523" lectures="29 lectures" />
                    <Testitems c2="col-2" c3="col-3" c4="col-4" c5="col-5" Tname="Bulid brand Into Marketing: Tackling the New Marketing Landscape" category="Marketing" price="$523" lectures="29 lectures"  />
                    <Testitems c2="col-2" c3="col-3" c4="col-4" c5="col-5" Tname="Graphic Design: Illustrating Badges and Icons with Geometric Shapes" category="Design" price="$523" lectures="29 lectures"/>


                    
                </ul>
            </div>
        </>
    )
}
export default TestSeries;

{/*<li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Doe</div>
                        <div className="col col-3" data-label="Customer Name">John Smith</div>
                        <div className="col col-4" data-label="Amount">$350</div>
                        <div className="col col-5" data-label="Payment Status">Pending</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">Jennifer SmithJennifer SmithJennifer SmithJennifer SmithJennifer SmithJennifer Smith</div>
                        <div className="col col-3" data-label="Customer Name">John Smith</div>
                        <div className="col col-4" data-label="Amount">$220</div>
                        <div className="col col-5" data-label="Payment Status">Pending</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Smith</div>
                        <div className="col col-3" data-label="Customer Name">John Smith</div>
                        <div className="col col-4" data-label="Amount">$341</div>
                        <div className="col col-5" data-label="Payment Status">Pending</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Carpenter</div>
                        <div className="col col-3" data-label="Customer Name">John Smith</div>
                        <div className="col col-4" data-label="Amount">$115</div>
                        <div className="col col-5" data-label="Payment Status">Pending</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Carpenter</div>
                        <div className="col col-3" data-label="Customer Name">John Smith</div>
                        <div className="col col-4" data-label="Amount">$115</div>
                        <div className="col col-5" data-label="Payment Status">Pending</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Carpenter</div>
                        <div className="col col-3" data-label="Customer Name">John Smith</div>
                        <div className="col col-4" data-label="Amount">$115</div>
                        <div className="col col-5" data-label="Payment Status">Pending</div>
                    </li>
                    */}
