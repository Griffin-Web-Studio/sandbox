import React from "react";
import CodemirrorInput from "../../UI/CodemirrorInput";

export default function SpecCheckerCommunication(props) {
    return (
        <fieldset className="gwssc-group">
            <div className="gwssc-grid gap-col-4">
                <div className="gwssc-grid-24">
                    <legend className="gwssc-legend" style={{ textAlign: "center" }}>
                        <label>
                            <span>Client &lt; </span>
                            <span className="communication-line-1">=</span>
                            <span className="communication-line-2">=</span>
                            <span className="communication-line-3">=</span>
                            <span className="communication-line-4">=</span>
                            <span className="communication-line-5">=</span>
                            <span> &gt; Host (Communication)</span>
                        </label>
                    </legend>
                </div>

                <div className="gwssc-grid-24">
                    <div className="gwssc-input-wrap gwssc-input-wrap--radius-bottom">
                        <p className="gwssc-client-com-note">For this SpecChecker (host) to automatically correct frame (client) height, you need to add this script anywhere before the end of the body. Do it on each page you want to spec check.</p>

                        <div className="gwssc-input-wrap gwssc-input-wrap--radius-top gwssc-input-wrap--radius-bottom">
                            <CodemirrorInput
                                value={
                                    `<script>\n` +
                                    `  window.addEventListener('message', event => {\n` +
                                    `    if (event.origin.startsWith('http://192.168') || event.origin.startsWith('http://localhost') || event.origin.startsWith('https://external-projects.griffin-studio.co.uk')) {\n` +
                                    `      try {\n` +
                                    `        const hostMessage = JSON.parse(event.data);\n` +
                                    `\n` +
                                    `        if (hostMessage.request === 'get_height') {\n` +
                                    `          var i_height = Math.max(\n` +
                                    `            document.body.scrollHeight,\n` +
                                    `            document.body.offsetHeight,\n` +
                                    `            document.documentElement.clientHeight,\n` +
                                    `            document.documentElement.scrollHeight,\n` +
                                    `            document.documentElement.offsetHeight\n` +
                                    `          );\n` +
                                    `\n` +
                                    `          const myResponse = JSON.stringify({\n` +
                                    `            my_height: i_height,\n` +
                                    `          });\n` +
                                    `\n` +
                                    `          window.parent.postMessage(myResponse, event.origin);\n` +
                                    `        }\n` +
                                    `      } finally { }\n` +
                                    `    }\n` +
                                    `  });\n` +
                                    `</script>`
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    );
}
