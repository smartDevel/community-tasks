import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TodoList } from './TodoList'
import { createList } from './Store'

const newList = async () => {
  try {
    const list = await createList(crypto.randomUUID())
    window.location.assign(`/?uuid=${encodeURIComponent(list.uuid)}`)
  } catch (error) {
    console.error(error)
  }
}

const Home = () => {
  const uuid = new URLSearchParams(window.location.search).get('uuid')

  const imgStartscreen = 'https://ways4eu.files.wordpress.com/2020/06/startscreengifanimationv04.gif'
  const lnkGithub = 'https://github.com/smartDevel/community-tasks'
  const lnkTutorial = 'https://wp.me/p4wJQa-xa'
  const lnkDatabase = 'https://supabase.com'

  if (uuid) return <TodoList uuid={uuid} />

  return (
    <div className="container">
      <div className="section">
        <h1>Kollaborative Aufgabenlisten</h1>
        <small>
          Powered by <a href={lnkDatabase}>Supabase</a>
        </small>
      </div>
      <div className="section">
        <button className="bNew" onClick={newList}>
          Neue Aufgabenliste
        </button>
      </div>
      <div className="section build">
        <h3>
          HowTo:
          <br />
          <a href={lnkTutorial}>Tutorial</a> | <a href={lnkGithub}>Github</a>
        </h3>
        <input type="image" src={imgStartscreen} onClick={newList} alt="Neue Aufgabenliste" />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="App">
      <Home />
    </div>
  </React.StrictMode>
)
