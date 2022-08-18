//import React, { useState, useEffect } from "react";
//import Base from "../core/base.js";
//import { Link } from "react-router-dom";
//import { AddNewTask } from "./helper/apicalls";
//import "../styles.css";
import "../App.css";
import { useState } from "react";

function AddNewTask() {
  const [title, setTitle] = useState("");
   const [message, setMessage] = useState("");

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
    </div>
  );
}

export default AddNewTask;



//
//const AddNew = () => {
//
//  const [values, setValues] = useState({
//    title: "",
//    loading: false,
//    error: "",
//    createdProduct: "",
//    getaRedirect: false,
//    formData: "",
//  });
//
//  const {title,loading,error,createdProduct,getaRedirect,formData,} = values;
//
//  const preload = () => {
//        setValues({ ...values, formData: new FormData() });
//  };
//
//  useEffect(() => {
//    preload();
//  }, []);
//
//  const handleChange = (name) => (event) => {
//    const value = name === "photo" ? event.target.files[0] : event.target.value;
//    formData.set(name, value);
//    setValues({ ...values, [name]: value });
//  };
//
//  // on submit function
//  const onSubmit = (event) => {
//    event.preventDefault();
//    setValues({ ...values, error: "", loading: true });
//    AddNewTask(formData)
//      .then((data) => {
//        if (data.error) {
//          setValues({ ...values, error: data.error });
//        } else {
//          setValues({
//            ...values,
//            title: "",
//
//            loading: false,
//            createdProduct: data.title,
//            getaRedirect: true,
//          });
//        }
//      })
//      .catch(console.log("Some Error Occured!"));
//  };
//
//  // Error message  //
//  const errorMessage = () => {
//    return (
//      <div className="row">
//        <div className="col-md-6 offset-sm-3 text-center alert alert-danger mt-3" style={{ display: error ? " " : "none" }}>
//          <h4 style={{color:"black"}}>{error} <br></br> New room type adding was failed...!!!</h4>
//        </div>
//      </div>
//    );
//  };
//
//    // Success message//
//  const successMessage = () => {
//    return (
//      <div className="row">
//        <div className="col-md-6 offset-sm-3 text-center alert alert-success mt-3" style={{ display: createdProduct ? " " : "none" }}>
//          <h4 style={{color:"black"}}>New room type added Successfully...!!!</h4>
//        </div>
//      </div>
//    );
//  };
//
//  //form
//  const AddNewTaskForm = () => (
//    <form>
//      <span>Upload an image</span>
//      <div className="form-group">
//
//      </div>
//      <span>Room Type</span>
//      <div className="form-group mt-2">
//        <input
//          onChange={handleChange("title")}
//          name="title"
//          className="form-control"
//          value={title}
//        />
//      </div>
//
//      <div className="mt-4 d-grid mb-3">
//        <button
//          type="submit"
//          onClick={onSubmit}
//          className="btn btn-outline-dark rounded-pill"
//          id="themeColor"
//        >
//          Add New Task
//        </button>
//      </div>
//    </form>
//  );
//
//
//  //by this return portion : rendering components
//  return (
//    <Base navigation="" title="Admin" description="Add a new room type"  >
//
//      <div className="container p-4" id="themeColor">
//      <Link to="" className="btn btn=md btn-dark mb-3">
//        Go Back
//      </Link>
//
//      <div className="row bg-dark text-white rounded">
//        <div className="col-md-8 offset-md-2 mt-3 py-3">
//          {AddNewTaskForm()}
//          {errorMessage()}
//          {successMessage()}
//        </div>
//      </div>
//      </div>
//      <br/><br/><br/><br/>
//      <center><p style={{color:"gray",fontSize:"14px"}}>Atrium Leisure, all rights reserved.</p></center>
//    </Base>
//  );
//};
//
//export default AddNew;
//


//import React, { useState, useEffect } from "react";
//import "../styles.css";
//import { Link } from "react-router-dom";
//import Base from "../core/base.js";
//import Popup from './add_task_popup';
//import { AddNewTask } from "./helper/apicalls.js";
//
//export default function Home() {
//  const [values, setValues] = useState({
//        name: "",
//        error: "",
//        createdTask: "",
//        formData: "",
//      });
//
// const [isOpen, setIsOpen] = useState(false);
//
//  const togglePopup = () => {
//    setIsOpen(!isOpen);
//  }
//
//        const {name,error,createdTask,formData} = values;
//
//        const preload = () => {
//              setValues({ ...values, formData: new FormData() });
//        };
//
//        useEffect(() => {
//          preload();
//        }, []);
//
//         const handleChange = (name) => (event) => {
//            const value = name === "photo" ? event.target.files[0] : event.target.value;
//            formData.set(name);
//            setValues({ ...values, [name]: value });
//          };
//
//
//         // on submit function
//          const onSubmit = (event) => {
//            event.preventDefault();
//            setValues({ ...values, error: "", loading: true });
//            AddNewTask(formData)
//              .then((data) => {
//                if (data.error) {
//                  setValues({ ...values, error: data.error });
//                } else {
//                  setValues({
//                    ...values,
//                    name: "",
//                    createdTask: data.name,
//                  });
//                }
//              })
//              .catch(
//                console.log("Some Error Occured!")
//               );
//          };
//
//    const errorMessage = () => {
//      return (
//        <div className="row">
//          <div className="col-md-6 offset-sm-3 text-center alert alert-danger mt-3" style={{ display: error ? " " : "none" }}>
//            <h4 style={{color:"black"}}>{error} <br></br> Error occured ! </h4>
//          </div>
//        </div>
//      );
//    };
//   // Success message//
//    const successMessage = () => {
//      return (
//        <div className="row">
//          <div className="col-md-6 offset-sm-3 text-center alert alert-success mt-3" style={{ display: createdTask ? " " : "none" }}>
//            <h4 style={{color:"black"}}>New Task Added !</h4>
//          </div>
//        </div>
//      );
//    };
//
//const AddNewTaskForm = () =>(
//    <form>
//        <div class="input-group input-group-lg">
//               <input
//                   onChange={handleChange("name")}
//                   name="name"
//                   type="text"
//                   class="form-control"
//                   aria-label="Sizing example input"
//                   aria-describedby="inputGroup-sizing-lg"
//               />
//         </div><br/><br/><br/>
//
//         <div class="d-grid gap-2 col-6 mx-auto">
//                  <input
//                     type="submit"
//                      value="Add"
//                      onClick={onSubmit}
//                   />
//         </div>
//    </form>
//);
//
// return(
//       <div>
//       <Base navigation="" title="TODO" description="Your Task Manager">
//        <div class="d-grid gap-2 col-6 mx-auto">
//           <input
//              type="button"
//              value="Add New Task"
//              onClick={togglePopup}
//            />
//         </div>
//            {isOpen && <Popup
//              content={<>
//                <b>Enter New Task</b><br/><br/><br/>
//
//                {AddNewTaskForm()}
//              </>}
//              handleClose={togglePopup}
//            />}
//            </Base>
//       </div>
// );
//
//
//
//}
//
