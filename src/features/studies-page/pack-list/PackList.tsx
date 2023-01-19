import React, {useEffect} from 'react';
import {MainTable} from '../../../components/MainTable/MainTable';
import {useAppDispatch, useAppSelector} from "../../../app/store";

import {
    setPacksCards,
    setError,
    addNewPacksCards,
    setPageCountPack,
    setPagePack,
    setSearchPack,
    setSuccessStatusForSnackBar
} from "./pack-slice";
import {PackModel} from "./PackModel";
import styles from '../studies-page.module.css'
import {GeneralButton} from "../../../utils/StyleForMUI/StyleForMUI";
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {SliderCountCards} from "../../../components/SliderCountCards/SliderCountCards";
import {CircularProgress} from "@mui/material";
import {UniversalSnackbar} from '../../../components/SnackBar/Snackbar';
import {BasicButtonGroup} from "../../../components/ButtonGroup/ButtonGroup";
import {ResetFilter} from "../../../components/ResetFilter/ResetFilter";
import {
    cardsCountSelector,
    isMyPackSelector, packErrorSelector, packListIsLoadingSelector,
    pageCountPackSelector,
    pagePackSelector,
    searchPackSelector,
    sortPacksSelector,
    successStatusForSnackBarSelector,
    totalCountPackSelector
} from "./pack-selectors";


export const PackList = () => {

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


    return (
        <div className={styles.wholeForm}>
            <div className={styles.headerContainer}>
                <h3>Pack List</h3>
                <GeneralButton onClick={() => {
                    dispatch(addNewPacksCards())
                }}>Add new pack</GeneralButton>
            </div>
            <div className={styles.tool}>
                <div className={styles.inputContainerPack}>
                    <InputSearch searchSelector={searchPackSelector} setSearch={setSearchPack}/>
                </div>
                <BasicButtonGroup/>
                <SliderCountCards/>
                <ResetFilter/>
            </div>
            {isLoading ?
                <div className={styles.loading}><CircularProgress/></div> :
                <MainTable model={model} pagination={{
                    pageSelector: pagePackSelector,
                    setPage: setPagePack,
                    totalCountSelector: totalCountPackSelector,
                    pageCountSelector: pageCountPackSelector,
                    setCountPage: setPageCountPack
                }}/>}

            {open && <UniversalSnackbar error={packError} changeError={setError} success={successForSnackBar}
                                        changeSuccess={setSuccessStatusForSnackBar}/>}
        </div>
    )
};


