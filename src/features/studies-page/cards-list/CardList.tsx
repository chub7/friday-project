import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {MainTable} from "../../../components/MainTable/MainTable";
import {addNewCard, setCards, setCardsError, setPageCard, setPageCountCard, setSearchCard} from "./cards-slice";
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
    totalCountCardsSelector
} from "./cards-selectors";
import { ErrorSnackbar } from '../../../components/ErrorSnackBar/ErrorSnackbar';



export const CardList = () => {
    const ownerPack = useAppSelector(ownerOfPackSelector)
    const cardsListIsLoading = useAppSelector(cardsListIsLoadingSelector)
    const page = useAppSelector(pageCardSelector)
    const pageCount = useAppSelector(pageCountCardsSelector)
    const sort = useAppSelector(sortCardsSelector)
    const search = useAppSelector(searchCardsSelector)

    const dispatch = useAppDispatch();

    const params = useParams()
    const model = CardModel()


    const cardError = useAppSelector(cardErrorSelector)

    useEffect(() => {
        dispatch(setCards(params.id))
    }, [page, pageCount, sort, search])

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
                        <InputSearch searchSelector={searchCardsSelector} setSearch={setSearchCard}/>
                    </div>
                    <MainTable model={model} pagination={{
                        pageSelector: pageCardSelector,
                        setPage: setPageCard,
                        totalCountSelector: totalCountCardsSelector,
                        pageCountSelector: pageCountCardsSelector,
                        setCountPage: setPageCountCard
                    }}/>
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

