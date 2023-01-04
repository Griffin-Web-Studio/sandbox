import React, { useState, useEffect } from "react";

const IncrementButton = (props) => {
    const { value, onChange, maxValue, increaseAmount, firstDelay, interval } = props;
    const [ isIncrementing,     setIsIncrementing ]     = useState(false);
    const [ firstIncrementDone, setFirstIncrementDone ] = useState(false);
    const [ madeFirstIncrement, setMadeFirstIncrement ] = useState(false);

    //reset values back to default once the user stops incrementing
    useEffect(() => {
        setFirstIncrementDone(false);
        setMadeFirstIncrement(false);
    }, [isIncrementing]);

    useEffect(() => {
        let intervalTrack = null;
        let timeoutTrack = null;

        if (isIncrementing) {
            if (!firstIncrementDone) {
                if (!madeFirstIncrement) {
                    setMadeFirstIncrement(true);

                    if (maxValue === "infinity") {
                        onChange(value + 1);
                    } else {
                        if (value < maxValue) {
                            onChange(value + 1);
                        }
                    }
                } else {
                    timeoutTrack = setTimeout(() => {
                        setFirstIncrementDone(true);
                    }, firstDelay);
                }
            } else {
                intervalTrack = setInterval(() => {
                    if (maxValue === "infinity") {
                        onChange(value + Number(increaseAmount));
                    } else {
                        if (value < Number(maxValue) && value > (maxValue - (Number(increaseAmount) * 2))) {
                            onChange(value + 1);
                        } else if (value < maxValue) {
                            onChange(value + Number(increaseAmount));
                        }
                    }
                }, interval);
            }
        } else if (!isIncrementing && value !== 0) {
            clearInterval(intervalTrack);
            clearTimeout(timeoutTrack);
        }
        return () => {
            clearInterval(intervalTrack);
            clearTimeout(timeoutTrack);
        };
    }, [maxValue, isIncrementing, value, firstIncrementDone, madeFirstIncrement, onChange, increaseAmount, firstDelay, interval]);

    return (
        <button
            type="button"
            className="gwssc-button gwssc-button__alt gwssc-button__alt--short gwssc-button__alt--radius-top-right"
            onMouseDown={() => setIsIncrementing(true)}
            onMouseUp={() => setIsIncrementing(false)}
            onMouseLeave={() => setIsIncrementing(false)}
            onClick={() => false}>
            +
        </button>
    );
};

export default IncrementButton;
