import {ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_ERROR, TOGGLE_TODO_REQUEST, TOGGLE_TODO_SUCCESS, TOGGLE_TODO_ERROR} from '../actions/'

const getStringForComleted = (completed) => (
  completed ? '完了' : '未完了'
)


const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO_REQUEST:
      return { ...state, notice: 'データを送信中' }
    case ADD_TODO_SUCCESS:
      return { ...state, notice: '送信完了できました' }
    case ADD_TODO_ERROR:
      return { ...state, notice: 'エラーが発生しました' }
    case TOGGLE_TODO_REQUEST:
      return {
        ...state, notice:
          '"' + action.text + '"のステータスを"'
          + getStringForComleted(action.completed)
          + '"に変更中'
      }
    case TOGGLE_TODO_SUCCESS:
      return {
        ...state, notice:
          '"' + action.text + '"のステータスを'
          + getStringForComleted(action.completed)
          + '"に変更しました'
      }
    case TOGGLE_TODO_ERROR:
      return {
        ...state, notice:
          '"' + action.text + 'の更新中にエラーが発生しました。'
      }
    default:
      return state
  }
  //   case 'ADD_TODO':
  //     return [
  //       ...state,
  //       {
  //         id: action.id,
  //         text: action.text,
  //         completed: false
  //       }
  //     ]
  //   case 'TOGGLE_TODO':
  //     return state.map(todo =>
  //       todo.id === action.id ? {
  //         ...todo,
  //         completed: !todo.completed
  //       } : todo
  //     )
  //   default:
  //     return state
  // }
}

export default todos