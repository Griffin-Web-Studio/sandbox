import React, { useState } from "react";

export default function WebsiteFrameLoader(props) {
    const { specOptions, onChange } = props;
    const [productionSite, setProductionSite] = useState(specOptions.frameSrc);

    let queryURL = new URL(specOptions.currentUrl);

    const onSpecPrimaryFocusHandler = (e) => {
        e.preventDefault();
        const newMouseEventsOn = specOptions.mouseEventsOn === 'frame' ? 'spec' : 'frame';

        queryURL.searchParams.set("mouse-events-on", newMouseEventsOn);
        onChange({ mouseEventsOn: newMouseEventsOn, frameIsLoaded: true }, queryURL);
    };

    const onFrameChangeHandler = (e) => {
        setProductionSite(e.target.value);
    };

    const onLoadHandler = (e) => {
        e.preventDefault();

        if (productionSite !== "") {
            queryURL.searchParams.set("production-site", productionSite);
            onChange({ frameSrc: productionSite, frameIsLoaded: true }, queryURL);
        }
    };

    const onUnloadHandler = (e) => {
        e.preventDefault();
        queryURL.searchParams.delete("production-site");
        onChange({ frameSrc: "https://griffin-web.studio", frameIsLoaded: false }, queryURL);
    };

    const onReloadHandler = (e) => {
        e.preventDefault();

        if (productionSite !== "") {
            onChange({ frameSrc: "https://files.gwssecureserver.co.uk/files/gws/logo.svg", frameIsLoaded: true }, queryURL);

            setTimeout(() => {
                queryURL.searchParams.set("production-site", productionSite);
                onChange({ frameSrc: productionSite, frameIsLoaded: true }, queryURL);
            }, 1000);
        }
    };

    return (
        <fieldset className="gwssc-group">
            <div className="gwssc-grid gap-col-4">
                <div className="gwssc-grid-12">
                    <legend className="gwssc-legend">
                        <label htmlFor="production-site">Website Frame</label>
                    </legend>
                </div>

                <div className={`gwssc-grid-${specOptions.frameIsLoaded ? "5" : "12"}`}>
                    <button className="gwssc-button gwssc-button--radius-top" onClick={onLoadHandler}>
                        Load
                    </button>
                </div>


                {specOptions.frameIsLoaded ? (
                    <div className={`gwssc-grid-2`}>
                        <button className="gwssc-button__secondary-alt gwssc-button__secondary-alt--radius-top" onClick={onReloadHandler}>
                            <i className="icon-reset-bold"></i>
                        </button>
                    </div>
                ) : (
                    ""
                )}

                {specOptions.frameIsLoaded ? (
                    <div className="gwssc-grid-5">
                        <button className="gwssc-button gwssc-button__secondary--radius-top gwssc-button__secondary" onClick={onUnloadHandler}>
                            Unload
                        </button>
                    </div>
                ) : (
                    ""
                )}

                <div className="gwssc-grid-24">
                    <div className="gwssc-input-wrap gwssc-input-wrap--radius-bottom">
                        <div className="gwssc-grid gap-col-8">
                            <div className={`gwssc-grid-${specOptions.frameIsLoaded ? '21' : '24'}`}>
                                <input type="url" id="production-site" name="production-site" className={`gwssc-input gwssc-input--radius-${specOptions.frameIsLoaded ? 'left' : 'bottom'}`} placeholder="https://path.to-dev-website.tld" value={productionSite} onChange={onFrameChangeHandler} />
                            </div>

                            {specOptions.frameIsLoaded && (
                                <div className="gwssc-grid-3">
                                    <button
                                        className={
                                            `gwssc-button${specOptions.mouseEventsOn === 'frame' ? "" : "__alt"} ` +
                                            `gwssc-button${specOptions.mouseEventsOn === 'frame' ? "" : "__alt"}--radius-right ` +
                                            `gwssc-button${specOptions.mouseEventsOn === 'frame' ? "" : "__alt"}--large-font`
                                        }
                                        onClick={onSpecPrimaryFocusHandler}>
                                        <i className={`icon-focus-${specOptions.mouseEventsOn === 'frame' ? 'top' : 'bottom'}`}></i>
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
