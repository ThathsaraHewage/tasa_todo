import "../App.css";
import { useState } from "react";
import Base from "../core/base.js";

function AddNewTask() {
   const [title, setTitle] = useState("");
   const [message, setMessage] = useState("");
   const [tasks, setTasks] = useState([])

    const fetchData = () => {
        fetch("http://localhost:8000/task")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setTasks(data)
          })
      }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/task/add", {
        method: "POST",
        body: JSON.stringify({
          title: title,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setTitle("");
        setMessage("Task created successfully");
      } else {
         setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Base navigation="" title="TODO" description="YOUR TASK MANAGER"  >
        <div className="App">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              placeholder="Enter New Task"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Create Task</button>
             <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>

          <div>
          <button onClick={fetchData}>YOUR TODOs</button>
          {tasks.length > 0 && (
            <ul>
              {tasks.map(task => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          )}
        </div>
        </div>
    </Base>
  );
}

export default AddNewTask;
