import {useAppSelector} from "../../../../app/store"
import {BackToPackLink} from "../../../../common/components/back-link/BackToPackLink"
import {InputSearch} from "../../../../common/components/input-search/InputSearch"
import {MainTable} from "../../../../common/components/main-table/MainTable"
import {UniversalSnackbar} from "../../../../common/components/snack-bar/Snackbar"
import {CardModel} from "./card-model/CardModel"
import {
    cardErrorSelector,
    pageCardSelector,
    pageCountCardsSelector,
    searchCardsSelector,
    successStatusForSnackBarSelector,
    totalCountCardsSelector
} from "../cards-selectors"
import {setCardsError, setPageCard, setPageCountCard, setSearchCard, setSuccessStatusForSnackBar} from "../cards-slice"
import {TableTitleCard} from "./table-title-card/TableTitleCard"
import styles from '../../studies-page.module.css'
import React from "react";

export const CardsList = () => {
    const model = CardModel()
    const successForSnackBar = useAppSelector(successStatusForSnackBarSelector)
    const cardError = useAppSelector(cardErrorSelector)
    const open = cardError !== null || !!successForSnackBar

    return (
        <div className={styles.wholeForm}>
            <BackToPackLink />
            <TableTitleCard />
            <div className={styles.inputContainerCard}>
                <InputSearch searchSelector={searchCardsSelector} setSearch={setSearchCard} />
            </div>
            <MainTable model={model} pagination={{
                pageSelector: pageCardSelector,
                setPage: setPageCard,
                totalCountSelector: totalCountCardsSelector,
                pageCountSelector: pageCountCardsSelector,
                setCountPage: setPageCountCard
            }} />
            {open && <UniversalSnackbar error={cardError} changeError={setCardsError} success={successForSnackBar}
                changeSuccess={setSuccessStatusForSnackBar} />}
        </div>
    )
}
