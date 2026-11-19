import React, { useState } from 'react'
import { useStore, addTask, updateTask } from './Store'

export const TodoList = ({ uuid }) => {
  const [newTaskText, setNewTaskText] = useState('')
  const { tasks, setTasks, list } = useStore({ uuid })

  return (
    <div className="container">
      <a href="/">Zurück/Neustart</a>
      <h1 className="section">✍🏼🧾✨Community Aufgabenliste✨🔜 ✔️</h1>
      <div className="section">
        <label>Aufruf-Link zum Bearbeiten und Anzeigen: </label>
        <input className="inputField" type="text" readOnly value={window.location.href} />
      </div>
      <div className="field-row section">
        <form
          onSubmit={async (event) => {
            event.preventDefault()
            const taskText = newTaskText.trim()
            if (!taskText || !list) return

            try {
              await addTask(taskText, list.id)
              setNewTaskText('')
            } catch (error) {
              console.error(error)
            }
          }}
        >
          <label>Neue Aufgabe hier eintragen und hinzufügen: </label>
          <input
            id="newtask"
            type="text"
            value={newTaskText}
            onChange={(event) => setNewTaskText(event.target.value)}
          />
          <button type="submit" disabled={!newTaskText.trim() || !list}>
            Aufgabe hinzufügen
          </button>
        </form>
      </div>
      <div className="section">
        {tasks.map((task) => (
          <div key={task.id} className="field-row">
            <input
              checked={Boolean(task.complete)}
              onChange={(event) => {
                const complete = event.target.checked
                setTasks((current) =>
                  current.map((item) => (item.id === task.id ? { ...item, complete } : item))
                )
                updateTask(task.id, { complete }).catch(console.error)
              }}
              type="checkbox"
              id={`task-${task.id}`}
            />
            <label htmlFor={`task-${task.id}`}>
              {task.complete ? <del>{task.task_text}</del> : task.task_text}
            </label>
          </div>
        ))}
      </div>
      <div className="section">
        <small>
          Achtung: Bitte keine sensiblen Informationen hier eintragen, da die Liste öffentlich aufrufbar und einsehbar ist!
        </small>
      </div>
    </div>
  )
}
