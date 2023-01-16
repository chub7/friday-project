import React, {useEffect, useState} from 'react';
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

import {cardListApi} from "./cards-list-api";



export const CardList = () => {
    const dispatch = useAppDispatch();
    const params = useParams()
    const model = CardModel(handleDelete)
    const ownerPack = useAppSelector(ownerOfPackSelector)
    const cardsListIsLoading = useAppSelector(cardsListIsLoadingSelector)

    useEffect(() => {
        dispatch(setCards(params.id))
    }, [])

    const sendRequest = () => {
        /* cardListApi.createCard().then((res) => {
             console.log(res)
         }).catch((e) => {
             console.log(e)
         })*/
    }

    function handleDelete(id: string) {

        cardListApi.deleteCard(id).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
    }

    console.log(model.myPack)
    return (
        cardsListIsLoading ? <div className={styles.loading}><CircularProgress/></div> :
            model.rows.length != 0 ?
                <div className={styles.wholeForm}>
                    <BackToPackLink/>
                    <div className={styles.headerContainer}>

                        <h3>{ownerPack}</h3>
                        <GeneralButton onClick={sendRequest}>Add new Card</GeneralButton>


                    </div>
                    <div className={styles.inputContainerCard}>
                     {/*   <InputSearch value={search} onChange={setSearch}/>*/}
                    </div>
                    <MainTable model={model}/>
                </div>
                : <div className={styles.wholeForm}>
                    <BackToPackLink/>
                    <h3 className={styles.ownerName}>{ownerPack}</h3>
                    <EmptyPack/>
                </div>

    );
};

