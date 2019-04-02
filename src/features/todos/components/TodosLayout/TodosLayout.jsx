import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { Header } from 'components'
import { TodoForm, TodosTable } from '..'
import styles from './todosLayout.module.scss'

const TodosLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [todos, setTodos] = useState([])
  const [currentTodo, setCurrentTodo] = useState(-1)

  const toggleDrawer = event => {
    if (drawerOpen && event) {
      setSnackbarOpen(true)
      return
    }
    setCurrentTodo(-1)
    setSnackbarOpen(false)
    setDrawerOpen(!drawerOpen)
  }

  const handleTodoEdit = todoIdx => () => {
    setCurrentTodo(todoIdx)
    setDrawerOpen(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackbarOpen(false)
  }

  const handleSaveTodo = todo => {
    if (currentTodo >= 0) {
      todos[currentTodo] = todo
      setTodos([...todos])
    } else {
      setTodos([...todos, todo])
    }
    toggleDrawer(false)
  }

  return (
    <div className={styles.wrapper}>
      <Header title="Список задач" />
      <Button onClick={toggleDrawer} color="primary">
        Добавить задачу
      </Button>
      <TodosTable onTodoEdit={handleTodoEdit} todos={todos} />
      <Drawer className={styles.drawer} open={drawerOpen} onClose={toggleDrawer}>
        <TodoForm todoItem={todos[currentTodo]} className={styles.addTodo} onSave={handleSaveTodo} onCancel={() => toggleDrawer(false)} />
      </Drawer>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Note archived</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={() => toggleDrawer(false)}>
            UNDO
          </Button>,
          <IconButton key="close" aria-label="Close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  )
}

export default TodosLayout
