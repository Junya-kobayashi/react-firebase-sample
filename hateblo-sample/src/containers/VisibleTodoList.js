import { compose } from 'redux'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'

import { firebaseConnect } from 'react-redux-firebase'

const getVisibleTodos = (todos, filter) => {
  if (!todos) return todos
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return Object.keys(todos)
        .filter(key => todos[key].completed)
        .reduce((filtered, key) => {
          filtered[key] = todos[key];
          return filtered;
        },
          {}
        )
    case 'SHOW_ACTIVE':
      return Object.keys(todos)
        .filter(key => !todos[key].completed)
        .reduce((filtered, key) => {
          filtered[key] = todos[key]
          return filtered;
        },
          {}
        )
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case VisibilityFilters.SHOW_ALL:
//       return todos
//     case VisibilityFilters.SHOW_COMPLETED:
//       return todos.filter(t => t.completed)
//     case VisibilityFilters.SHOW_ACTIVE:
//       return todos.filter(t => !t.completed)
//     default:
//       throw new Error('Unknown filter: ' + filter)
//   }
// }

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.firebase.data.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

const firebaseQueries = ['todos'];

const VisibleTodoList = compose(
  firebaseConnect(firebaseQueries),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TodoList)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)