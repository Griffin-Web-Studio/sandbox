import React, { useState } from "react";

export default function WebsiteFrame(props) {
    const { options, updateIframeHeight } = props;
    const websiteFrameSrc = options.frameSrc !== "" ? options.frameSrc : "https://griffin-web.studio";
    const [iframeHeight, setIframeHeight] = useState("50vh");

    const onIframeLoad = (e) => {
        const iframe = e.target;

        if (iframe.src !== window.location.href) {
            setIframeHeight("50vh");
            updateIframeHeight("50vh");

            iframe.contentWindow.postMessage(
                JSON.stringify({
                    request: "get_height"
                }),
                websiteFrameSrc
            );

            window.addEventListener("message", function (e) {
                if (websiteFrameSrc.startsWith(e.origin)) {
                    var data = e.data;

                    var clientResponse = JSON.parse(data),
                        clientHeight = clientResponse.my_height;

                    setIframeHeight(clientHeight + clientHeight / 5 + "px");
                    updateIframeHeight(clientHeight + clientHeight / 5 + "px");
                }
            });
        }
    };

    return (
        <div
            className="gwssc__website-iframe-container"
            style={{
                transform: `scale(${options.mediaZoom / 100})`
            }}>
            <iframe
                src={websiteFrameSrc !== "" ? websiteFrameSrc : "https://griffin-web.studio"}
                className="gwssc__website-iframe"
                title="Website Frame"
                onLoad={onIframeLoad}
                style={{
                    transform: `translateX(-50%)`,
                    height: `${iframeHeight}`,
                    width: `${options.mediaWidth}px`,
                    pointerEvents: options.mouseEventsOn === "frame" ? "all" : "none"
                }}
            />
        </div>
    );
}

WebsiteFrame.defaultProps = {
    websiteFrameSrc: "https://griffin-web.studio"
};
