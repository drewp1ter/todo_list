import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'

import { Header, Snackbar } from 'components'
import { TodoForm, TodosTable } from '..'
import styles from './todosLayout.module.scss'
import TodosContext from '../../todosContext'

const TodosLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [todos, setTodos] = useState([])
  const [editTodoIdx, setEditTodoIdx] = useState(-1)

  const toggleDrawer = event => {
    if (drawerOpen && event) {
      setSnackbarMsg('Данные не сохранены!')
      return
    }
    setEditTodoIdx(-1)
    setSnackbarMsg('')
    setDrawerOpen(!drawerOpen)
  }

  const handleTodoEdit = todoIdx => () => {
    setEditTodoIdx(todoIdx)
    setDrawerOpen(true)
  }

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <div className={styles.wrapper}>
        <Header title="Список задач" />
        <Button onClick={toggleDrawer} color="primary">
          Добавить задачу
        </Button>
        <TodosTable onTodoEdit={handleTodoEdit} todos={todos} />
        <Drawer className={styles.drawer} open={drawerOpen} onClose={toggleDrawer}>
          <TodoForm toggleDrawer={toggleDrawer} editTodoIdx={editTodoIdx} className={styles.addTodo} />
        </Drawer>
        <Snackbar msg={snackbarMsg} onClickUndo={() => toggleDrawer(false)} />
      </div>
    </TodosContext.Provider>
  )
}

export default TodosLayout
