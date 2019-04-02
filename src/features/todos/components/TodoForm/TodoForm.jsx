import React, { Component } from 'react'
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

import { Header, Autocomplete, Snackbar } from 'components'
import { Todo } from '../../models'
import TodosContext from '../../todosContext'
import styles from './todoForm.module.scss'

class TodoForm extends Component {
  constructor(props, context) {
    super(props)
    const { todos } = context
    const { editTodoIdx } = props
    this.state = {
      todo: editTodoIdx >= 0 ? todos[editTodoIdx] : new Todo(),
    }
  }

  handleChangeImportance = value => () =>
    this.setState(({ todo }) => ({
      todo: new Todo({ ...todo, importance: todo.importance ^ value }),
    }))

  handleChange = prop => {
    const { target } = prop
    if (target) {
      const { name, value } = target
      this.setState(({ todo }) => ({
        todo: new Todo({ ...todo, [name]: value }),
      }))
    } else {
      return value =>
        this.setState(({ todo }) => ({
          todo: new Todo({ ...todo, [prop]: value }),
        }))
    }
  }

  handleSubmit = () => {
    const { todo } = this.state
    const { todos, setTodos } = this.context
    const { editTodoIdx, toggleDrawer } = this.props
    if (!todo.isValid()) {
      Snackbar.open('Заполнитье все необходимые поля!')
      return
    }
    if (editTodoIdx >= 0) {
      todos[editTodoIdx] = todo
      setTodos([...todos])
    } else {
      setTodos([...todos, todo])
    }
    toggleDrawer(false)
    Snackbar.open('')
  }

  render = () => {
    const { toggleDrawer, className } = this.props
    const { todo } = this.state
    const { importance, statuses } = Todo
    const todoFormClass = classNames(styles.wrapper, className)
    return (
      <div className={todoFormClass}>
        <Header title="Новая задача" />
        <div className={styles.fields}>
          <TextField required onChange={this.handleChange} value={todo.title} label="Название" name="title" margin="normal" />
          <TextField
            multiline
            onChange={this.handleChange}
            value={todo.description}
            label="Описание"
            name="description"
            margin="normal"
          />
          <TextField
            type="date"
            onChange={this.handleChange}
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
                    checked={!!(todo.importance & importance[0].value)}
                    onChange={this.handleChangeImportance(importance[0].value)}
                    color="primary"
                  />
                }
                label={importance[0].label}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!(todo.importance & importance[1].value)}
                    onChange={this.handleChangeImportance(importance[1].value)}
                    color="primary"
                  />
                }
                label={importance[1].label}
              />
            </div>
          )}
          <FormControl margin="normal">
            <InputLabel htmlFor="todo-status">Статус</InputLabel>
            <Select
              value={todo.status}
              onChange={this.handleChange}
              inputProps={{
                name: 'status',
                id: 'todo-status',
              }}
            >
              {statuses.map((status, idx) => (
                <MenuItem key={idx} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="normal">
            <Autocomplete onChange={this.handleChange('tag')} suggestions={['Тег0', 'Тег1', 'Тег2', 'Тег3']} placeholder="Тег" />
          </FormControl>
        </div>
        <Button onClick={this.handleSubmit} color="primary">
          Добавить задачу
        </Button>
        <Button onClick={() => toggleDrawer(false)} color="primary">
          Отмена
        </Button>
      </div>
    )
  }
}

TodoForm.contextType = TodosContext

TodoForm.propTypes = {
  todoItem: T.object,
  onSave: T.func,
  onCancel: T.func,
  className: T.string,
}

export default TodoForm
