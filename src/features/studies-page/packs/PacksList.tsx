import React, {useEffect} from 'react';
import {MainTable} from '../../../common/components/main-table/MainTable';
import {useAppDispatch, useAppSelector} from "../../../app/store";

import {
    addNewPacksCards,
    setError,
    setPacksCards,
    setPageCountPack,
    setPagePack,
    setSearchPack,
    setSuccessStatusForSnackBar
} from "./packs-slice";
import {PackModel} from "./pack-model/PackModel";
import styles from '../studies-page.module.css'
import {GeneralButton} from "../../../common/utils/style-for-mui/style-for-mui";
import {InputSearch} from "../../../common/components/input-search/InputSearch";
import {SliderCountCards} from "./slider-count-cards/SliderCountCards";
import {CircularProgress} from "@mui/material";
import {UniversalSnackbar} from '../../../common/components/snack-bar/Snackbar';
import {BasicButtonGroup} from "./button-sort-by-own/ButtonSortByOwn";
import {ResetFilter} from "./reset-filter/ResetFilter";
import {
    cardsCountSelector,
    isMyPackSelector,
    packErrorSelector,
    packListIsLoadingSelector,
    pageCountPackSelector,
    pagePackSelector,
    searchPackSelector,
    sortPacksSelector,
    successStatusForSnackBarSelector,
    totalCountPackSelector
} from "./packs-selectors";
import {setSearchCard} from "../cards/cards-slice";


export const PacksList = () => {
    const isLoading = useAppSelector(packListIsLoadingSelector)
    const search = useAppSelector(searchPackSelector)
    const page = useAppSelector(pagePackSelector)
    const pageCount = useAppSelector(pageCountPackSelector)
    const isMyPack = useAppSelector(isMyPackSelector)
    const cardsCount = useAppSelector(cardsCountSelector)
    const sort = useAppSelector(sortPacksSelector)
    const packError = useAppSelector(packErrorSelector)
    const successForSnackBar = useAppSelector(successStatusForSnackBarSelector)



    const dispatch = useAppDispatch();
    const model = PackModel()
    const open = packError !== null || !!successForSnackBar

    useEffect(() => {
        dispatch(setPacksCards())
    }, [search, page, pageCount, isMyPack, cardsCount, sort])

    useEffect(() => {
        return () => {dispatch(setSearchPack({ value: '' })) }
    }, [dispatch])

    return (
        <div className={styles.wholeForm}>
            <div className={styles.headerContainer}>
                <h3>Pack List</h3>
                <GeneralButton onClick={()=>{dispatch(addNewPacksCards())}}>Add new pack</GeneralButton>
            </div>
            <div className={styles.tool}>
                <div className={styles.inputContainerPack}>
                    <InputSearch searchSelector={searchPackSelector} setSearch={setSearchPack}/>
                </div>
                <BasicButtonGroup/>
                <SliderCountCards/>
                <ResetFilter/>
            </div>
            {isLoading ?<div className={styles.loading}> <CircularProgress/></div> :
                <MainTable model={model} pagination={{
                    pageSelector: pagePackSelector,
                    setPage: setPagePack,
                    totalCountSelector: totalCountPackSelector,
                    pageCountSelector: pageCountPackSelector,
                    setCountPage: setPageCountPack
                }}
                />}

            {open && <UniversalSnackbar error={packError} changeError={setError} success={successForSnackBar} changeSuccess={setSuccessStatusForSnackBar}/>}
        </div>
    )
};



