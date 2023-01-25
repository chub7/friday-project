import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {GeneralButton} from "../../../../../common/utils/style-for-mui/style-for-mui";
import {ownerOfPackSelector} from "../../../packs/packs-selectors";
import {CardModel} from "../card-model/CardModel";
import styles from '../../../studies-page.module.css'
import React, {useState} from "react";
import {usePopUpUpdateMenuField} from "../../../../../common/components/pop-up-menu/hooks/usePopUpUpdateMenuField";
import {PopUpUpdateMenu} from "./pop-up-update-menu/PopUpUpdateMenu";
import {ModalWindow} from "../../../../../common/modal-window/ModalWindow";
import {ModalWindowForCards} from "../../cards-modal-window/ModalWindowForCards";
import {addNewCard} from "../../cards-slice";
import {useParams} from "react-router-dom";

export const TableTitleCard = () => {
    const [showModal, setShowModal] = useState(false);

    const namePack = useAppSelector(ownerOfPackSelector)

    const popUpUpdateMenuField = usePopUpUpdateMenuField()

    const params = useParams()
    const model = CardModel()
    const dispatch = useAppDispatch()

    const handleAddCard = (question: string, answer: string) => {
        dispatch(addNewCard(params.id, question, answer))
    }

    return (
        <div className={styles.headerContainer}>
            <div style={{display: "flex"}}>
                <h3>{namePack}</h3>
                {model.myPack && <PopUpUpdateMenu popUpUpdateMenuField={popUpUpdateMenuField}/>}
            </div>
            {model.myPack
                ? <GeneralButton onClick={() => setShowModal(true)}>Add new Card</GeneralButton>
                : <GeneralButton>Learn to pack</GeneralButton>}

            <ModalWindow showModal={showModal} setShowModal={setShowModal} title={`Add new pack`}>
                <ModalWindowForCards
                    setShowModal={setShowModal}
                    submitSave={handleAddCard}/>
            </ModalWindow>
        </div>
    )
}

