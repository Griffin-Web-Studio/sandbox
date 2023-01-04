import React from "react";
import { ReactComponent as GWSLogo } from "../../../images/gws-logo.svg";
import { ReactComponent as Logo } from "../../../images/logo.svg";

export default function WidgetHeader(props) {
    return (
        <div>
            <div className="gwssc-grid">
                <div className="gwssc__logo-container">
                    <a href="https://griffin-web.studio" target="_blank" rel="noreferrer" title="Griffin Web Studio Garage">
                        <div className="gwssc-grid col-4 gap-col-10 align-center">
                            <div className="gwssc-grid-1">
                                <Logo />
                            </div>
                            <div className="gwssc-grid-3">
                                <GWSLogo />
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <span className="gwssc__copyright">
                &copy; 2021 - {new Date().getFullYear()} Griffin Web Studio Limited, All Rights Reserved, for commercial license please reach out to{" "}
                <a href="mailto:rihards.s@griffin-web.studio" target="_blank" rel="noreferrer" title="rihards.s@griffin-web.studio">
                    rihards.s@griffin-web.studio
                </a>
            </span>
        </div>
    );
}
