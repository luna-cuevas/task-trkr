import { Button, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { db } from '../../firebase_config'
import './TodoList.css'

export const TodoList = ({ todo, inprogress, id }) => {

    function toggleInProgress() {
        db.collection("todos").doc(id).update({
            inprogress: !inprogress,
        })
    }
    function deleteTodo() {
        db.collection('todos').doc(id).delete();
    }
    return (
        <div className='done'>
            <ListItem>
                <ListItemText primary={todo} secondary={inprogress ? "In Progress" : "Completed"}  />
            </ListItem>
            <Button onClick={toggleInProgress}>{inprogress ? "Done" : "UnDone"}</Button>
            <Button onClick={deleteTodo}>X</Button>
        </div>
    )
}
