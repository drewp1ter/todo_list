import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'

import { Header } from 'components'
import { TodoForm, TodosTable } from '..'
import styles from './todosLayout.module.scss'

const TodosLayout = () => {
  const [drawerIsOpen, setDrawerState] = useState(false)

  const [todos, setTodos] = useState([])

  const toggleDrawer = () => setDrawerState(!drawerIsOpen)

  const addTodo = todo => setTodos([...todos, todo])

  return (
    <div className={styles.wrapper}>
      <Header title="Список задач" />
      <Button onClick={toggleDrawer} color="primary">
        Добавить задачу
      </Button>
      <TodosTable todos={todos} />
      <Drawer className={styles.drawer} open={drawerIsOpen} onClose={toggleDrawer}>
        <TodoForm className={styles.addTodo} onSave={addTodo} />
      </Drawer>
    </div>
  )
}

export default TodosLayout
