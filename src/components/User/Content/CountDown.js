import { useState, useEffect } from "react";
const CountDown = (props) =>{
    const [count, setCount] = useState(300)
    

    const toMMSS  = new Date(count * 1000).toISOString().substring(14, 19)
  
    useEffect(() =>{
       
        if(count === 0 ) {
            props.onTimeUp();
            return;}
        const timer = setInterval(() => {
                setCount(count - 1)
            },1000)
            /*
                timer1  setCount => change count 
                ====
                timer2  setCount => change count 

            clean up
        */
       return () => {
        clearInterval(timer)
       }
    },[count])
    return(
        <div className="countdown-container">
            {toMMSS}
        </div>
    )
}
export default CountDown;