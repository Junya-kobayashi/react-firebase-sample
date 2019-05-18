import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_ERROR, TOGGLE_TODO_REQUEST, TOGGLE_TODO_SUCCESS, TOGGLE_TODO_ERROR } from '/';

const addTodoRequest = () => ({
  type: ADD_TODO_REQUEST
})

const addTodoSuccess = () => ({
  type: ADD_TODO_SUCCESS
})
const addTodoERROR = err => ({
  type: ADD_TODO_ERROR
})
const toggleTodoRequest = (text, completed) => ({
  type: TOGGLE_TODO_REQUEST,
  text,
  completed
})
const toggleTodoSuccess = (text, completed) => ({
  type: TOGGLE_TODO_SUCCESS,
  text,
  completed
})
const toggleTodoERROR = (text, completed, err) => ({
  type: TOGGLE_TODO_ERROR,
  text,
  completed,
  err
})

export const addTodo = text => {
  return (dispatch, getState, {getFirebase}) => {
    dispatch(addTodoRequest());
    const firebase = getFirebase();
    firebase.push('todos', { completed: false, text })
      .then(() => {
        dispatch(addTdodoSuccess());
      }).catch(err => {
        dispatch(addTodoError(err));
      });
  }
}

export const toggleTodo = id => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const state = getState();
    const todo = state.firebase.data.todos[id];
    dispatch(toggleTodoRequest(todo.text, !todo.completed));
    firebase.update(`todos/${id}`, { completed: !todo.completed })
      .then(() => {
        dispatch(toggleTodoSuccess(todo.text, !todo.completed));
      }).catch(err => {
        dispatch(toggleTodoError(todo.text, !todo.completed, err));
      });
  }
}