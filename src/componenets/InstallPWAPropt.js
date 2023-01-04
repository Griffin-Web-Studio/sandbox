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
        <div className="gwssc-install-pwa-prompt">
            <div className="gwssc-install-pwa-prompt__container-outer">
                <div className="gwssc-install-pwa-prompt__logo-container">
                    <Logo className="gwssc-install-pwa-prompt__logo" />
                </div>

                <div className="gwssc-install-pwa-prompt__container-inner">
                    <h2 className="gwssc-h3 gwssc-aligncenter">Install this website as a PWA</h2>
                    <p>Please note that this app does not require you to download a setup file.</p>

                    <div className="gwssc-install-pwa-prompt__content">
                        {iosInstallPrompt && (
                        <>
                            <div className="gwssc-aligncenter">
                                <p>
                                    Tap <span className="icon-apple-share"></span> then &quot;Add to Home Screen&quot;
                                </p>
                            </div>
                            <button className="gwssc-button__secondary gwssc-button__secondary--radius gwssc-button__secondary--large-font gwssc-button__secondary--width-auto gwssc-aligncenter" onClick={handleIOSInstallDeclined}>
                                Close
                            </button>
                        </>
                        )}
                        {webInstallPrompt && (
                            <>
                                <div className="gwssc-aligncenter">
                                    <p>
                                        This PWA app is available for installation on your device.
                                    </p>
                                </div>
                                <div className="gwssc-grid gap-col-10">
                                    <div className="gwssc-grid-12">
                                        <button className="gwssc-button gwssc-button--radius" onClick={handleWebInstallAccepted}>
                                            Install
                                        </button>
                                    </div>
                                    <div className="gwssc-grid-12">
                                        <button className="gwssc-button__secondary gwssc-button__secondary--radius" onClick={handleWebInstallDeclined}>Close</button>
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
