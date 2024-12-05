import React, { useState, useRef, useEffect } from "react";
import "../Css/Main.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Main() {
    function generateRandomNumber() {
        return Math.ceil(Math.random() * 6);
    }

    const buttonRef = useRef(null);
    const initialDiceValues = Array(10)
        .fill(null)
        .map(() => ({
            value: generateRandomNumber(),
            isHeld: false,
            id: nanoid(),
        }));

    const [diceValues, setDiceValues] = useState(initialDiceValues);
    const [rollCount, setRollCount] = useState(0); // Track the number of rolls

    function checkAllHeld() {
        return diceValues.every((dice) => dice.isHeld);
    }

    function checkAllSameValue() {
        return diceValues.every((dice) => dice.value === diceValues[0].value);
    }

    const gameWon = checkAllHeld() && checkAllSameValue();

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus();
        }
    }, [gameWon]);

    function toggleHold(id) {
        setDiceValues((prevDice) =>
            prevDice.map((die) =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    }

    const diceElements = diceValues.map((element) => (
        <Die
            key={element.id}
            value={element.value}
            isHeld={element.isHeld}
            id={element.id}
            toggleHold={() => toggleHold(element.id)}
        />
    ));

    // Function to roll the dice
    function rollDice() {
        if (gameWon) {
            // Reset the game and roll count
            setDiceValues(
                Array(10)
                    .fill(null)
                    .map(() => ({
                        value: generateRandomNumber(),
                        isHeld: false,
                        id: nanoid(),
                    }))
            );
            setRollCount(0); // Reset roll count
        } else {
            const newDiceValues = diceValues.map((prevEle) => ({
                ...prevEle,
                value: prevEle.isHeld ? prevEle.value : generateRandomNumber(),
            }));
            setDiceValues(newDiceValues);
            setRollCount((prevCount) => prevCount + 1); // Increment roll count
        }
    }

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            <p className="roll-count">Rolls: {rollCount}</p> {/* Display the roll count */}
            <div className="die-container">{diceElements}</div>
            <button ref={buttonRef} id="roll-btn" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    );
}
