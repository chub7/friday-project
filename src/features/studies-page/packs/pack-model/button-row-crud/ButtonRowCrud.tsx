import React, {FC, useState} from 'react';
import styles from "../../../studies-page.module.css";
import IconButton from "@mui/material/IconButton";
import {NavLink} from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {getMyIdSelector} from "../../../../profile/profile-selectors";
import {changeNamePacksCards, deletePacksCards} from "../../packs-slice";
import {ModalWindow} from "../../../../../common/modal-window/ModalWindow";
import {ModalWindowForPack} from "../../packs-modal-window/ModalWindowForPack";
import {DeleteModalWindow} from "../../packs-modal-window/DeleteModalWindow";


type ButtonRowCrudType = {
    userId: string
    packId: string
    packName: string
    packCardsCount: number

}

export const ButtonRowCrud: FC<ButtonRowCrudType> = ({userId, packId, packCardsCount, packName}) => {
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const myId = useAppSelector(getMyIdSelector)
    const dispatch = useAppDispatch()

    const submitSave = (name: string, isPrivate: boolean) => {
        dispatch(changeNamePacksCards(packId, name, isPrivate))
    }
    const handleChangeName = () => {
        setShowModalEdit(true)
    }

    const handleDeletePack = () => {
        setShowModalDelete(true)
    }

    const handleSubmitDeletePack = () => {
        dispatch(deletePacksCards(packId))
    }
    return (
        (userId === myId) ?
            <div className={styles.linkContainer}>
                <IconButton disabled={packCardsCount === 0}>
                    <NavLink to={`/learn/${packId}`}>
                        <SchoolIcon color={packCardsCount === 0 ? 'disabled' : 'action'}/>
                    </NavLink>
                </IconButton>
                <IconButton onClick={handleChangeName}> <EditIcon/></IconButton>
                <IconButton onClick={handleDeletePack}> <DeleteIcon/></IconButton>

                {/*Модалка редактирования */}
                <ModalWindow setShowModal={setShowModalEdit} showModal={showModalEdit} title={`Edit pack`}>
                    <ModalWindowForPack
                        setShowModal={setShowModalEdit}
                        submitSave={submitSave}
                        currentName={packName}/>
                </ModalWindow>
                {/*Модалка редактирования */}

                {/*Модалка удаления */}
                <ModalWindow setShowModal={setShowModalDelete} showModal={showModalDelete} title={`Delete pack`}>
                    <DeleteModalWindow
                        setShowModal={setShowModalDelete}
                        submitDelete={handleSubmitDeletePack}
                        currentName={packName}/>
                </ModalWindow>
                {/*Модалка удаления */}
            </div>
            : <IconButton disabled={packCardsCount === 0}>
                <NavLink to={`/learn/${packId}`}>
                    <SchoolIcon color={packCardsCount === 0 ? 'disabled' : 'action'}/>
                </NavLink>
            </IconButton>)
};
