import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { noteContext } from '../../context/NoteProvider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0D1117',
  outline: 'none',
  borderRadius: 2,
  p: 4,
};

export default function HeaderModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, setUser, setAlert } = React.useContext(noteContext)

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
    setAlert({
        open: true,
        message: `Logout Successful.`
    });
  }

    React.useEffect(()=>{
        const token = user?.token;

        if(token) {
            const decodeToken = decode(token)
            if(decodeToken.exp*1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

  return (
    <div>
      <Avatar onClick={handleOpen} src={user?.pic} alt={user?.name} sx={{ backgroundColor: "#6977c5", cursor: "pointer" }} >{user?.name.charAt(0)}</Avatar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <div className='modal-content'>
            <Avatar  sx={{ marginLeft: "auto", marginRight: "auto", height: "120px", width: "120px" }} src={user?.pic} alt={user?.name}>{user?.name.charAt(0)}</Avatar>
            <h2 className='modal-name'>{user?.name}</h2>
            <p className='modal-email'>{user?.email}</p>
          </div>
           <button className='modal-logout' onClick={logout} >Log Out</button>
        </Box>
      </Modal>
    </div>
  );
}
