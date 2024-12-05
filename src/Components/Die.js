import React from "react"; 
import "../Css/Die.css";

export default function Die(props) {

    const styles={
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="container">
            <button
                className="dice-number"
                style={styles}
                onClick={props.toggleHold}
                aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
                aria-pressed={props.isHeld}
            >
                {props.value}
                
            </button>
        </div>
    );
}
