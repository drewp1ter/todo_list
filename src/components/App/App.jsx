import React from 'react'

import todos from 'features/todos'

const App = () => {
  const { TodosLayout } = todos.components
  return <TodosLayout />
}

export default App
