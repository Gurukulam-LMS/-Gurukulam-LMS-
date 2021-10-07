import React from 'react'
import Image1 from "../assets/Images/Group 256.png";
function Element(props){
    return <span className="element"><img src={Image1} alt="logo"/> <div class="names"> {props.id} <br/> <p>Available</p></div>  </span>
  }
  
  function InfiniteScroll(){
    const [state, setState] = React.useState(["Jason Williams","Jason Williams","Pamella Foster","Rose Simmions","Rose Simmions","Pamella Foster","Jason Williams","Jason Williams"])
    
    return (
      <div>
        <div className='scroller'>
          {state.map((k) => (<Element key={k} id={k} />))}
        </div>    
      </div>)
  }
export default InfiniteScroll;
