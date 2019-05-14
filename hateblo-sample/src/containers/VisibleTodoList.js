import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

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