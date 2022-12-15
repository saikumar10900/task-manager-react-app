import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const TodoItem = props => {
  const {task, onDeleteTodo, onChangeStatus} = props
  const {taskName, id, isChecked} = task

  const isTaskChecked = isChecked ? 'checked' : ''

  const onCheckTask = () => {
    onChangeStatus(id)
  }

  const onDelete = () => {
    onDeleteTodo(id)
  }

  return (
    <li className="todo-item-container d-flex flex-row">
      <input
        type="checkbox"
        className="checkbox-input"
        id={id}
        onChange={onCheckTask}
        checked={isChecked}
      />
      <div className="label-container d-flex flex-row">
        <label htmlFor={id} className={`checkbox-label ${isTaskChecked}`}>
          {taskName}
        </label>
        <div className="delete-icon-container">
          <button type="button" onClick={onDelete} className="del-button">
            x
          </button>
        </div>
      </div>
    </li>
  )
}
export default TodoItem
