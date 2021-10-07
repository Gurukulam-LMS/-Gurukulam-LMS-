import React, { useState } from 'react';
import "../assets/css/CreateCourse.css";
import { Link } from 'react-router-dom';
function CreateCourse() {
    const [inputText, setInputText] = useState("");
    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }
    return (
        <div className="contain">
            <div className="headline" style={{ marginTop: "40px" }}>
                <h2>Create Course</h2>
            </div>
            <div className="form">
                <form action="">
                    <p>
                        <label for="">Title</label>
                        <input type="text" placeholder="course title" onChange={handleChange} value={inputText} />
                    </p>
                    <p>
                        <label for="">Course Owner Name</label>
                        <input type="text" placeholder="name" onChange={handleChange} value={inputText} />
                    </p>
                    <p>
                        <label for="">Category</label>
                        <input type="text" placeholder="category" onChange={handleChange} value={inputText} />
                    </p>
                    <p>
                        <label for="">Pre-Requirement</label>
                        <input type="text" placeholder="requirement" onChange={handleChange} value={inputText} />
                    </p>
                    <p>
                        <label for="">Price</label>
                        <input type="text" placeholder="price" onChange={handleChange} value={inputText} />
                    </p>
                    <p>
                        <label for="">Description</label>
                        <input type="text" placeholder="description" onChange={handleChange} value={inputText} />
                    </p>

                    <p className="full-width">
                        <button ><Link to={'/uploadcontent'} style={{ textDecoration: "none", color: "black" }} >Create Courses</Link></button>
                    </p>
                </form>
            </div>

        </div>
    )
}

export default CreateCourse
