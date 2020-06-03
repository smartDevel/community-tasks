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
  const imgStartscreen = "https://ways4eu.files.wordpress.com/2020/06/startscreengifanimationv02.gif";
  //JPG- Bild auf wordpress für startscreen
  //  "https://ways4eu.files.wordpress.com/2020/06/communitytaskliststart.jpg";
  //    "https://res.cloudinary.com/practicaldev/image/fetch/s--0Q5C-mHV--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--vlXt7rid--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/cjjivuwyazvady0ddhyi.png";
  const lnkGithub = "https://github.com/smartDevel/community-tasks";
  const lnkTutorial =
    "https://dev.to/awalias/howto-build-collaborative-realtime-task-lists-in-react-4k52";
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
