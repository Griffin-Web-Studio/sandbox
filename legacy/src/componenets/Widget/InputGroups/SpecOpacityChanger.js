import React, { useState } from "react";

export default function SpecOpacityChanger(props) {
    const { onChange, specOptions } = props;
    const [value, setValue] = useState(specOptions.specOpacity);
    let queryURL = new URL(specOptions.currentUrl);

    const OnIncrementHandler = (e) => {
        e.preventDefault();
        const newValue = parseFloat(value) + 0.1;

        if (value < 1) {
            updateValue(newValue);
        }
    };

    const OnDecrementHandler = (e) => {
        e.preventDefault();
        const newValue = parseFloat(value) - 0.1;

        if (value > 0) {
            updateValue(newValue);
        }
    };

    const onSelectHandler = (e) => {
        const newValue = parseFloat(e.target.value);

        updateValue(newValue);
    };

    const updateValue = (newValue) => {
        const updatedValue = parseFloat(newValue).toFixed(1);
        setValue(updatedValue);

        if (newValue > 0) {
            queryURL.searchParams.set("spec-opacity", updatedValue);
        } else {
            queryURL.searchParams.delete("spec-opacity");
        }
        onChange({ specOpacity: updatedValue, frameIsLoaded: true }, queryURL);
    };

    const onSpecColoursInverseHandler = (e) => {
        e.preventDefault();
        queryURL.searchParams.set("invert-spec", !specOptions.invertSpec);
        onChange({ invertSpec: !specOptions.invertSpec }, queryURL);
    };

    return (
        <fieldset className="group">
            <div className="grid gap-col-4">
                <div className="grid-12">
                    <legend className="legend">
                        <label htmlFor="spec-opacity">Spec Image Opacity</label>
                    </legend>
                </div>

                <div className="grid-6">{/*Spacer*/}</div>

                <div className="grid-3">
                    <button className="button button__secondary--radius-top button__secondary" onClick={OnDecrementHandler}>
                        -
                    </button>
                </div>

                <div className="grid-3">
                    <button className="button button--radius-top" onClick={OnIncrementHandler}>
                        +
                    </button>
                </div>

                <div className="grid-24">
                    <div className="input-wrap input-wrap--radius-bottom">
                        <div className="grid gap-col-8">
                            <div className="grid-3">
                                <input type="text" className="input full-height input--radius-left" value={value * 100 + '%'} disabled />
                            </div>

                            <div className="grid-18">
                                <div className="input">
                                    <input type="range" id="spec-opacity" name="spec-opacity" className="spec-opacity" value={value} min="0" max="1" step="0.1" onChange={onSelectHandler} />
                                </div>
                            </div>

                            <div className="grid-3">
                                <button
                                    className={
                                        `button__${specOptions.invertSpec ? "secondary" : "secondary-alt"} ` +
                                        `button__${specOptions.invertSpec ? "secondary" : "secondary-alt"}--radius-right ` +
                                        `button__${specOptions.invertSpec ? "secondary" : "secondary-alt"}--large-font`
                                    }
                                    onClick={onSpecColoursInverseHandler}>
                                    <i className="icon-inverted"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    );
}
