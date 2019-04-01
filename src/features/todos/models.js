export class Todo {
  static importance = [
    { value: 0b01, title: 'Важная' },
    { value: 0b10, title: 'Срочная' }
  ]
  static important = 0b01
  static urgent = 0b10
  static statuses = {
    pending: 'Выполняется',
    later: 'На потом',
    done: 'Выполнена',
  }

  set importance(importance) {
    this._importance = importance
  }

  get getImportance() {
    let result = []
    Todo.importance.forEach(item => {
      if (this._importance & item.value) result.push(item.title)
    })
    console.log(this._importance)
    return this._importance
  }

  constructor(props = {}) {
    this.id = `f${(~~(Math.random()*1e8)).toString(16)}`
    this.title = props.title || ''
    this.description = props.description || ''
    this.date = props.date || ''
    this._importance = props.importance || 0
    this.status = props.status || ''
    this.tag = props.tag || ''
  }
}
