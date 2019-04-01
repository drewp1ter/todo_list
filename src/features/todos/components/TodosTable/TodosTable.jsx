import React from 'react'
import T from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
//import IconButton from '@material-ui/core/IconButton'
//import DeleteIcon from '@material-ui/icons/Delete'

import styles from './todosTable.module.scss'

const TodosTable = ({ todos }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell className={styles.header}>id задачи</TableCell>
        <TableCell className={styles.header}>Статус</TableCell>
        <TableCell className={styles.header}>Название задачи</TableCell>
        <TableCell className={styles.header}>Описание задачи</TableCell>
        <TableCell className={styles.header}>Дата выполнения</TableCell>
        <TableCell className={styles.header}>Важность</TableCell>
        <TableCell className={styles.header}>Тег</TableCell>
        <TableCell className={styles.header}>Действие</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        todos && todos.map((todo, idx) =>
          <TableRow key={idx}>
            <TableCell>{todo.id}</TableCell>
            <TableCell>{todo.statusText()}</TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>{todo.date}</TableCell>
            <TableCell>{todo.importanceToString()}</TableCell>
            <TableCell>{todo.tag}</TableCell>
          </TableRow>
        )
      }
    </TableBody>
  </Table>
)

TodosTable.propTypes = {
  todos: T.array,
}

export default TodosTable
