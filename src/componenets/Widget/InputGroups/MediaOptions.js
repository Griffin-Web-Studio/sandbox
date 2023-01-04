import React, { useState } from "react";
import NumberInputIncDec from "../../UI/InputGroups/NumberIncDec";

export default function MediaOptions(props) {
    const { specOptions, onChange } = props;
    const [mediaWidth, setMediaWidth] = useState(specOptions.mediaWidth);

    let queryURL = new URL(specOptions.currentUrl);

    const onMediaWidthChangeHandler = (value) => {
        queryURL.searchParams.set("spec-media-width", value);
        setMediaWidth(value);
        onChange({ mediaWidth: value }, queryURL);
    };

    const onMediaZoomChangeHandler = (value) => {
        queryURL.searchParams.set("spec-media-zoom", value);
        onChange({ mediaZoom: value }, queryURL);
    };

    const OnSelectHandler = (e) => {
        const newValue = Number(e.target.value);
        queryURL.searchParams.set("spec-media-width", newValue);
        setMediaWidth(newValue);
        onChange({ mediaWidth: newValue }, queryURL);
    };

    return (
        <fieldset className="gwssc-group">
            <div className="gwssc-grid gap-col-4">
                <div className="gwssc-grid-12">
                    <legend className="gwssc-legend">
                        <label htmlFor="site-width-preset">Media Options</label>
                    </legend>
                </div>

                <div className="gwssc-grid-24 gwssc-input-wrap gwssc-input-wrap--radius-bottom gwssc-input-wrap--radius-top-right">
                    <div className="gwssc-grid col-2 gap-row-10">
                        <div className="gwssc-grid-2">
                            <div className="gwssc-grid col-1 gap-col-10 ">
                                <div className="gwssc-grid-1">
                                    <label htmlFor="site-width-preset" className="gwssc-label full">
                                        Media Presets
                                    </label>
                                </div>

                                <div className="gwssc-grid-1">
                                    <select className="gwssc-input gwssc-input--radius-top gwssc-input--radius-bottom" name="site-width-preset" id="site-width-preset" onChange={OnSelectHandler} value={mediaWidth}>
                                        {/* Mobile */}
                                        <option value="320">s-mobile (320px)</option>
                                        <option value="375">m-mobile (375px)</option>
                                        <option value="425">l-mobile (425px)</option>
                                        {/* Tablet */}
                                        <option value="540">s-tablet (540px)</option>
                                        <option value="655">m-tablet (655px)</option>
                                        <option value="768">l-tablet (768px)</option>
                                        {/* Laptop */}
                                        <option value="854">s-laptop (854px)</option>
                                        <option value="940">m-laptop (940px)</option>
                                        <option value="1024">l-laptop (1024px)</option>
                                        {/* Desktop */}
                                        <option value="1440">s-desktop (1440px)</option>
                                        <option value="1920">m-desktop (1920px)</option>
                                        <option value="2560">l-desktop (2560px)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="gwssc-grid-2">
                            <div className="gwssc-grid col-2 gap-col-10">
                                <div className="gwssc-grid-1">
                                    <NumberInputIncDec
                                        value={mediaWidth}
                                        onChange={onMediaWidthChangeHandler}
                                        label="Media Width"
                                        id="spec-media-width"
                                        resetValue="320"
                                        minValue="0"
                                        increaseAmount="10"
                                        decreaseAmount="10"
                                        increaseInterval="20"
                                        decreesInterval="20"
                                        firstDecrementDelay="500"
                                        firstIncrementDelay="500"
                                    />
                                </div>

                                <div className="gwssc-grid-1">
                                    <NumberInputIncDec
                                        value={specOptions.mediaZoom}
                                        onChange={onMediaZoomChangeHandler}
                                        label="Media Zoom"
                                        id="spec-media-zoom"
                                        resetValue="100"
                                        minValue="0"
                                        increaseAmount="1"
                                        decreaseAmount="1"
                                        increaseInterval="20"
                                        decreesInterval="20"
                                        firstDecrementDelay="500"
                                        firstIncrementDelay="500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    );
}
