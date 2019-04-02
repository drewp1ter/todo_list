import React, { useState, useReducer } from 'react'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Header, Snackbar } from 'components'
import { TodoForm, TodosTable } from '..'
import styles from './todosLayout.module.scss'
import TodosContext from '../../todosContext'
import reducer from './reducer'

const TodosLayout = () => {
  const [state, dispatch] = useReducer(reducer, { loading: false, todos: [] })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editTodoIdx, setEditTodoIdx] = useState(-1)

  const toggleDrawer = event => {
    if (drawerOpen && event) {
      Snackbar.open('Данные не сохранены!', () => toggleDrawer(false))
      return
    }
    setEditTodoIdx(-1)
    Snackbar.open('')
    setDrawerOpen(!drawerOpen)
  }

  const handleTodoEdit = todoIdx => () => {
    setEditTodoIdx(todoIdx)
    setDrawerOpen(true)
  }

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <div className={styles.wrapper}>
        {state.loading && (
          <div className={styles.progress}>
            <CircularProgress />
          </div>
        )}
        <Header title="Список задач" />
        <Button onClick={toggleDrawer} color="primary">
          Добавить задачу
        </Button>
        <TodosTable handleTodoEdit={handleTodoEdit} />
        <Drawer className={styles.drawer} open={drawerOpen} onClose={toggleDrawer}>
          <TodoForm toggleDrawer={toggleDrawer} editTodoIdx={editTodoIdx} className={styles.addTodo} />
        </Drawer>
      </div>
    </TodosContext.Provider>
  )
}

export default TodosLayout
