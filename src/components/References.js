import React, { useContext, useState } from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import EditionContext from './EditionContext'

export const useInputValue = (initialValue = '') => {
  const [inputValue, setInputValue] = useState(initialValue)

  return {
    inputValue,
    changeInput: (event) => setInputValue(event.target.value),
    clearInput: () => setInputValue(''),
  }
}

const References = () => {
  const { handleNameReferenceList } = useContext(EditionContext)
  const { inputValue, changeInput, clearInput } = useInputValue()

  const clearInputAndAddTodo = () => {
    handleNameReferenceList(inputValue)
    clearInput()
  }

  return (
    <div>
      <AddTodo
        inputValueName={inputValue}
        onInputChangeName={changeInput}
        onButtonClick={clearInputAndAddTodo}
      />
      <TodoList />
    </div>
  )
}

export default References
