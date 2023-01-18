import React, {useEffect} from 'react';
import {MainTable} from '../../../components/MainTable/MainTable';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setPacksCards, setPageCountPack, setPagePack, setSearchPack} from "./pack-slice";
import {PackModel} from "./PackModel";
import styles from '../studies-page.module.css'
import {GeneralButton} from "../../../utils/StyleForMUI/StyleForMUI";
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {SliderCountCards} from "../../../components/SliderCountCards/SliderCountCards";
import {CircularProgress} from "@mui/material";
import {BasicButtonGroup} from "../../../components/ButtonGroup/ButtonGroup";
import {ResetFilter} from "../../../components/ResetFilter/ResetFilter";
import {
    cardsCountSelector,
    isMyPackSelector,
    packListIsLoadingSelector,
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

    let [searchParams, setSearchParams] = useSearchParams();

    const model = PackModel()

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPacksCards())
    }, [search, page, pageCount, isMyPack, cardsCount, sort])

    /* const  handleSearch=()=>{
         setSearchParams(`page=${page}&pageCount=${pageCount}&packName=${search}&user_id=${isMyPack}&min=7&max=110&sortPacks=${sort}`)

     }*/

    return (
        <div className={styles.wholeForm}>
            <div className={styles.headerContainer}>
                <h3>Pack List</h3>
                <GeneralButton>Add new pack</GeneralButton>
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

        </div>
    )
};



