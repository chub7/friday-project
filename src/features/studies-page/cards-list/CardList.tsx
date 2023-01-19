import { useAppSelector } from "../../../app/store"
import { BackToPackLink } from "../../../components/BackLink/BackToPackLink"
import { InputSearch } from "../../../components/InputSearch/InputSearch"
import { MainTable } from "../../../components/MainTable/MainTable"
import { UniversalSnackbar } from "../../../components/SnackBar/Snackbar"
import { CardModel } from "./CardModel"
import { cardErrorSelector, pageCardSelector, pageCountCardsSelector, searchCardsSelector, successStatusForSnackBarSelector, totalCountCardsSelector } from "./cards-selectors"
import { setCardsError, setPageCard, setPageCountCard, setSearchCard, setSuccessStatusForSnackBar } from "./cards-slice"
import { TableTitleCard } from "./TableTitleCard"
import styles from '../studies-page.module.css'

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
