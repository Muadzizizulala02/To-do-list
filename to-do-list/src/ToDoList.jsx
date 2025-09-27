import React, { useState } from "react";
import "./index.css"; // ✅ add this line to import the CSS file

function ToDoList() {
  // our state variable
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  // to get the value in the input task
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    //to prevent empty addition
    if (newTask.trim() !== "") {
      // dapatkan previous state of the array
      // spread it then add the newTask that were passed at handleInputChange fx
      setTask((t) => [...t, newTask]);
      // reset the newSetTask so it can receive new task
      setNewTask("");
    }
  }

  function deleteTask(index) {
    // filter creates a new array that keeps only the tasks where the position i is not equal to the one you clicked.
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTask(updatedTasks);
  }

  function moveTaskUp(index) {
    // to make sure yg paling atas xyh move dh
    if (index > 0) {
      const updatedTasks = [...tasks]; // make a copy of the current list
      //Use [a,b] = [b,a] to swap the current task with the one above it.
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];

      setTask(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks]; // make a copy of the current list
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];

      setTask(updatedTasks);
    }
  }

  return (
    <div className="toDoList">
      {/* for the header of the app */}
      <h1>To-Do-List</h1>

      <div className="input-container">
        {/* for the input to add new task */}
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
          className="task-input"
        />
        {/* for the add button when adding new task */}
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      {/* to show the list with the the button */}
      <ol className="task-list">
        {/* get the "tasks" and do this for each one */}
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span className="text">{task}</span>
            <div className="button-group">
              {/* the delete button wiht the the current index*/}
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              {/* the move up button */}
              <button className="move-button" onClick={() => moveTaskUp(index)}>
                ⬆️
              </button>
              {/* the move down button */}
              <button
                className="move-button"
                onClick={() => moveTaskDown(index)}
              >
                ⬇️
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
