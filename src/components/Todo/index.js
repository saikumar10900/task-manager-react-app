import {Component} from 'react'
import {v4 as uid} from 'uuid'
import TodoItem from '../TodoItem'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

let localData = JSON.parse(localStorage.getItem('todoList'))
let taskCount = JSON.parse(localStorage.getItem('tasksCount'))
if (localData === null) {
  localData = []
}
if (taskCount === null) {
  taskCount = 0
}
class Todo extends Component {
  state = {
    taskName: '',
    todoList: localData,
    searchInput: '',
    showMarked: true,
    tasksCount: taskCount,
  }

  onChangeTaskName = event => {
    this.setState({taskName: event.target.value})
  }

  addTask = () => {
    const {taskName} = this.state
    if (taskName === '') {
      // eslint-disable-next-line no-alert
      alert("Task can't be empty! Please enter your task")
    } else {
      const {todoList} = this.state
      const newTask = {
        id: uid(),
        taskName,
        isChecked: false,
      }
      this.setState(
        {
          todoList: [...todoList, newTask],
          taskName: '',
          tasksCount: todoList.length + 1,
        },
        () => {
          this.onSaveTasksToLocalStorage()
        },
      )
    }
  }

  onChangeStatus = id => {
    this.setState(
      prevState => ({
        todoList: prevState.todoList.map(eachTask => {
          if (id === eachTask.id) {
            return {...eachTask, isChecked: !eachTask.isChecked}
          }
          return eachTask
        }),
      }),
      () => {
        this.onSaveTasksToLocalStorage()
      },
    )
  }

  onDeleteTodo = id => {
    const {todoList} = this.state
    this.setState(
      prevState => ({
        todoList: prevState.todoList.filter(eachTask => eachTask.id !== id),
        tasksCount: prevState.tasksCount - 1,
      }),
      () => {
        this.onSaveTasksToLocalStorage()
      },
    )
    if (todoList.length === 1) {
      this.onClearAllTasks()
    }
  }

  onSaveTasksToLocalStorage = () => {
    const {todoList} = this.state
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClearAllTasks = () => {
    localStorage.removeItem('todoList')
    this.setState({todoList: [], tasksCount: 0})
  }

  showCompletedTasks = () => {
    const {todoList, showMarked} = this.state
    if (showMarked) {
      const markedTasks = todoList.filter(
        eachTask => eachTask.isChecked === true,
      )
      this.setState({
        todoList: markedTasks.length === 0 ? todoList : markedTasks,
        showMarked: false,
      })
    } else {
      const defaultData = JSON.parse(localStorage.getItem('todoList'))
      this.setState({
        todoList: defaultData === null ? [] : defaultData,
        showMarked: true,
      })
    }
  }

  render() {
    const {todoList, taskName, searchInput, tasksCount} = this.state
    const isEmpty = todoList.length === 0
    const searchResults = todoList.filter(eachTodo =>
      eachTodo.taskName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const isSearchResultsEmpty = searchResults.length === 0
    return (
      <div className="todos-bg-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="todos-heading">Task Manager</h1>
              <h1 className="create-task-heading">
                Create <span className="create-task-heading-subpart">Task</span>
              </h1>
              <input
                type="text"
                id="todoUserInput"
                className="todo-user-input"
                placeholder="What needs to be done?"
                onChange={this.onChangeTaskName}
                value={taskName}
              />
              <button className="button" type="button" onClick={this.addTask}>
                Add
              </button>
              {isEmpty ? (
                <p className="no-tasks">No tasks to show</p>
              ) : (
                <div>
                  <div className="my-tasks">
                    <h1 className="todo-items-heading">
                      My{' '}
                      <span className="todo-items-heading-subpart">Tasks</span>
                      <span className="tasks-count">{tasksCount}</span>
                    </h1>
                    <input
                      type="search"
                      onChange={this.onChangeSearchInput}
                      placeholder="Search tasks"
                      className="search-input"
                    />
                    <div className="show-mark">
                      <input
                        type="checkbox"
                        onChange={this.showCompletedTasks}
                        className="mark-checkbox-input"
                        id="showMarked"
                      />
                      <label htmlFor="showMarked" className="label-show">
                        Show completed
                      </label>
                    </div>
                  </div>
                  {isSearchResultsEmpty ? (
                    <p className="no-tasks">No results found.</p>
                  ) : (
                    <div>
                      {searchResults.map(eachTodo => (
                        <TodoItem
                          key={eachTodo.id}
                          task={eachTodo}
                          onChangeStatus={this.onChangeStatus}
                          onDeleteTodo={this.onDeleteTodo}
                          isChecked={eachTodo.isChecked}
                        />
                      ))}
                    </div>
                  )}
                  <button
                    className="button"
                    id="saveTodoButton"
                    type="button"
                    onClick={this.onClearAllTasks}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Todo
