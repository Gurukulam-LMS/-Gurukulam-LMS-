import React, { useState } from 'react';
import "../assets/css/CreateCourse.css";
import Popup from './Popup';
function Upload() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <div className="contain">
                <div className="headline" style={{ marginTop: "40px" }}>
                    <h2>Upload Content</h2>
                </div>
                <div className="form1" style={{ gridTemplateColumns: "0.5fr 0.5fr", gridGap: "30px 0px" }} >
                    <form action="">
                        <p>
                            <label for="">Title</label>
                        </p>
                        <p>
                            <label for="">Course Owner Name</label>
                        </p>
                        <p>
                            <label for="">Category</label>
                        </p>
                        <p>
                            <label for="">Pre-Requirement</label>
                        </p>
                        <p>
                            <label for="">Price</label>
                        </p>
                        <p>
                            <label for="">Description</label>
                        </p>

                        <p className="full-width" style={{ paddingTop: "50px" }}>

                            <button onClick={togglePopup}>Add Topic</button>
                            {isOpen && <Popup
                                handleClose={togglePopup}
                            />}
                        </p>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Upload;
