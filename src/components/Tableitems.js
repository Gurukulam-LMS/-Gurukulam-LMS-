import React from "react";
import { AiFillDelete } from "react-icons/ai";
export const Tableitems = (props) => {
  return (
    <li className="table-row">
      <div className={`col ${props.c2}`} data-label="Customer Name">
        {props.Cname}
      </div>
      <div className={`col ${props.c3}`} data-label="Customer Name">
        {props.category}
      </div>
      <div className={`col ${props.c4}`} data-label="Amount">
        {props.price}
      </div>
      <div className={`col ${props.c5}`} data-label="Payment Status">
        {props.lectures}
      </div>
      <div className={`col ${props.c6}`} data-label="Customer Name">
        {props.seller}
      </div>
    </li>
  );
};

export const Testitems = (props) => {
  return (
    <li className="table-row">
      <div className={`col ${props.c2}`} data-label="Customer Name">
        {props.Tname}
      </div>
      <div className={`col ${props.c3}`} data-label="Customer Name">
        {props.category}
      </div>
      <div className={`col ${props.c4}`} data-label="Amount">
        {props.price}
      </div>
      <div className={`col ${props.c5}`} data-label="Payment Status">
        {props.lectures}
      </div>
    </li>
  );
};
export const Useritems = (props) => {
  const deleteBlogHandler = () => {
    setTimeout(async () => {
      try {
        const api_url = `${process.env.REACT_APP_API_URL}/blog/deleteBlog/${props.id}`;
        const res = await fetch(api_url);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }, 3000);
  };

  return (
    <li className="table-row">
      <div className={`col ${props.c2}`} data-label="Customer Name">
        <a
          href={process.env.REACT_APP_STUDENT_WEBSITE + "/blog/" + props.id}
          style={{ textDecoration: "none !important", color: "black" }}
        >
          {props.Uname}
        </a>
      </div>
      <div className={`col ${props.c5}`} data-label="Payment Status">
        {props.date}
      </div>
      <div className={`col ${props.c6}`} data-label="Customer Name">
        {props.course}
      </div>
      <div className={`col ${props.c7}`} onClick={deleteBlogHandler}>
        <AiFillDelete
          fontSize={30}
          style={{ cursor: "pointer", color: "maroon" }}
        />
      </div>
    </li>
  );
};

// function Tableitems(props) {
//     return (
//         <li className="table-row">

//         <div className={`col ${props.c2}`} data-label="Customer Name">{props.Cname}</div>
//         <div className={`col ${props.c3}`} data-label="Customer Name">{props.category}</div>
//         <div className={`col ${props.c4}`} data-label="Amount">{props.price}</div>
//         <div className={`col ${props.c5}`} data-label="Payment Status">{props.lectures}</div>
//         <div className={`col ${props.c6}`} data-label="Customer Name">{props.seller}</div>
//     </li>
//     )
// }

// export default Tableitems
