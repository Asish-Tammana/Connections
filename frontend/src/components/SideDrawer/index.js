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
import { TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [userList, setUserList] = useState([]);

  const fetchUsersList = () => {
    
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, p:1, pt: 2 }} role="presentation">
      <TextField id="outlined-basic" label="Search User" variant="outlined" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <Divider />
    </Box>
  );

  useEffect(() => {
    fetchUsersList();
  }, [userInput])

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><PersonSearchIcon /> Search User</Button>
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