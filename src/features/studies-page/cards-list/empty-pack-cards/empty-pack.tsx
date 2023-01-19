import React, {FC} from 'react';
import {GeneralButton} from "../../../../utils/StyleForMUI/StyleForMUI";
import style from "./empty-pack.module.css"
import {useAppDispatch} from "../../../../app/store";
import {useParams} from 'react-router-dom';
import {addNewCard, setCardsError, setSuccessStatusForSnackBar} from '../cards-slice';
import {CardModel} from '../CardModel';
import {BackToPackLink} from "../../../../components/BackLink/BackToPackLink";
import styles from "../../studies-page.module.css";
import {UniversalSnackbar} from "../../../../components/SnackBar/Snackbar";
type EmptyPackType={
    namePack:string
    error:string|null
    success:string
    open:boolean


}
export const EmptyPack:FC<EmptyPackType> = ({namePack,error,success,open}) => {

    const dispatch = useAppDispatch()
    const params = useParams()
    const model = CardModel()

    const onClickHandler = () => {
        dispatch(addNewCard(params.id))
    }

    return (
        <>
            <BackToPackLink/>
            <h3 className={styles.ownerName}>{namePack}</h3>
            {model.myPack ?
                <div className={style.form}>
                    <p className={style.greyLabel}>This pack is empty. Click add new card to fill this pack</p>
                    <GeneralButton value={'blue'} onClick={onClickHandler}>Add new
                        card</GeneralButton>
                </div>
                : <div className={style.form}>
                    <p className={style.greyLabel}>This pack is empty.</p>
                </div>
            }
            {open && <UniversalSnackbar error={error} changeError={setCardsError} success={success}
                                        changeSuccess={setSuccessStatusForSnackBar}/>}

        </>
    );
};

