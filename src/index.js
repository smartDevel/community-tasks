import React from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { render } from "react-dom";
import { TodoList } from "./TodoList";
import * as serviceWorker from "./serviceWorker";
import { v4 as uuidv4 } from "uuid";
import { createList } from "./Store";
import queryString from "query-string";

const newList = async (history) => {
  const list = await createList(uuidv4());
  history.push(`/?uuid=${list.uuid}`);
};

const Home = (props) => {
  const history = useHistory();
  const uuid = queryString.parse(props.location.search).uuid;

  //GIF-Animation auf wordpress für Startscreen-Bild
  const imgStartscreen = "https://ways4eu.files.wordpress.com/2020/06/startscreengifanimationv04.gif";
  const lnkGithub = "https://github.com/smartDevel/community-tasks";
  const lnkTutorial =
    "https://wp.me/p4wJQa-xa";
  const lnkDatabase = "https://supabase.io";

  if (uuid) return TodoList(uuid);
  else {
    return (
      <div className="container">
        <div className="section">
          <h1>Kollaborative Aufgabenlisten</h1>
          <small>
            Powered by <a href={lnkDatabase}>Supabase</a>
          </small>
        </div>
        <div className="section">
          <button
            className="bNew"
            onClick={() => {
              newList(history);
            }}
          >
            Neue Aufgabenliste
          </button>
        </div>
        <div className="section build">
          <h3>
            HowTo:
            <br />
            <a href={lnkTutorial}>Tutorial</a> | <a href={lnkGithub}>Github</a>
          </h3>
          {/* *** Alternative mit input-Feld *** */}
          <input
            type="image"
            src={imgStartscreen}
            onClick={() => {
              newList(history);
            }}
            alt="Neue Aufgabenliste"
          />

          {/* *** Alternative mit Button ***
          <button 
           onClick={() => {
            newList(history)
          }}>
            <img
              className="build-img"
              src={imgStartscreen}
              alt="learn how to build this"
            />
          </button>
          */}

          {/* *** Alternative mit Hyperlink ***
          <a onClick={() => {
              newList(history)
            }}>
            <img
              className="build-img"
              src={imgStartscreen}
              alt="learn how to build this"
            />
          </a> */}
        </div>
      </div>
    );
  }
};

render(
  <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  </div>,
  document.body
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
