import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Typography } from '@mui/material'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import { createNewGroup } from '../../actions/chatActions';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const NewGroupModal = () => {

    const [open, setOpen] = useState(false);
    const [groupchatName, setGroupChatName] = useState('');
    const [userSearchInput, setUserSearchInput] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usersList = useSelector(state => state.usersList)
    const newGroup = useSelector(state => state.newGroup)
    const {error} = newGroup
    const { allUsersList } = usersList;


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setUserSearchInput("")
    };


    const userSelected = (user) => {
        setGroupMembers([...groupMembers, user])
        setUserSearchInput("")
    }

    const createGroup = async() => {
        const usersList = groupMembers.map(member => member._id)
        const res = await dispatch(createNewGroup(groupchatName, usersList, navigate))
        if(res) {
            handleClose()
        }
    }

    const handleDelete = (id) => {
        const updatedGroupMembers = groupMembers.filter(groupMember => groupMember._id !== id)
        setGroupMembers([...updatedGroupMembers])
    };

    useEffect(() => {
        dispatch(getAllUsers(userSearchInput))
    }, [userSearchInput, dispatch]);

    return (
        <div>
            <Button onClick={handleOpen}>+ New Group</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create New Group
                    </Typography>
                    <input type="text" placeholder='Enter the Group name' value={groupchatName} onChange={(e) => setGroupChatName(e.target.value)} />
                    <input type="text" placeholder='Add a member' value={userSearchInput} onChange={(e) => setUserSearchInput(e.target.value)} /><br />

                    {groupMembers.length !== 0 && <Stack direction="row" spacing={1}>
                    {groupMembers?.map((member, index) => <Chip key={member._id} label={member.name} variant="outlined" onDelete={() => handleDelete(member._id)} />)}
                    </Stack>
                    }

                    <Button onClick={createGroup}>Add to Group</Button>

                    {(userSearchInput !== '' && allUsersList) && <List>
                        {allUsersList?.map((user) => (
                            <ListItem key={user._id}>
                                <ListItemButton onClick={() => userSelected(user)}>
                                    <ListItemIcon>
                                        <PersonSearchIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={user.name} />
                                </ListItemButton>
                            </ListItem>
                            // change the list to menu during UI change
                        ))}
                    </List>}

                    {error && <Typography>{error}</Typography>}

                </Box>
            </Modal>
        </div>
    )
}

export default NewGroupModal
