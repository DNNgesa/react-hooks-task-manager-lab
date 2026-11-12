import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";

function App() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="container">
      <h1 className="mb-3">
        <i className="bi bi-check2-square text-success me-2"></i>
        Task Manager
      </h1>
      <TaskForm />
      <SearchBar />
    </div>
  );
}

export default App;
