import React, {useEffect, useState} from 'react';
import {MainTable} from '../../../components/table/MainTable';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setPacksCards} from "./pack-slice";
import {PackModel} from "./PackModel";
import styles from '../studies-page.module.css'
import {GeneralButton} from "../../../utils/StyleForMUI/StyleForMUI";
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {SliderOfCountCards} from "../../../components/Slider/SliderOfCountCards";
import {CircularProgress} from "@mui/material";
import {
    isMyPackSelector, maxCountCards, minCountCards,
    packListIsLoadingSelector,
    pageCountSelector,
    pagePackSelector,
    searchPackSelector
} from "../studies-selectors";
import {PaginationRounded} from "../../../components/Pagiatinon/Pagination";
import {BasicButtonGroup} from "../../../components/ButtonGroup/ButtonGroup";
import {ResetFilter} from "../../../components/ResetFilter/ResetFilter";


export const PackList = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(packListIsLoadingSelector)
    const search = useAppSelector(searchPackSelector)
    const page = useAppSelector(pagePackSelector)
    const pageCount = useAppSelector(pageCountSelector)
    const isMyPack = useAppSelector(isMyPackSelector)
    const min = useAppSelector(minCountCards)
    const max = useAppSelector(maxCountCards)

    const model = PackModel()

    useEffect(() => {
        dispatch(setPacksCards())
    }, [search, page, pageCount, isMyPack,min,max])


    return (
        <div className={styles.wholeForm}>
            <div className={styles.headerContainer}>
                <h3>Pack List</h3>
                <GeneralButton>Add new pack</GeneralButton>
            </div>
            <div className={styles.tool}>
                <div className={styles.inputContainerPack}>
                    <InputSearch/>
                </div>
                <BasicButtonGroup/>
                <SliderOfCountCards/>
                <ResetFilter/>
            </div>
            {isLoading ? <CircularProgress/> : <MainTable model={model}/>}
            <PaginationRounded/>
        </div>
    )
};



