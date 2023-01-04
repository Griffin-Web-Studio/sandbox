import React, { useState } from "react";
import SpecCheckerCredits from "./InputGroups/Credits";
import MediaOptions from "./InputGroups/MediaOptions";
import SpecCheckerCommunication from "./InputGroups/SpecCheckerCommunication";
import SpecOpacityChanger from "./InputGroups/SpecOpacityChanger";
import SpecPositionAdjust from "./InputGroups/SpecPositionAdjust";
import WebsiteFrameLoader from "./InputGroups/WebsiteFrameLoader";
import WebsiteSpecLoader from "./InputGroups/WebsiteSpecLoader";

export default function FormWrapper(props) {
    const { onFormChange } = props
    const urlParams = new URLSearchParams(window.location.search)
    const [options, setOptions] = useState({
        currentUrl:      new URL(window.location.href),
        frameSrc:        urlParams.get("production-site") !== null  ? urlParams.get("production-site")          : "",
        frameIsLoaded:   false,
        specSrc:         urlParams.get("spec-img") !== null         ? urlParams.get("spec-img")                 : "",
        specIsLoaded:    false,
        mouseEventsOn:   urlParams.get("mouse-events-on") !== null  ? urlParams.get("mouse-events-on")          : 'frame',
        invertSpec:      urlParams.get("invert-spec") !== null      ? urlParams.get("invert-spec")              : true,
        specOpacity:     urlParams.get("spec-opacity") !== null     ? Number(urlParams.get("spec-opacity"))     : 0.3,
        specYAxis:       urlParams.get("spec-y-adjust") !== null    ? Number(urlParams.get("spec-y-adjust"))    : 0,
        specXAxis:       urlParams.get("spec-x-adjust") !== null    ? Number(urlParams.get("spec-x-adjust"))    : 0,
        mediaWidth:      urlParams.get("spec-media-width") !== null ? Number(urlParams.get("spec-media-width")) : 320,
        mediaZoom:       urlParams.get("spec-media-zoom") !== null  ? Number(urlParams.get("spec-media-zoom"))  : 100,
    });

    const onSpecOptionsChangeHandler = (newOptions, newQueryURL) => {
        let updatedOptions = { ...options, ...newOptions };

        setOptions((oldOptions) => ({...oldOptions, ...newOptions, currentUrl: newQueryURL.toString() }));
        onFormChange(updatedOptions);
        window.history.replaceState({}, "Spec Checker Tool", newQueryURL.toString());
    };

    return (
        <form method="get" className="gwssc-form">
            <div className="gwssc-grid col-1 gap-row-20">
                <div className="gwssc-grid-1">
                    <WebsiteFrameLoader specOptions={options} onChange={onSpecOptionsChangeHandler} />
                </div>

                <div className="gwssc-grid-1">
                    <WebsiteSpecLoader specOptions={options} onChange={onSpecOptionsChangeHandler} />
                </div>

                {options.specIsLoaded && options.frameIsLoaded ? (
                    <div className="gwssc-grid-1">
                        <SpecOpacityChanger specOptions={options} onChange={onSpecOptionsChangeHandler} />
                    </div>
                ) : null}

                {options.specIsLoaded && options.frameIsLoaded ? (
                    <div className="gwssc-grid-1">
                        <SpecPositionAdjust specOptions={options} onChange={onSpecOptionsChangeHandler} />
                    </div>
                ) : null}

                {options.specIsLoaded && options.frameIsLoaded ? (
                    <div className="gwssc-grid-1">
                        <MediaOptions  specOptions={options} onChange={onSpecOptionsChangeHandler} />
                    </div>
                ) : null}

                <div className="gwssc-grid-1">
                    <SpecCheckerCommunication  specOptions={options} onChange={onSpecOptionsChangeHandler} />
                </div>

                <div className="gwssc-grid-1">
                    <SpecCheckerCredits />
                </div>
            </div>
        </form>
    );
}
