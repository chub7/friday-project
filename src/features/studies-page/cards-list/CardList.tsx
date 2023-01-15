import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {MainTable} from "../../../components/table/MainTable";
import {setCards} from "./cards-slice";
import {CardModel} from "./CardModel";
import styles from '../studies-page.module.css'
import {BackToPackLink} from "../../../components/BackLink/BackToPackLink";
import {GeneralButton} from '../../../utils/StyleForMUI/StyleForMUI';
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {useParams} from "react-router-dom";
import {EmptyPack} from "./empty-pack-cards/empty-pack";
import {cardsListIsLoadingSelector, ownerOfPackSelector} from "../studies-selectors";
import {CircularProgress} from "@mui/material";


export const CardList = () => {
    const dispatch = useAppDispatch();
    const params = useParams()
    const model = CardModel()
    const ownerPack = useAppSelector(ownerOfPackSelector)
    const cardsListIsLoading = useAppSelector(cardsListIsLoadingSelector)
    useEffect(() => {
        dispatch(setCards(params.id))
    }, [])

    return (
        cardsListIsLoading? <div className={styles.loading}><CircularProgress/></div> :
        model.rows.length!=0?
        <div className={styles.wholeForm}>
            <BackToPackLink/>
            <div className={styles.headerContainer}>
                <h3>{ownerPack}</h3>
                <GeneralButton>Add new Card</GeneralButton>
            </div>
            <div className={styles.inputContainer}>
                <InputSearch/>
            </div>
            <MainTable model={model}/>
        </div>
            :<div className={styles.wholeForm}>
                <BackToPackLink/>
                <h3 className={styles.ownerName}>{ownerPack}</h3>
                <EmptyPack />
            </div>

    );
};

