import React from "react";
import { useReducer } from "react";

function toDo() {
  const initialTodo = {
    inputValue: "",
    tasks: [],
  };
  const todoReducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return { ...state, inputValue: action.value };
      case "TASK":
        return {
          ...state,
          tasks: [
            ...state.tasks,
            { id: Date.now(), text: state.inputValue, hidden: false },
          ],
          inputValue: "",
        };
      case "UPDATE_TASK":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.id ? { ...task, text: action.text } : task
          ),
        };
      case "DELETE_TASK":
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.id),
        };
      default:
        return state;
    }
  };
  const [todo, dispatch] = useReducer(todoReducer, initialTodo);
  const handleInput = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const handleClick = () => {
    dispatch({ type: "TASK" });
  };

  const handleUpdate = (id, value) => {
    dispatch({ type: "UPDATE_TASK", id, text: value });
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TASK", id });
  };

  return (
    <div className="page">
      <div className="todo-page">
        <div>
          <input
            className="inputText"
            type="text"
            value={todo.inputValue}
            onChange={handleInput}
          />
          <button className="addItem" onClick={handleClick}>
            Add Item
          </button>
        </div>
        <div className="text">{todo.inputValue}</div>
        <div>
          {todo.tasks.map((task) => (
            <div className="todoTask" key={task.id}>
              <input
                className="inputText"
                type="text"
                value={task.text}
                onChange={(e) => handleUpdate(task.id, e.target.value)}
              />
              <button
                className="deleteItem"
                onClick={() => handleDelete(task.id)}
              >
                Delete Item{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default toDo;