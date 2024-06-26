import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { removeNotification } from '../../actions/messageActions';

const Notifications = () => {

    const notifications = useSelector(state => state.notifications)
    const { notificationsList } = notifications

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToMessage = (notif) => {
        handleClose()
        navigate(`/chats/${notif.chat._id}`)
        dispatch(removeNotification(notif))
    }

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Badge badgeContent={notificationsList.length} color="primary">
                    <NotificationsIcon color="action" />
                </Badge>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {notificationsList.length > 0 ? notificationsList.map(each => {
                    return (
                        <MenuItem onClick={() => goToMessage(each)}>{each.sender.name} - {each.content}</MenuItem>
                    )
                }) : <MenuItem>No Notifications</MenuItem>}
            </Menu>
        </div>
    )
}

export default Notifications
