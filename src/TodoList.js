import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore, addTask, updateTask } from './Store'

export const TodoList = (uuid) => {
  const [newTaskText, setNewTaskText] = useState('')
  const { tasks, setTasks, list } = useStore({ uuid })

  return (
    <div className="container">
      <Link to="/">back</Link>
      <h1 className="section">Community Aufgabenliste</h1>
      <div className="section">
        <label>Aufruf-Link zum Bearbeiten und Anzeigen: </label>
        <input type="text" readOnly value={window.location.href} />
      </div>
      <div className={'field-row section'}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setNewTaskText('')
          }}
        >
          <input
            id="newtask"
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button type="submit" onClick={() => (newTaskText ? addTask(newTaskText, list.id) : '')}>
            Aufgabe hinzufügen
          </button>
        </form>
      </div>
      <div className="section">
        {tasks
          ? tasks.map((task) => {
              return (
                <div key={task.id} className={'field-row'}>
                  <input
                    checked={task.complete ? true : ''}
                    onChange={(e) => {
                      tasks.find((t, i) => {
                        if (t.id === task.id) {
                          tasks[i].complete = !task.complete
                          return true
                        } else {
                          return false
                        }
                      })
                      setTasks([...tasks])
                      updateTask(task.id, { complete: e.target.checked })
                    }}
                    type="checkbox"
                    id={`task-${task.id}`}
                  ></input>
                  <label htmlFor={`task-${task.id}`}>
                    {task.complete ? <del>{task.task_text}</del> : task.task_text}
                  </label>
                </div>
              )
            })
          : ''}
      </div>
      <div className="section">
        <small>
          Achtung: Bitte keine sensiblen Informationen hier eintragen, da die Liste öffentlich aufrufbar und einsehbar ist !
        </small>
      </div>
    </div>
  )
}
