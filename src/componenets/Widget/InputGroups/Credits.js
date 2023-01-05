import CreditAuthor from "../../UI/CreditAuthor";

export default function SpecCheckerCredits(props) {
    return (
        <fieldset className="group">
            <div className="grid gap-col-4">
                <div className="grid-24">
                    <legend className="legend" style={{ textAlign: "center" }}>
                        <label>
                            <span>Credits</span>
                        </label>
                    </legend>
                </div>

                <div className="grid-24">
                    <div className="input-wrap input-wrap--radius-bottom">
                        <p>This software uses the following open source projects:</p>

                        <div className="input-wrap input-wrap--radius-top input-wrap--radius-bottom">
                            <table className="credits">

                                <thead className="credits__header">
                                    <tr>
                                        <th>Project</th>
                                        <th>License</th>
                                        <th>Author</th>
                                    </tr>
                                </thead>

                                <tbody className="credits__body">
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
