import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonIcon from '@mui/icons-material/Person';
import { Skeleton, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import { createNewChat } from '../../actions/chatActions';


const SkeletonContainer = ({ containerHeight }) => {
  const skeletonHeight = 60; // Height of one Skeleton component in pixels
  const containerHeightInPx = parseInt(containerHeight, 10); // Convert containerHeight to a number

  const numberOfSkeletons = Math.ceil(containerHeightInPx / skeletonHeight);

  const skeletons = Array.from({ length: numberOfSkeletons });

  return (
    <div style={{ height: containerHeight }}>
      {skeletons.map((_, index) => (
        <Box className="flex justify-between mt-2" >
          <Skeleton key={index} variant="circular" width={40} height={40} />
          <Skeleton key={index} variant="rounded" width={180} height={60} />
        </Box>
      ))}
    </div>
  );
};

const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState('');

  const dispatch = useDispatch()
  const usersList = useSelector(state => state.usersList)
  const { loading, allUsersList } = usersList;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const selectUser = (userId) => {
    dispatch(createNewChat(userId))
  }

  const DrawerList = (
    <Box sx={{ width: 250, p: 1, pt: 2 }} role="presentation">
      <TextField id="outlined-basic" label="Search User" variant="outlined" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <Divider  />

      {loading && <Stack spacing={2}>
        <SkeletonContainer containerHeight="90vh" />
      </Stack>}

      {(userInput !== '' && allUsersList) ? <List className='min-h-80vh'>
        {allUsersList?.map((user) => (
          <ListItem key={user._id}>
            <ListItemButton onClick={() => selectUser(user._id)}>
              <ListItemIcon>
                {user.picture ? <img src={user.picture} className='rounded-3xl h-10 w-10' alt={user.name} /> : <PersonIcon />}
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> : <Box className="min-h-80vh flex flex-col justify-center items-center" >
        <Typography variant='h5'>Search Any User</Typography>
      </Box>}
    </Box>
  );

  useEffect(() => {
    dispatch(getAllUsers(userInput))
  }, [userInput, dispatch])

  return (
    <div>
      <Button onClick={toggleDrawer(true)} className='rounded-2xl'>
        <PersonSearchIcon color='secondary' />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default SideDrawer


// <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>