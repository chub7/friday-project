import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {GeneralButton} from "../../../../../common/utils/style-for-mui/style-for-mui";
import {ownerOfPackSelector} from "../../../packs/packs-selectors";
import {CardModel} from "../card-model/CardModel";
import styles from '../../../studies-page.module.css'
import {addNewCard,} from "../../cards-slice";
import React, {useState} from "react";
import {usePopUpUpdateMenuField} from "../../../../../common/components/pop-up-menu/hooks/usePopUpUpdateMenuField";
import {PopUpUpdateMenu} from "./pop-up-update-menu/PopUpUpdateMenu";
import {ModalWindowForPack} from "../../../../../common/modal-window/packs-modal-window/ModalWindowForPack";
import {changeNamePacksCards, deletePacksCards, setCurrentOwnerOfPack} from "../../../packs/packs-slice";
import {DeleteModalWindow} from "../../../../../common/modal-window/DeleteModalWindow";
import {ModalWindowForCards} from "../../../../../common/modal-window/cards-modal-window/ModalWindowForCards";
import {useParams} from "react-router-dom";
import {ModalWindow} from "../../../../../common/modal-window/main-modal-window/ModalWindow";

export const TableTitleCard = () => {

    const namePack = useAppSelector(ownerOfPackSelector)

    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const popUpUpdateMenuField = usePopUpUpdateMenuField(setShowModalEdit, setShowModalDelete)

    const params = useParams()
    const model = CardModel()

    const dispatch = useAppDispatch()

    const handleAddCard = (question: string, answer: string, answerImg: string, questionImg: string) => {
        dispatch(addNewCard(params.id, question, answer, answerImg, questionImg))
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
            {model.myPack
                ? <GeneralButton onClick={() => setShowModal(true)}>Add new Card</GeneralButton>
                : <GeneralButton>
                    <NavLink to={`/learn/${params.id}`} className={styles.linkLearn}> Learn to pack</NavLink>
                </GeneralButton>}

            <ModalWindowForPack
                showModal={showModalEdit}
                setShowModal={setShowModalEdit}
                submitSave={submitSave}
                currentName={namePack}
                title={'Edit pack'}/>

            <DeleteModalWindow
                showModal={showModalDelete}
                setShowModal={setShowModalDelete}
                submitDelete={handleSubmitDeletePack}
                currentName={namePack}
                title={`Edit pack`}/>

            <ModalWindowForCards
                showModal={showModal}
                setShowModal={setShowModal}
                submitSave={handleAddCard}
                title={`Add new pack`}/>
        </div>
    )
}

