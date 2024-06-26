import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from 'react'
import { useSelector } from 'react-redux'

const Notifications = () => {

    const notifications = useSelector(state => state.notifications)
    const { notificationsList } = notifications

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <NotificationsIcon />
                {notificationsList.length > 0 && <span>{notificationsList.length}</span>}
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
                        <MenuItem onClick={handleClose}>{each.content}</MenuItem>
                    )
                }): <MenuItem>No Notifications</MenuItem>}
            </Menu>
        </div>
    )
}

export default Notifications
