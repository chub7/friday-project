import React, {FC, useState} from 'react';
import {GeneralButton} from "../../../../common/utils/style-for-mui/style-for-mui";
import style from "./empty-pack.module.css"
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useParams} from 'react-router-dom';
import {addNewCard, setCardsError, setSuccessStatusForSnackBar} from '../cards-slice';
import {CardModel} from '../cards-list/card-model/CardModel';
import {BackToPackLink} from "../../../../common/components/back-link/BackToPackLink";
import styles from "../../studies-page.module.css";
import {UniversalSnackbar} from "../../../../common/components/snack-bar/Snackbar";
import {cardErrorSelector, successStatusForSnackBarSelector} from '../cards-selectors';
import {ModalWindowForCards} from "../../../../common/modal-window/cards-modal-window/ModalWindowForCards";
import {ModalWindow} from "../../../../common/modal-window/main-modal-window/ModalWindow";

type EmptyPackType = {
    namePack: string

}
export const EmptyPack: FC<EmptyPackType> = ({namePack}) => {

    const dispatch = useAppDispatch()
    const params = useParams()
    const model = CardModel()
    const success = useAppSelector(successStatusForSnackBarSelector)
    const error = useAppSelector(cardErrorSelector)
    const [showModalEdit, setShowModalEdit] = useState(false)

    const handleAddCard = (question: string, answer: string, answerImg: string, questionImg: string) => {
        dispatch(addNewCard(params.id, question, answer, answerImg, questionImg))
    }

    const open = error !== null || !!success

    return (
        <div className={styles.wholeForm}>
            <BackToPackLink/>
            <h3 className={styles.ownerName}>{namePack}</h3>

            {model.myPack
                ? <div className={style.form}>
                    <p className={style.greyLabel}>This pack is empty. Click add new card to fill this pack</p>
                    <GeneralButton value={'blue'} onClick={() => setShowModalEdit(true)}>Add new card</GeneralButton>
                    <ModalWindowForCards
                        showModal={showModalEdit}
                        submitSave={handleAddCard}
                        setShowModal={setShowModalEdit}
                        title={`Edit card`}/>

                </div>
                : <div className={style.form}>
                    <p className={style.greyLabel}>This pack is empty.</p>
                </div>
            }
            {open && <UniversalSnackbar error={error} changeError={setCardsError} success={success}
                                        changeSuccess={setSuccessStatusForSnackBar}/>}

        </div>
    );
};

