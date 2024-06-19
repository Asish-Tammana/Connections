import React, { useEffect, useState } from 'react'
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Typography } from '@mui/material'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
}

const UpdateGroupModal = () => {

    const usersList = useSelector(state => state.usersList)
    const { allUsersList } = usersList;

    const userChats = useSelector(state => state.userChats)
    const { error, chats } = userChats



    const [open, setOpen] = useState(false);
    const [groupchatName, setGroupChatName] = useState("");
    const [userSearchInput, setUserSearchInput] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);

    useEffect(() => {
        const chatId = window.location.pathname.split('/').reverse()[0]
        const currentGroup = chats?.find(chat => chat._id === chatId)

        chats && setGroupChatName(currentGroup.chatName)
        chats && setGroupMembers(currentGroup.users)
    }, [open, chats])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        // setUserSearchInput("")
    };

    const userSelected = (user) => {
        setGroupMembers([...groupMembers, user])
        setUserSearchInput("")
    }

    const handleDelete = (id) => {
        const updatedGroupMembers = groupMembers.filter(groupMember => groupMember._id !== id)
        setGroupMembers([...updatedGroupMembers])
    };

    return (
        <div>
            <Button onClick={handleOpen}>Update Group</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Group
                    </Typography>
                    <input type="text" placeholder='Enter the Group name' value={groupchatName} onChange={(e) => setGroupChatName(e.target.value)} />
                    <input type="text" placeholder='Add a member' value={userSearchInput} onChange={(e) => setUserSearchInput(e.target.value)} /><br />

                    {groupMembers.length !== 0 && <Stack direction="row" spacing={1}>
                        {groupMembers?.map((member) => <Chip key={member._id} label={member.name} variant="outlined" onDelete={() => handleDelete(member._id)} />)}
                    </Stack>
                    }

                    <Button>Update Group</Button>

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

export default UpdateGroupModal
