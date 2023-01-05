import NumberInputIncDec from "../../UI/InputGroups/NumberIncDec";

export default function SpecPositionAdjust(props) {
    const { specOptions, onChange } = props;

    let queryURL = new URL(specOptions.currentUrl);

    const onXAxisChangeHandler = (value) => {
        queryURL.searchParams.set("spec-x-adjust", value);
        onChange({specXAxis: value}, queryURL);
    };

    const onYAxisChangeHandler = (value) => {
        queryURL.searchParams.set("spec-y-adjust", value);
        onChange({specYAxis: value}, queryURL);
    };

    return (
        <fieldset className="group">
            <div className="grid gap-col-4">
                <div className="grid-12">
                    <legend className="legend">
                        <label htmlFor="spec-opacity">Spec Axis Adjust</label>
                    </legend>
                </div>

                <div className="grid-24">
                    <div className="grid col-2 gap-col-10 input-wrap input-wrap--radius-bottom input-wrap--radius-top-right">
                        <div className="grid-1">
                            <NumberInputIncDec
                                label="X Axis Adjust"
                                id="spec-x-adjust"
                                value={specOptions.specXAxis}
                                onChange={onXAxisChangeHandler}
                            />
                        </div>

                        <div className="grid-1">
                            <NumberInputIncDec
                                label="Y Axis Adjust"
                                id="spec-y-adjust"
                                value={specOptions.specYAxis}
                                onChange={onYAxisChangeHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    );
}
