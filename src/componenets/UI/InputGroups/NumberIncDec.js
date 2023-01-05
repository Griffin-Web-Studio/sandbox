import React, { useState } from "react";
import DecrementButton from "../Buttons/DecrementButton";
import IncrementButton from "../Buttons/IncrementButton";

export default function NumberIncDec(props) {
    const { label, id, value, minValue, maxValue, onChange, increaseAmount, decreaseAmount, increaseInterval, decreesInterval, firstDecrementDelay, firstIncrementDelay } = props;
    const resetValue = Number(props.resetValue);
    const [inputValue, setInputValue] = useState(value);

    if (inputValue !== value) {
        setInputValue(value);
    }

    const onButtonPressHandler = (newValue) => {
        updateValue(newValue);
    };

    const onInputChangeHandler = (e) => {
        updateValue(Number(e.target.value));
    };

    const updateValue = (newValue) => {
        setInputValue(newValue);

        onChange(newValue);
    };

    const onResetHandler = (e) => {
        setInputValue(resetValue);

        onChange(resetValue);
    };

    return (
        <div className="grid col-12 gap-col-4">
            <div className="grid-12">
                <label htmlFor={id} className="label">
                    {label}
                </label>
            </div>

            <div className={inputValue !== resetValue ? "grid-9" : "grid-11"}>
                <input type="number" id={id} name={id} className="input full-height input--radius-left" value={inputValue} onChange={onInputChangeHandler} />
            </div>

            {inputValue !== resetValue ? (
                <div className="grid-2">
                    <button className="button button--large-font" onClick={onResetHandler}>
                        <i className="icon-reset"></i>
                    </button>
                </div>
            ) : null}

            <div className="grid col-1 grid-1 gap-row-4">
                <div className="grid-1">
                    <IncrementButton value={inputValue} onChange={onButtonPressHandler} increaseAmount={increaseAmount} interval={increaseInterval} firstDelay={firstIncrementDelay} maxValue={maxValue} />
                </div>

                <div className="grid-1">
                    <DecrementButton value={inputValue} onChange={onButtonPressHandler} decreaseAmount={decreaseAmount} interval={decreesInterval} firstDelay={firstDecrementDelay} minValue={minValue} />
                </div>
            </div>
        </div>
    );
}

// set a default value for the `maxValue` prop
NumberIncDec.defaultProps = {
    maxValue: "infinity",
    minValue: "infinity",
    resetValue: 0,
    value: 0,
    increaseAmount: 1,
    decreaseAmount: 1,
    increaseInterval: 20,
    decreesInterval: 20,
    firstDecrementDelay: 500,
    firstIncrementDelay: 500
};