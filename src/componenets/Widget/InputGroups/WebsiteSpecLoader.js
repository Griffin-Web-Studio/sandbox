import React, { useState } from "react";

export default function WebsiteSpecLoader(props) {
    const { specOptions, onChange } = props;
    const [specImg, setSpecImg] = useState(specOptions.specSrc);

    let queryURL = new URL(specOptions.currentUrl);

    const onSpecChangeHandler = (e) => {
        setSpecImg(e.target.value);
    };

    const onSpecPrimaryFocusHandler = (e) => {
        e.preventDefault();
        const newMouseEventsOn = specOptions.mouseEventsOn === 'frame' ? 'spec' : 'frame';

        queryURL.searchParams.set("mouse-events-on", newMouseEventsOn);
        onChange({ mouseEventsOn: newMouseEventsOn, frameIsLoaded: true }, queryURL);
    };

    const onLoadHandler = (e) => {
        e.preventDefault();

        if (specImg !== "") {
            queryURL.searchParams.set("spec-img", specImg);
            onChange({ specSrc: specImg, specIsLoaded: true }, queryURL);
        }
    };

    const onUnloadHandler = (e) => {
        e.preventDefault();
        queryURL.searchParams.delete("spec-img");
        onChange({ specSrc: "", specIsLoaded: false }, queryURL);
    };

    const onReloadHandler = (e) => {
        e.preventDefault();

        if (specImg !== "") {
            onChange({ specSrc: "https://files.gwssecureserver.co.uk/files/gws/logo.svg", specIsLoaded: true }, queryURL);

            setTimeout(() => {
                queryURL.searchParams.set("spec-img", specImg);
                onChange({ specSrc: specImg, specIsLoaded: true }, queryURL);
            }, 1000);
        }
    };

    return (
        <fieldset className="group">
            <div className="grid gap-col-4">
                <div className="grid-12">
                    <legend className="legend">
                        <label htmlFor="spec-img">Spec Image URL</label>
                    </legend>
                </div>

                <div className={`grid-${specOptions.specIsLoaded ? "5" : "12"}`}>
                    <button className="button button--radius-top" onClick={onLoadHandler}>
                        Load
                    </button>
                </div>

                {specOptions.specIsLoaded ? (
                    <div className={`grid-2`}>
                        <button className="button__secondary-alt button__secondary-alt--radius-top" onClick={onReloadHandler}>
                            <i className="icon-reset-bold"></i>
                        </button>
                    </div>
                ) : (
                    ""
                )}

                {specOptions.specIsLoaded ? (
                    <div className="grid-5">
                        <button className="button button__secondary--radius-top button__secondary" onClick={onUnloadHandler}>
                            Unload
                        </button>
                    </div>
                ) : (
                    ""
                )}

                <div className="grid-24">
                    <div className="input-wrap input-wrap--radius-bottom">
                        <div className="grid gap-col-8">
                            <div className={`grid-${specOptions.specIsLoaded ? '21' : '24'}`}>
                                <input type="url" id="spec-img" name="spec-img" className={`input input--radius-${specOptions.specIsLoaded ? 'left' : 'bottom'}`} placeholder="https://path.to.spec/image.png" value={specImg} onChange={onSpecChangeHandler} />
                            </div>

                            {specOptions.specIsLoaded && (
                                <div className="grid-3">
                                    <button
                                        className={
                                            `button${specOptions.mouseEventsOn === 'spec' ? "" : "__alt"} ` +
                                            `button${specOptions.mouseEventsOn === 'spec' ? "" : "__alt"}--radius-right ` +
                                            `button${specOptions.mouseEventsOn === 'spec' ? "" : "__alt"}--large-font`
                                        }
                                        onClick={onSpecPrimaryFocusHandler}>
                                        <i className={`icon-focus-${specOptions.mouseEventsOn === 'spec' ? 'top' : 'bottom'}`}></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    );
}
