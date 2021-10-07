import React, {useState} from 'react';
import "../assets/css/CreateCourse.css";
function CreateTest() {
    const [inputText, setInputText] = useState("");
    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }
    return (
        <div className="contain">
            <div className="headline" style={{ marginTop: "40px" }}>
                <h2>Create Series</h2>
            </div>
            <div className="form">
                <form action="">
                    <p>
                        <label for="">Title</label>
                        <input type="text" placeholder="course title" onChange={handleChange} value={inputText}/>
                    </p>
                    <p>
                        <label for="">Category</label>
                        <input type="text" placeholder="category" onChange={handleChange} value={inputText} />
                    </p>
                    <p>
                        <label for="">Total Number Of Tests</label>
                        <input type="text" placeholder="number" onChange={handleChange} value={inputText} />
                    </p>
                    <p>
                        <label for="">Price</label>
                        <input type="text" placeholder="price" onChange={handleChange} value={inputText} />
                    </p>
                   

                    <p className="full-width">
                    <label for="">Upload Content</label>
                        <button>Browse</button>
                    </p>
                </form>
            </div>

        </div>
    )
}

export default CreateTest;
