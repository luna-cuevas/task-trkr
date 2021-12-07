import React, { useState, useEffect } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete'

function App() {

  //get local storage data
  const getLocalData = () => {
    const list = localStorage.getItem("todoList");
    if (list) {
      return JSON.parse(list); //changing item into an array
    } else {
      return [];
    }
  };

  const [items, setItems] = useState(getLocalData()); //storing items in an array

  //function to add items
  const addTodo = (e) => {
    e.preventDefault(); //preventing the page to reload

    if (!todoInput) {
      alert("Please enter something");
    } else {
      const newTodoInput = {
        id: new Date().getTime().toString(),
        name: todoInput,
      };
      setItems([...items, newTodoInput]);
      setTodoInput("");
    }
  };

  const [todoInput, setTodoInput] = useState(""); 

  //delete items
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  //delete all items
  const deleteAll = () => {
    setItems([]);
  };

  //delete all button
  const disableBtnProps = {};
  if (items.length === 0) {
    disableBtnProps.disabled = true;
  } else {
    disableBtnProps.disabled = false;
  }

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <span className="heading">Task Tracker </span>
          <form>
            <TextField id="standard-basic" label="Add a task" className="text-area" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
            <Button type="submit" onClick={addTodo} variant="outlined" style={{ display: "none" }}>
              Add item
            </Button>
          </form>
          {/* show todo list */}
          <div className="show-list">
            <div className="items">
              {items.map((curElem) => {
                return (
                  <div className="each-item" key={curElem.id}>
                    <span>{curElem.name}</span>
                    <div className="todo-buttons">
                      <IconButton aria-label="delete" className="btn" onClick={() => deleteItem(curElem.id)}>
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Button variant="outlined" size="medium" className="btn delete-all-btn" onClick={deleteAll} {...disableBtnProps}>
            DELETE ALL
          </Button>
        </div>
      </div>
      <iframe id='spotify' src="https://open.spotify.com/embed/playlist/1OFYueY9xdzvJESetZaiKw?utm_source=generator&theme=0" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    </>
  );
}

export default App;
