import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api/index';

export const noteContext = createContext();

const NoteProvider = ({children}) => {
    const [alert, setAlert] = useState({
      open:false,
      message: '',
      type: 'success'
    });

    const [user, setUser] = useState(null)
    const [notes , setNotes] = useState([])
    const [currentId, setCurrentId] = useState(0);

    const navigate = useNavigate();

    const fetchingNotes = async() =>{
      try {
        const config ={
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
        const { data } = await api.fetchNotes(config)
        const result = data.reverse();
        setNotes(result);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("profile"))

        setUser(userInfo);

        if(!user) navigate('/login');
        fetchingNotes();
      },[])

    useEffect(()=>{
      fetchingNotes()
    }, [user, currentId])

  return (
    <noteContext.Provider
      value={{ user, setUser, alert, setAlert, notes, setNotes, currentId, setCurrentId, fetchingNotes}}
    >{children}</noteContext.Provider>
  )
}

export default NoteProvider