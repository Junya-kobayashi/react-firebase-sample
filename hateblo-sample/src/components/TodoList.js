import React from 'react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, toggleTodo }) => {
  if (!isLoaded(todos)) {
    return <div>タスク一覧読み込み中...</div>
  }
  if (isEmpty(todos)) {
    return <div>タスクがありません</div>
  }

  return (
    <ul>
      {Object.keys(todos).map((key) => (
        <Todo key={key} {...todos[key]} onClick={() => toggleTodo(key)} />
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.objectOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList