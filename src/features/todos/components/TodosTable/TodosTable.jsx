import React, { Component } from 'react'
import T from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import TodoContext from '../../todosContext'
import styles from './todosTable.module.scss'
import { Todo } from '../../models'

const ITEM_HEIGHT = 48

class TodosTable extends Component {
  state = {
    anchorEl: null,
  }

  handleStatusClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleStatusChange = e => {
    const { todos, setTodos } = this.context
    const { value, idx } = e.currentTarget.dataset
    todos[idx].status = value
    setTodos([...todos])
    this.setState({ anchorEl: null })
  }

  handleDeleteTodo = idx => () => {
    const { todos, setTodos } = this.context
    if (!window.confirm('Вы уверены?')) return
    todos.splice(idx, 1)
    setTodos([...todos])
  }

  render = () => {
    const { handleTodoEdit } = this.props
    const { todos } = this.context
    const { anchorEl } = this.state
    const { statuses } = Todo
    const open = Boolean(anchorEl)
    return (
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
          {todos &&
            todos.map((todo, idx) => (
              <TableRow key={idx} className={styles.row}>
                <TableCell>{todo.id}</TableCell>
                <TableCell className={styles.status}>
                  {todo.statusText()}
                  <div>
                    <IconButton
                      aria-label="More"
                      aria-owns={open ? 'long-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleStatusClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={this.handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: 200,
                        },
                      }}
                    >
                      {statuses.map(option => (
                        <MenuItem
                          key={option.value}
                          data-value={option.value}
                          data-idx={idx}
                          selected={option.value === todo.status}
                          onClick={this.handleStatusChange}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>{todo.date}</TableCell>
                <TableCell>{todo.importanceToString()}</TableCell>
                <TableCell>{todo.tag}</TableCell>
                <TableCell className={styles.actions}>
                  <IconButton onClick={handleTodoEdit(idx)} aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={this.handleDeleteTodo(idx)} aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    )
  }
}

TodosTable.propTypes = {
  onTodoEdit: T.func,
}

TodosTable.contextType = TodoContext

export default TodosTable
