import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'

import { Header, Snackbar } from 'components'
import { TodoForm, TodosTable } from '..'
import styles from './todosLayout.module.scss'

const TodosLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [todos, setTodos] = useState([])
  const [currentTodo, setCurrentTodo] = useState(-1)

  const toggleDrawer = event => {
    if (drawerOpen && event) {
      setSnackbarMsg('Данные не сохранены!')
      return
    }
    setCurrentTodo(-1)
    setSnackbarMsg('')
    setDrawerOpen(!drawerOpen)
  }

  const handleTodoEdit = todoIdx => () => {
    setCurrentTodo(todoIdx)
    setDrawerOpen(true)
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
      <Snackbar msg={snackbarMsg} onClickUndo={() => toggleDrawer(false)} />
    </div>
  )
}

export default TodosLayout
