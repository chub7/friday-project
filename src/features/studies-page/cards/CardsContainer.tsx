import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
    setCards,
    setSearchCard
} from "./cards-slice";
import { CardModel } from "./cards-list/card-model/CardModel";
import styles from '../studies-page.module.css'
import { useParams } from "react-router-dom";
import { EmptyPack } from "./empty-pack/EmptyPack";
import { CircularProgress } from "@mui/material";
import { ownerOfPackSelector, } from "../packs/packs-selectors";
import {
    cardsListIsLoadingSelector,
    pageCardSelector,
    pageCountCardsSelector, searchCardsSelector,
    sortCardsSelector,
} from "./cards-selectors";
import { CardsList } from './cards-list/CardList';


export const CardsContainer = () => {

    const dispatch = useAppDispatch();
    const model = CardModel()
    const params = useParams()
    const page = useAppSelector(pageCardSelector)
    const pageCount = useAppSelector(pageCountCardsSelector)
    const sort = useAppSelector(sortCardsSelector)
    const namePack = useAppSelector(ownerOfPackSelector)
    const cardsListIsLoading = useAppSelector(cardsListIsLoadingSelector)
    const search = useAppSelector(searchCardsSelector)

    useEffect(() => {
        dispatch(setCards(params.id))
    }, [page, pageCount, sort, search])

    useEffect(() => {
        return () => { dispatch(setSearchCard({ value: '' })) }
    }, [dispatch])

    if (cardsListIsLoading) {
        return <div className={styles.loading}><CircularProgress /></div>
    }

    return (
        model.rows.length !== 0 || !!search  ? <CardsList /> : <EmptyPack namePack={namePack} />
    );
};
