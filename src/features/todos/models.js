export class Todo {
  constructor(props = {}) {
    this.id = props.id || `f${(~~(Math.random() * 1e8)).toString(16)}`
    this.title = props.title || ''
    this.description = props.description || ''
    this.date = props.date || ''
    this.importance = props.importance || 0
    this.status = props.status || ''
    this.tag = props.tag || ''
  }

  static importance = [{ value: 0b01, label: 'Важная' }, { value: 0b10, label: 'Срочная' }]

  static statuses = [
    { value: 'pending', label: 'Выполняется' },
    { value: 'later', label: 'На потом'},
    { value: 'done', label: 'Выполнена'},
  ]

  statusText = () => this.status && Todo.statuses.find(status => status.value === this.status).label

  importanceToString = () => {
    let result = []
    Todo.importance.forEach(item => this.importance & item.value && result.push(item.label))
    return result.join(', ')
  }

  isValid = () => this.title !== ''

  serialize = () => {
    //to backend
  }
}
