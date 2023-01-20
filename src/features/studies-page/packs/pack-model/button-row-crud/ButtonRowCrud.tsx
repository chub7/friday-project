import React, {FC} from 'react';
import styles from "../../../studies-page.module.css"
import IconButton from "@mui/material/IconButton";
import {NavLink} from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from '../../../../../app/store';
import {getMyIdSelector} from "../../../../profile/profile-selectors";
import {changeNamePacksCards, deletePacksCards} from "../../packs-slice";


type ButtonRowCrudType = {
    userId: string
    packId: string
    packCardsCount: number
}

export const ButtonRowCrud: FC<ButtonRowCrudType> = ({userId, packId, packCardsCount}) => {

    const myId = useAppSelector(getMyIdSelector)
    const dispatch = useAppDispatch()

    const handleChangeName = () => {
        dispatch(changeNamePacksCards(packId))
    }
    const handleDeletePack = () => {
        dispatch(deletePacksCards(packId))
    }
    return (
        (userId === myId) ?
            <div className={styles.linkContainer}>
                <IconButton disabled={packCardsCount === 0}>
                    <NavLink to={`/learn`}>
                        <SchoolIcon color={packCardsCount === 0 ? 'disabled' : 'action'}/>
                    </NavLink>
                </IconButton>
                <IconButton onClick={handleChangeName}> <EditIcon/></IconButton>
                <IconButton onClick={handleDeletePack}> <DeleteIcon/></IconButton>
            </div>
            : <IconButton disabled={packCardsCount === 0}>
                <NavLink to={`/learn`}>
                    <SchoolIcon color={packCardsCount === 0 ? 'disabled' : 'action'}/>
                </NavLink>
            </IconButton>)
};
