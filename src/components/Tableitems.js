import React from 'react'

export const Tableitems =(props)=>{
    return(
    <li className="table-row">

        <div className={`col ${props.c2}`} data-label="Customer Name">{props.Cname}</div>
        <div className={`col ${props.c3}`} data-label="Customer Name">{props.category}</div>
        <div className={`col ${props.c4}`} data-label="Amount">{props.price}</div>
        <div className={`col ${props.c5}`} data-label="Payment Status">{props.lectures}</div>
        <div className={`col ${props.c6}`} data-label="Customer Name">{props.seller}</div>
    </li>
    )
}

export const Testitems =(props)=>{
    return(
        <li className="table-row">

                        <div className={`col ${props.c2}`} data-label="Customer Name">{props.Tname}</div>
                        <div className={`col ${props.c3}`} data-label="Customer Name">{props.category}</div>
                        <div className={`col ${props.c4}`} data-label="Amount">{props.price}</div>
                        <div className={`col ${props.c5}`} data-label="Payment Status">{props.lectures}</div>
                    </li>
    )
}
export const Useritems = (props) => {
    return(
        <li className="table-row">

                        <div className={`col ${props.c2}`} data-label="Customer Name">{props.Uname}</div>
                        <div className={`col ${props.c5}`} data-label="Payment Status">{props.date}</div>
                        <div className={`col ${props.c6}`} data-label="Customer Name">{props.course}</div>
                    </li>
    )
}


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