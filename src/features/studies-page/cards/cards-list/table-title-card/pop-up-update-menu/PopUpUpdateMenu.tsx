import {usePopUpMenu} from "../../../../../../common/components/pop-up-menu/hooks/usePopUpMenu";
import menuIcon from "../../../../../../common/assets/popUpMenu.svg";
import {AccountMenu} from "../../../../../../common/components/pop-up-menu/pop-up-menu";
import React from "react";

export const PopUpUpdateMenu = ({popUpUpdateMenuField}: CardsSettingsMenuType) => {
    const {handleClose, handleClick, open, anchorEl} = usePopUpMenu()
    return (<>
        <img src={menuIcon} alt="popUpMenu" onClick={handleClick} style={{cursor:'pointer'}}/>
        <AccountMenu variant={popUpUpdateMenuField} open={open} anchorEl={anchorEl} handleClose={handleClose}/>
    </>)
}

type CardsSettingsMenuType = {
    popUpUpdateMenuField: dataType[]
}

type dataType = {
    name: string
    icon: string
    event: () => void
}