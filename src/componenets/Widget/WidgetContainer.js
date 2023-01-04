import React, { useState } from "react";
import WidgetHeader from "./Header/WidgetHeader";
import FormWrapper from "./FormWrapper";

export default function WidgetContainer(props) {
    const { onOptionUpdate, specOptions } = props;
    const [toggleState, setToggleState] = useState(true);

    const onContainerToggleHandler = () => {
        setToggleState(!toggleState);
    };

    const onFormChangeHandler = (newOptions) => {
        onOptionUpdate(newOptions);
    };

    return (
        <div className={`gwssc__container ${toggleState ? "" : "hide"}`}>
            <div className="gwssc__container-outer">
                <button type="button" className="gwssc__toggle" onClick={onContainerToggleHandler}>
                    <span className="gwssc__toggle-label">
                        Spec-Checker Options <span className={`gwssc__toggle-ico ${toggleState ? "" : "gwssc__toggle-ico--hide"}`}>⬆️</span>
                    </span>
                </button>

                <div className="gwssc__container-inner">
                    <div className="gwssc-grid col-1 gap-row-40">
                        <WidgetHeader />

                        <FormWrapper onFormChange={onFormChangeHandler} specOptions={specOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
