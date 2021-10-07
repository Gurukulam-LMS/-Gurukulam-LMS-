import React from 'react'
import "../assets/css/Courses.css"
import { Useritems } from '../components/Tableitems'
function Users() {
    return (
        <>
            <div className="container">
                <div className="headline" style={{ marginTop: "40px" }}>
                    <h2>Users</h2>
                </div>

                <ul className="responsive-table">
                    <li className="table-header">

                        <div className="col col-2">User Name</div>
                        <div className="col col-5">Date</div>
                        <div className="col col-6">Enrolled Courses</div>
                    </li>
                    <Useritems c2="col-2" c5="col-5" c6="col-6" Uname="Jhon Doe"  date="12 August 2021" course="Data Science" />
                    <Useritems c2="col-2" c5="col-5" c6="col-6" Uname="John Carpenter"  date="12 August 2021" course="Machine Learning" />
                    <Useritems c2="col-2" c5="col-5" c6="col-6" Uname="John Carpenter"  date="12 August 2021" course="Finance" />
                    <Useritems c2="col-2" c5="col-5" c6="col-6" Uname="John Carpenter"  date="12 August 2021" course="Business" />
                    <Useritems c2="col-2" c5="col-5" c6="col-6" Uname="John Carpenter"  date="12 August 2021" course="Marketing" />
                    <Useritems c2="col-2" c5="col-5" c6="col-6" Uname="John Carpenter" date="12 August 2021" course="Data Science" />


                    

                </ul>
            </div>
        </>
    )
}
export default Users

{/* <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Doe</div>
                        <div className="col col-5" data-label="Payment Status">12 August 2021</div>
                        <div className="col col-6" data-label="Customer Name">John Smith</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">Jennifer SmithJennifer SmithJennifer SmithJennifer SmithJennifer SmithJennifer Smith</div>
                        <div className="col col-5" data-label="Payment Status">12 August 2021</div>
                        <div className="col col-6" data-label="Customer Name">John Smith</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Smith</div>
                        <div className="col col-5" data-label="Payment Status">12 August 2021</div>
                        <div className="col col-6" data-label="Customer Name">John Smith</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Carpenter</div>
                        <div className="col col-5" data-label="Payment Status">12 August 2021</div>
                        <div className="col col-6" data-label="Customer Name">John Smith</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Carpenter</div>
                        <div className="col col-5" data-label="Payment Status">12 August 2021</div>
                        <div className="col col-6" data-label="Customer Name">John Smith</div>
                    </li>
                    <li className="table-row">

                        <div className="col col-2" data-label="Customer Name">John Carpenter</div>
                        <div className="col col-5" data-label="Payment Status">12 August 2021</div>
                        <div className="col col-6" data-label="Customer Name">John Smith</div>
                    </li>

  */}