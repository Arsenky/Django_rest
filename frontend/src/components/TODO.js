import React from 'react'

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
            {todo.project_name}
            </td>
            <td>
            {todo.create_date}
            </td>
            <td>
            {todo.updated_date}
            </td>
            <td>
            {todo.creator}
            </td>
            <td>
            {todo.is_active ? 'Active' : 'No active'}
            </td>
            <td>
            {todo.text}
            </td>
        </tr>
    )
}

const TodoList = ({todoes}) => {
    return (
        <table>
            <th>
            Project
            </th>
            <th>
            Created at
            </th>
            <th>
            Last update
            </th>
            <th>
            Creator
            </th>
            <th>
            Status
            </th>
            <th>
            Text
            </th>
            {todoes.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default TodoList