import "../App.css";
import Base from "../core/base.js";
import React, { useRef, useState } from "react";
import PopupUpdate from "./update_popup";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AddNewTask() {
       const [title, setTitle] = useState("");
       const [message, setMessage] = useState("");
       const [tasks, setTasks] = useState([])

          const baseURL = "http://localhost:8000/task";
          const delete_id = useRef(null);
          const [deleteResult, setDeleteResult] = useState(null);
          const put_title = useRef(null);
          const [putResult, setPutResult] = useState(null);

          const fortmatResponse = (res) => {
            return JSON.stringify(res, null, 2);
          }

        //display all tasks
        const fetchData = () => {
            fetch(`${baseURL}`)
              .then(response => {
                return response.json()
              })
              .then(data => {
                setTasks(data)
              })
          }

       //delete task
        async function deleteDataById(id) {
            if (id){
              try {
                const res = await fetch(`${baseURL}/list/${id}`, { method: "delete" });
                const data = await res.json();
                const result = {
                  status: res.status + "-" + res.statusText,
                  headers: { "Content-Type": res.headers.get("Content-Type") },
                  data: data,
                };
                setDeleteResult(fortmatResponse(result));
              } catch (err) {
                setDeleteResult(err.message);
              }
            }
          }


    //update a task
      async function putData(id) {
        if (id) {
          const putData = {
            title: put_title.current.value,
          };
          try {
            const res = await fetch(`${baseURL}/list/${id}`, {
              method: "patch",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
              },
              body: JSON.stringify(putData),
            });
            if (!res.ok) {
              const message = `An error has occured: ${res.status} - ${res.statusText}`;
              throw new Error(message);
            }
            const data = await res.json();
            const result = {
              status: res.status + "-" + res.statusText,
              headers: { "Content-Type": res.headers.get("Content-Type") },
              data: data,
            };
            setPutResult(fortmatResponse(result));
          } catch (err) {
            setPutResult(err.message);
          }
        }
      }


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch(`${baseURL}/list/add`, {
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
      <center>
        <div className="App">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              placeholder="Enter New Task"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="button" type="submit">Create Task</button>
             <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>

          <div>
          <button onClick={fetchData} className="button" type>YOUR TODOs</button><br/>
          {tasks.length > 0 && (
             <div className="bg-dark text-white rounded">
                    <div className="col-12 mt-3 py-3">

                      <div className="container p-4">
                        <table border="0" width="110%">
                          <tr>
                            <th  className="text-white" id="themeColor" > Index</th>
                            <th className="container  p-4" id="themeColor"> Task</th>
                            <th className="container  p-4" id="themeColor"> Edit</th>
                            <th className="container  p-4" id="themeColor"> Done</th>
                          </tr>
                          {tasks.map((tasks, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{tasks.title}</td>
                                <td>
                                    <Popup trigger=
                                        {
                                             <button > Edit </button>
                                        }position="right center"
                                    >
                                    <div>Edit your task</div>
                                     <form onSubmit={putData(tasks._id)}>
                                            <div className="form-group">
                                              <input type="text" className="form-control" ref={put_title} placeholder="Edit Task" />
                                            </div>
                                       <button className="button" type="submit">Save Task</button>
                                      </form>
                                    </Popup>
                                </td>
                                <td>
                                  <button
                                    onClick={() => {deleteDataById(tasks._id);}}
                                    className="btn btn-danger"
                                  >
                                    Done
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
          )}
        </div>
       </div>
      </center>
    </Base>
  );
}

export default AddNewTask;
