import React from "react";

export default function SpecImage(props) {
    const { options } = props;

    if (options.specSrc !== "" && options.specIsLoaded) {
        return (
            <div
                className={`gwssc__image-container ${ options.invertSpec ? 'gwssc__image-container--invert' : '' }`}
                style={{
                    transform: `scale(${options.mediaZoom / 100})`
                }}>
                <img
                    src={options.specSrc}
                    className="gwssc__image"
                    alt="Spec Overlay"
                    style={{
                        opacity: options.specOpacity,
                        transform: `translate(calc(-50% + ${options.specXAxis}px), ${options.specYAxis}px)`,
                        width: `${options.mediaWidth}px`,
                        pointerEvents: options.mouseEventsOn === 'spec' ? 'all' : 'none'
                    }}
                />
            </div>
        );
    } else {
        return null;
    }
}
