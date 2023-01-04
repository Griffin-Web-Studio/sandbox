export default function CreditAuthor(props) {
    const { projectUrl, projectName, projectLicense, projectAuthor } = props;

    return (
        <tr className="gwssc-credit">
            <td className="gwssc-credit__project-name">
                <a href={projectUrl} className="gwssc-credit__author" target="_blank" rel="noopener noreferrer">
                    {projectName}
                </a>
            </td>
            <td className="gwssc-credit__author-license">{projectLicense}</td>
            <td className="gwssc-credit__author-name">{projectAuthor}</td>
        </tr>
    );
}