import React from 'react';
import styles from "../header.module.css";
import {AccountMenu} from "../../../common/components/pop-up-menu/pop-up-menu";
import {usePopUpMenu} from "../../../common/components/pop-up-menu/hooks/usePopUpMenu";
import {useAppSelector} from "../../../app/store";
import {getAvatarSelector, getProfileNameSelector} from "../../profile/profile-selectors";

export const ProfileNavigation = ({popUpProfileMenuField}:ProfileNavigationType) => {
    const {handleClose, handleClick, open , anchorEl} = usePopUpMenu()
    const profileAvatar = useAppSelector(getAvatarSelector);
    const profileName = useAppSelector(getProfileNameSelector);
    const avatar = profileAvatar
        ? profileAvatar
        : "https://static.thenounproject.com/png/707608-200.png";

    return (
        <div className={styles.avatar}>
            <div className={styles.name} onClick={handleClick}>{profileName}</div>
            <AccountMenu variant={popUpProfileMenuField} open={open} anchorEl={anchorEl} handleClose={handleClose} />
            <img alt={`avatatr`} src={avatar}/>

        </div>
    );
};

type dataType = {
    name: string
    icon: string
    event: ()=>void
}
type ProfileNavigationType = {
    popUpProfileMenuField: dataType[]
}
