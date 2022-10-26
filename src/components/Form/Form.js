import React, { useContext, useEffect, useState } from 'react';
import { noteContext } from '../../context/NoteProvider';
import './Form.css'
import Zoom from '@mui/material/Zoom';
import * as api from '../../api/index';

const Form = () => {

    const { user, notes, setNotes,  currentId, setAlert } = useContext(noteContext);

    const [noteData, setNoteData] = useState({
        title: '',
        note: ''
    });
    const [expanded, setexpanded] = useState(false);

    const note = currentId ? notes.find((note)=> note._id == currentId) : null;

    const handleAdd= async(e)=> {
      e.preventDefault();  
      if(currentId === 0){
        handleCreate();
      }else{
        handleUpdate();
      }
        
    }


    const handleCreate = async()=>{
      if(!noteData.title || !noteData.note){
        setAlert({
          open: true,
          message: 'Please fill the fields',
          type: "error"
        })
        return;
      }

      try {
        const config ={
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        }
        const { data } = await api.createNote(noteData, config);
        setNotes([data , ...notes ])
        clear();
      } catch (error) {
        setAlert({
        open: true,
        message: error,
        type: "error"
      })
      }
    }

    const handleUpdate = async() =>{
      try {
        
        const config = {
          headers : {
            authorization: `Bearer ${user.token}`,
          },
        }

        const { data } = await api.updateNotes(currentId, noteData, config)
        console.log(data)
        notes.map((note) => (note._id === data._id ? data : note));
        window.location.reload();
        clear();
      } catch (error) {
        setAlert({
          open: true,
          message: error,
          type: "error"
        })
      }
    }

    const clear=()=>{
      setNoteData({ title: "" , note: "" });
    }

    function isExpanded(){
        setexpanded(true)
    }


    useEffect(()=>{
      if(note) setNoteData(note);
    }, [note])


  return (
    <div className={expanded ? "form" : "notActive-from"}>
        {expanded && <input type='text' placeholder='Title' value={noteData.title} onChange={(e) => setNoteData({...noteData, title: e.target.value})}  /> }
        <textarea onClick={isExpanded} placeholder='Take a Note...'  className={ expanded ? "ActiveText" : "NotActiveText" } value={noteData.note} onChange={(e) => setNoteData({...noteData, note: e.target.value}) } />
        <Zoom in={expanded}>
          <button className='add' onClick={handleAdd}>Add</button>
        </Zoom>
    </div>
  )
}

export default Form