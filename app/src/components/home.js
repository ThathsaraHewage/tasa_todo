import "../App.css";
import Base from "../core/base.js";
import React, { useRef, useState } from "react";

function AddNewTask() {
   const [title, setTitle] = useState("");
   const [message, setMessage] = useState("");
   const [tasks, setTasks] = useState([])

      const deleteAPIURL = "http://localhost:8000/task/list";
      const delete_id = useRef(null);
      const [deleteResult, setDeleteResult] = useState(null);
      const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
      }

    //display all tasks
    const fetchData = () => {
        fetch("http://localhost:8000/task")
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
                const res = await fetch(`${deleteAPIURL}/${id}`, { method: "delete" });
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
                                       <button onClick={() => {deleteDataById(tasks._id);}} className="btn btn-primary">
                                                                   Edit
                                                                 </button>
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




//            <ul>
//              {tasks.map(task => (
//              <table className="c">
//                <tr >
//                <td key={task.id}>{task.title} </td>
//                <td>
//                  <button type="button" className="editbutton">
//                       Edit
//                  </button>
//                </td>
//                <td>
//                 <button type="button" className="deletebutton" onClick={deleteDataById}>
//                    Done
//                 </button>
//               </td>
//               </tr>
//              </table>
//              ))}
//            </ul>
          )}
        </div>
        </div>
          </center>
    </Base>
  );
}

export default AddNewTask;
