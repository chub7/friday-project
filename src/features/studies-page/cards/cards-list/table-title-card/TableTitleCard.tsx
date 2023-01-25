import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {GeneralButton} from "../../../../../common/utils/style-for-mui/style-for-mui";
import {ownerOfPackSelector} from "../../../packs/packs-selectors";
import {CardModel} from "../card-model/CardModel";
import styles from '../../../studies-page.module.css'
import {addNewCard,} from "../../cards-slice";
import React, {useState} from "react";
import {usePopUpUpdateMenuField} from "../../../../../common/components/pop-up-menu/hooks/usePopUpUpdateMenuField";
import {PopUpUpdateMenu} from "./pop-up-update-menu/PopUpUpdateMenu";
import {ModalWindowForPack} from "../../../packs/packs-modal-window/ModalWindowForPack";
import {ModalWindow} from "../../../../../common/modal-window/ModalWindow";
import {changeNamePacksCards, deletePacksCards, setCurrentOwnerOfPack} from "../../../packs/packs-slice";
import {DeleteModalWindow} from "../../../packs/packs-modal-window/DeleteModalWindow";

export const TableTitleCard = () => {
    const namePack = useAppSelector(ownerOfPackSelector)
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const popUpUpdateMenuField = usePopUpUpdateMenuField(setShowModalEdit,setShowModalDelete)
    const dispatch = useAppDispatch();
    const params = useParams()
    const model = CardModel()
    const navigate = useNavigate()


    const sendRequest = () => {
        dispatch(addNewCard(params.id))
    }

    const submitSave = (name: string, isPrivate: boolean) => {
        dispatch(changeNamePacksCards(params.id, name, isPrivate))
        dispatch(setCurrentOwnerOfPack(name))
    }

    const handleSubmitDeletePack = () => {
        dispatch(deletePacksCards(params.id))
    }

    return (
        <div className={styles.headerContainer}>
            <div style={{display: "flex"}}>
                <h3>{namePack}</h3>
                {model.myPack && <PopUpUpdateMenu popUpUpdateMenuField={popUpUpdateMenuField}/>}
            </div>
            {model.myPack ?
                <GeneralButton onClick={sendRequest}>Add new Card</GeneralButton> :
                <GeneralButton onClick={() => {
                    navigate(`/learn/${params.id}`)
                }}>Learn to pack</GeneralButton>}

            {/*Модалка редактирования */}
            <ModalWindow setShowModal={setShowModalEdit} showModal={showModalEdit} title={`Edit pack`}>
                <ModalWindowForPack setShowModal={setShowModalEdit} submitSave={submitSave} currentName={namePack}/>
            </ModalWindow>

            {/*Модалка удаления */}
            <ModalWindow setShowModal={setShowModalDelete} showModal={showModalDelete} title={`Edit pack`}>
                <DeleteModalWindow setShowModal={setShowModalDelete} submitDelete={handleSubmitDeletePack}
                                   currentName={namePack}/>
            </ModalWindow>
        </div>
    )
}

