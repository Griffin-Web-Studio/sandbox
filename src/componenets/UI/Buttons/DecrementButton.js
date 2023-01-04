// DecrementButton.js
import React, { useState, useEffect } from "react";

const DecrementButton = (props) => {
    const { value, onChange, minValue, decreaseAmount, firstDelay, interval } = props;
    const [isDecrementing, setIsDecrementing] = useState(false);
    const [firstDecrementDone, setFirstDecrementDone] = useState(false);
    const [madeFirstDecrement, setMadeFirstDecrement] = useState(false);

    useEffect(() => {
        setFirstDecrementDone(false);
        setMadeFirstDecrement(false);
    }, [isDecrementing]);

    useEffect(() => {
        let intervalTract = null;
        let timeoutTract = null;

        if (isDecrementing) {
            if (!firstDecrementDone) {
                if (!madeFirstDecrement) {
                    setMadeFirstDecrement(true);

                    if (minValue === "infinity") {
                        onChange(value - 1);
                    } else {
                        if (value > Number(minValue)) {
                            onChange(value - 1);
                        }
                    }
                } else {
                    timeoutTract = setTimeout(() => {
                        setFirstDecrementDone(true);
                    }, firstDelay);
                }
            } else {
                intervalTract = setInterval(() => {
                    if (minValue === "infinity") {
                        onChange(value - Number(decreaseAmount));
                    } else {
                        if (value > Number(minValue) && value < Number(decreaseAmount) * 2) {
                            onChange(value - 1);
                        } else if (value > Number(minValue)) {
                            onChange(value - Number(decreaseAmount));
                        }
                    }
                }, interval);
            }
        } else if (!isDecrementing && value !== 0) {
            clearInterval(intervalTract);
            clearTimeout(timeoutTract);
        }
        return () => {
            clearInterval(intervalTract);
            clearTimeout(timeoutTract);
        };
    }, [minValue, isDecrementing, value, firstDecrementDone, madeFirstDecrement, onChange, decreaseAmount, firstDelay, interval]);

    return (
        <button
            type="button"
            className="gwssc-button gwssc-button__secondary-alt gwssc-button__secondary-alt--short gwssc-button__secondary-alt--radius-bottom-right"
            onMouseDown={() => setIsDecrementing(true)}
            onMouseUp={() => setIsDecrementing(false)}
            onMouseLeave={() => setIsDecrementing(false)}
            onClick={() => false}>
            -
        </button>
    );
};

export default DecrementButton;
