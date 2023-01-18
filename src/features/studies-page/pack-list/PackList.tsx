import React, {useEffect} from 'react';
import {MainTable} from '../../../components/MainTable/MainTable';
import {useAppDispatch, useAppSelector} from "../../../app/store";

import {setPacksCards,setError,addNewPacksCards, setPageCountPack, setPagePack, setSearchPack} from "./pack-slice";
import {PackModel} from "./PackModel";
import styles from '../studies-page.module.css'
import {GeneralButton} from "../../../utils/StyleForMUI/StyleForMUI";
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {SliderCountCards} from "../../../components/SliderCountCards/SliderCountCards";
import {CircularProgress} from "@mui/material";
import { ErrorSnackbar } from '../../../components/ErrorSnackBar/ErrorSnackbar';
import {BasicButtonGroup} from "../../../components/ButtonGroup/ButtonGroup";
import {ResetFilter} from "../../../components/ResetFilter/ResetFilter";
import {
    cardsCountSelector,
    isMyPackSelector, packErrorSelector, packListIsLoadingSelector,
    pageCountPackSelector,
    pagePackSelector,
    searchPackSelector,
    sortPacksSelector,
    totalCountPackSelector
} from "./pack-selectors";
import {useSearchParams} from 'react-router-dom';


export const PackList = () => {

    const isLoading = useAppSelector(packListIsLoadingSelector)
    const search = useAppSelector(searchPackSelector)
    const page = useAppSelector(pagePackSelector)
    const pageCount = useAppSelector(pageCountPackSelector)
    const isMyPack = useAppSelector(isMyPackSelector)
    const cardsCount = useAppSelector(cardsCountSelector)
    const sort = useAppSelector(sortPacksSelector)
    const packError = useAppSelector(packErrorSelector)

    let [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch();
    const model = PackModel()

    useEffect(() => {
        dispatch(setPacksCards())
    }, [search, page, pageCount, isMyPack, cardsCount, sort])



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
            {isLoading ? <CircularProgress/> :
                <MainTable model={model} pagination={{
                    pageSelector: pagePackSelector,
                    setPage: setPagePack,
                    totalCountSelector: totalCountPackSelector,
                    pageCountSelector: pageCountPackSelector,
                    setCountPage: setPageCountPack
                }}
                />}

            {packError != null && <ErrorSnackbar error={packError} changeError={setError}/>}
        </div>
    )
};



