import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { MainTable } from "../../../components/table/MainTable";
import { addNewCard, setCards, setCardsError } from "./cards-slice";
import { CardModel } from "./CardModel";
import styles from '../studies-page.module.css'
import { BackToPackLink } from "../../../components/BackLink/BackToPackLink";
import { GeneralButton } from '../../../utils/StyleForMUI/StyleForMUI';
import { InputSearch } from "../../../components/InputSearch/InputSearch";
import { useParams } from "react-router-dom";
import { EmptyPack } from "./empty-pack-cards/empty-pack";
import { cardErrorSelector, cardsListIsLoadingSelector, ownerOfPackSelector } from "../studies-selectors";
import { CircularProgress } from "@mui/material";
import { packListApi } from "../pack-list/pack-list-api";
import { cardListApi } from "./cards-list-api";
import { getProfileSelector } from "../../Profile/profile-selectors";
import { ErrorSnackbar } from '../../../components/ErrorSnackBar/ErrorSnackbar';


export const CardList = () => {
    const dispatch = useAppDispatch();
    const params = useParams()
    const model = CardModel()
    const ownerPack = useAppSelector(ownerOfPackSelector)
    const cardError = useAppSelector(cardErrorSelector)
    const cardsListIsLoading = useAppSelector(cardsListIsLoadingSelector)
    useEffect(() => {
        dispatch(setCards(params.id))
        console.log(ownerPack);

    }, [])

    const sendRequest = () => {
        dispatch(addNewCard(params.id))
    }

    return (


        cardsListIsLoading ? <div className={styles.loading}><CircularProgress /></div> :
            model.rows.length != 0 ?

                <div className={styles.wholeForm}>
                    <BackToPackLink />
                    <div className={styles.headerContainer}>

                        <h3>{ownerPack}</h3>
                        {model.myPack ? <GeneralButton onClick={sendRequest}>Add new Card</GeneralButton> :
                            <GeneralButton onClick={() => { }}>Learn to pack</GeneralButton>}



                    </div>
                    <div className={styles.inputContainerCard}>
                        <InputSearch />
                    </div>
                    <MainTable model={model} />
                    {cardError != null && <ErrorSnackbar error={cardError} changeError={setCardsError}/>}
                </div>
                : <div className={styles.wholeForm}>
                    <BackToPackLink />
                    <h3 className={styles.ownerName}>{ownerPack}</h3>
                    <EmptyPack />
                    {cardError != null && <ErrorSnackbar error={cardError} changeError={setCardsError}/>}
                </div>


    );
};

