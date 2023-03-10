import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const StyleForMenu = {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
    },
    '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,

    }
}
export const AccountMenu = ({variant, open, anchorEl, handleClose}: AccountMenuType) => {

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
            </Box>
            <Menu
                disableScrollLock={true}
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {StyleForMenu},
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                {variant.map((e, index) =>
                    <MenuItem key={index} onClick={e.event}>
                        <img src={e.icon} alt={`icon`}/> {e.name}
                    </MenuItem>
                )}
            </Menu>
        </React.Fragment>
    );
}

type dataType = {
    name: string
    icon: string
    event: () => void
    //event: (cl:(name: string, isPrivate: boolean)=>void) => void
}
type AccountMenuType = {
    variant: dataType[]
    open: boolean,
    anchorEl: null | HTMLElement
    handleClose: () => void
}