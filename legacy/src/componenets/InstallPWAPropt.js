import React from "react";
import useIosInstallPrompt from "../app/shared/hooks/useIosInstallPrompt";
import useWebInstallPrompt from "../app/shared/hooks/useWebInstallPrompt";
import { ReactComponent as Logo } from "../images/logo.svg";

export const InstallPWAPrompt = (props) => {
    const [iosInstallPrompt, handleIOSInstallDeclined] = useIosInstallPrompt();
    const [webInstallPrompt, handleWebInstallDeclined, handleWebInstallAccepted] = useWebInstallPrompt();

    if (!iosInstallPrompt && !webInstallPrompt) {
        return null;
    }
    return (
        <div className="install-pwa-prompt">
            <div className="install-pwa-prompt__container-outer">
                <div className="install-pwa-prompt__logo-container">
                    <Logo className="install-pwa-prompt__logo" />
                </div>

                <div className="install-pwa-prompt__container-inner">
                    <h2 className="h3 aligncenter">Install this website as a PWA</h2>
                    <p>Please note that this app does not require you to download a setup file.</p>

                    <div className="install-pwa-prompt__content">
                        {iosInstallPrompt && (
                        <>
                            <div className="aligncenter">
                                <p>
                                    Tap <span className="icon-apple-share"></span> then &quot;Add to Home Screen&quot;
                                </p>
                            </div>
                            <button className="button__secondary button__secondary--radius button__secondary--large-font button__secondary--width-auto aligncenter" onClick={handleIOSInstallDeclined}>
                                Close
                            </button>
                        </>
                        )}
                        {webInstallPrompt && (
                            <>
                                <div className="aligncenter">
                                    <p>
                                        This PWA app is available for installation on your device.
                                    </p>
                                </div>
                                <div className="grid gap-col-10">
                                    <div className="grid-12">
                                        <button className="button button--radius" onClick={handleWebInstallAccepted}>
                                            Install
                                        </button>
                                    </div>
                                    <div className="grid-12">
                                        <button className="button__secondary button__secondary--radius" onClick={handleWebInstallDeclined}>Close</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
