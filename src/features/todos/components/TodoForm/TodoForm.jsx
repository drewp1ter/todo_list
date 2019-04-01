import React, { useState } from 'react'
import classNames from 'classnames'
import T from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

import { Header } from 'components'
import { Todo } from '../../models'
import styles from './todoForm.module.scss'

const TodoForm = ({ todoItem, onSave, className }) => {
  const [todo, setTodo] = useState(todoItem || new Todo())

  const handleChange = ({ target: { name, value } }) => setTodo({ ...todo, [name]: value })

  const handleChangeImportance = value => () => setTodo({ ...todo, importance: todo.importance ^ value })

  const addTodoClass = classNames(styles.wrapper, className)

  const { important, urgent, statuses } = Todo

  console.log(todo.getImportance)

  return (
    <div className={addTodoClass}>
      <Header title="Новая задача" />
      <div className={styles.fields}>
        <TextField required onChange={handleChange} value={todo.title} label="Название" name="title" margin="normal" />
        <TextField
          multiline
          onChange={handleChange}
          value={todo.description}
          label="Описание"
          name="description"
          margin="normal"
        />
        <TextField
          required
          type="date"
          onChange={handleChange}
          value={todo.date}
          label="Дата выполнения"
          name="date"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {todo.date && (
          <div className={styles.checkBoxes}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!(todo.importance & urgent)}
                  onChange={handleChangeImportance(urgent)}
                  color="primary"
                />
              }
              label="Срочная"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!(todo.importance & important)}
                  onChange={handleChangeImportance(important)}
                  color="primary"
                />
              }
              label="Важная"
            />
          </div>
        )}
        <FormControl margin="normal">
          <InputLabel htmlFor="todo-status">Статус</InputLabel>
          <Select
            value={todo.status}
            onChange={handleChange}
            inputProps={{
              name: 'status',
              id: 'todo-status',
            }}
          >
            {Object.entries(statuses).map((status, idx) => (
              <MenuItem key={idx} value={status[0]}>
                {status[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button onClick={() => onSave(todo)} color="primary">
        Добавить задачу
      </Button>
    </div>
  )
}

TodoForm.propTypes = {
  onSave: T.func,
  className: T.string,
}

export default TodoForm
