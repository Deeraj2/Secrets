import React, { useContext } from 'react';
import { noteContext } from '../../context/NoteProvider';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './Notes.css'
import * as api from '../../api/index';
import Modal from '@mui/material/Modal';


const Notes = ({ note }) => {
  const {setCurrentId, user, notes, setAlert} = useContext(noteContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openSet, setOpenSet] = React.useState(false);
  const handleOpenData = () => setOpenSet(true);
  const handleCloseData = () => setOpenSet(false);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate =(note)=>{
    setCurrentId(note._id);
    handleClose();
  }

  const handleDelete = async(id) =>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await api.deleteNote(id, config);
      notes.filter((note) => note?._id !== data._id);
      window.location.reload();
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error,
        type: "error"
      })
    }
  }

  function truncate(string, n){
        return string?.length > n ? string.substr(0, n-1) + "..." : string
    }

  return (
    
    <div>
        <div className='note' >
        <div className='title'>
          <h2 onClick={handleOpenData}>{note.title}</h2>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon sx={{ color : "#6977c5", cursor: "pointer" }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{"& .MuiSvgIcon-root": {backgroundColor: "#161d27",}}}
            >
              <MenuItem onClick={()=>handleUpdate(note)} >Update</MenuItem>
              <MenuItem onClick={()=>handleDelete(note._id)}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
        
        <p  onClick={handleOpenData}>{truncate(note.note, 550)}</p>
        </div>
      <Modal
        open={openSet}
        onClose={handleCloseData}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='modal-note'>
          <h1>{note.title}</h1>
          <p>{note.note}</p>
        </div>
      </Modal>
    </div>
  )
}

export default Notes