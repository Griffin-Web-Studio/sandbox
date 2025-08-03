export default function CreditAuthor(props) {
    const { projectUrl, projectName, projectLicense, projectAuthor } = props;

    return (
        <tr className="credit">
            <td className="credit__project-name">
                <a href={projectUrl} className="credit__author" target="_blank" rel="noopener noreferrer">
                    {projectName}
                </a>
            </td>
            <td className="credit__author-license">{projectLicense}</td>
            <td className="credit__author-name">{projectAuthor}</td>
        </tr>
    );
}