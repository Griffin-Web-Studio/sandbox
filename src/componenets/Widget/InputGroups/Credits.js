import CreditAuthor from "../../UI/CreditAuthor";

export default function SpecCheckerCredits(props) {
    return (
        <fieldset className="gwssc-group">
            <div className="gwssc-grid gap-col-4">
                <div className="gwssc-grid-24">
                    <legend className="gwssc-legend" style={{ textAlign: "center" }}>
                        <label>
                            <span>Credits</span>
                        </label>
                    </legend>
                </div>

                <div className="gwssc-grid-24">
                    <div className="gwssc-input-wrap gwssc-input-wrap--radius-bottom">
                        <p>This software uses the following open source projects:</p>

                        <div className="gwssc-input-wrap gwssc-input-wrap--radius-top gwssc-input-wrap--radius-bottom">
                            <table className="gwssc-credits">

                                <thead className="gwssc-credits__header">
                                    <tr>
                                        <th>Project</th>
                                        <th>License</th>
                                        <th>Author</th>
                                    </tr>
                                </thead>

                                <tbody className="gwssc-credits__body">
                                    <CreditAuthor projectName="ReactJS" projectAuthor="Facebook, Inc. and its affiliates" projectLicense="MIT" projectUrl="https://reactjs.org/" />
                                    <CreditAuthor projectName="CodeMirror" projectAuthor="Marijn Haverbeke and others" projectLicense="MIT" projectUrl="https://codemirror.net/" />
                                    <CreditAuthor projectName="React-Codemirror" projectAuthor="[UIW]" projectLicense="MIT" projectUrl="https://uiwjs.github.io/react-codemirror/" />
                                    <CreditAuthor projectName="Fantasticon" projectAuthor="Tancredi Trugenberger" projectLicense="MIT" projectUrl="https://www.npmjs.com/package/fantasticon/" />
                                    <CreditAuthor projectName="Jest" projectAuthor="Facebook, Inc. and its affiliates" projectLicense="MIT" projectUrl="https://jestjs.io/" />
                                    <CreditAuthor projectName="Sass" projectAuthor="Sass Core Team" projectLicense="MIT" projectUrl="https://sass-lang.com/" />
                                    <CreditAuthor projectName="Web Vitals" projectAuthor="Google LLC" projectLicense="MIT" projectUrl="https://web.dev/vitals/" />
                                </tbody>

                            </table>
                        </div>

                        <p>We would like to express our gratitude to the authors and contributors of these projects for their work.</p>
                    </div>
                </div>
            </div>
        </fieldset>
    );
}
