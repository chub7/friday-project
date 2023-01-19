import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {MainTable} from "../../../components/MainTable/MainTable";
import {
    addNewCard,
    setCards,
    setCardsError,
    setPageCard,
    setPageCountCard,
    setSearchCard,
    setSuccessStatusForSnackBar
} from "./cards-slice";
import {CardModel} from "./CardModel";
import styles from '../studies-page.module.css'
import {BackToPackLink} from "../../../components/BackLink/BackToPackLink";
import {GeneralButton} from '../../../utils/StyleForMUI/StyleForMUI';
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {useParams} from "react-router-dom";
import {EmptyPack} from "./empty-pack-cards/empty-pack";
import {CircularProgress} from "@mui/material";
import {ownerOfPackSelector,} from "../pack-list/pack-selectors";
import {
    cardErrorSelector,
    cardsListIsLoadingSelector,
    pageCardSelector,
    pageCountCardsSelector, searchCardsSelector,
    sortCardsSelector,
    successStatusForSnackBarSelector,
    totalCountCardsSelector
} from "./cards-selectors";
import {UniversalSnackbar} from '../../../components/SnackBar/Snackbar';


export const CardList = () => {
    const namePack = useAppSelector(ownerOfPackSelector)
    const cardsListIsLoading = useAppSelector(cardsListIsLoadingSelector)
    const page = useAppSelector(pageCardSelector)
    const pageCount = useAppSelector(pageCountCardsSelector)
    const sort = useAppSelector(sortCardsSelector)
    const search = useAppSelector(searchCardsSelector)
    const successForSnackBar = useAppSelector(successStatusForSnackBarSelector)
    const cardError = useAppSelector(cardErrorSelector)

    const dispatch = useAppDispatch();
    const params = useParams()
    const model = CardModel()

    const open = cardError !== null || !!successForSnackBar

    useEffect(() => {
        dispatch(setCards(params.id))
    }, [page, pageCount, sort, search])

    useEffect(()=>{
        return ()=>{dispatch(setSearchCard({value:''}))}
    },[])

    return (
        cardsListIsLoading ?   <div className={styles.loading}><CircularProgress/></div>:
            model.rows.length != 0 || !!search ?
                <CardsTable/>
                : 
                <div className={styles.wholeForm}>
                    <EmptyPack namePack={namePack}
                               error={cardError}
                               success={successForSnackBar}
                               open={open}
                /></div>

    );
};






export const CardsTable = ()=>{
    const namePack = useAppSelector(ownerOfPackSelector)
    const model = CardModel()
    const dispatch = useAppDispatch();
    const params = useParams()
    const successForSnackBar = useAppSelector(successStatusForSnackBarSelector)
    const cardError = useAppSelector(cardErrorSelector)
    const open = cardError !== null || !!successForSnackBar

  
    const sendRequest = () => {
        dispatch(addNewCard(params.id))
    }
    return (
        <div className={styles.wholeForm}>
                    <BackToPackLink/>
                    <div className={styles.headerContainer}>
                        <h3>{namePack}</h3>
                        {model.myPack ?
                            <GeneralButton onClick={sendRequest}>Add new Card</GeneralButton> :
                            <GeneralButton onClick={() => {
                            }}>Learn to pack</GeneralButton>}
                    </div>
                    <div className={styles.inputContainerCard}>
                        <InputSearch searchSelector={searchCardsSelector} setSearch={setSearchCard}/>
                    </div>

                    <MainTable model={model} pagination={{
                        pageSelector: pageCardSelector,
                        setPage: setPageCard,
                        totalCountSelector: totalCountCardsSelector,
                        pageCountSelector: pageCountCardsSelector,
                        setCountPage: setPageCountCard
                    }}/>
                    {open && <UniversalSnackbar error={cardError} changeError={setCardsError} success={successForSnackBar}
                                           changeSuccess={setSuccessStatusForSnackBar}/>}
                </div>
    )
}