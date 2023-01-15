import React from 'react'

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
            {project.project_name}
            </td>
            <td>
            {project.git_link}
            </td>
            <td>
            {project.users_list}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
            Name
            </th>
            <th>
            Git
            </th>
            <th>
            Users list
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList