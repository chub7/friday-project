import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {parseData} from "../../../../common/utils/data-parse/parse-data";


import {NavLink} from "react-router-dom";
import styles from '../../studies-page.module.css'
import { setCurrentOwnerOfPack, setSortPack} from "../packs-slice";
import {packsCardsSelector, sortPacksSelector} from "../packs-selectors";
import {ButtonSort} from "../../../../common/components/button-sort/ButtonSort";
import {ButtonRowCrud} from "./button-row-crud/ButtonRowCrud";

export function createData(name?: any, cardsCount?: number, lastUpdated?: any, createdBy?: string, myProfile?: any,) {
    return {name, cardsCount, lastUpdated, createdBy, myProfile}
}

export const PackModel = () => {

    const dispatch = useAppDispatch()

    const dataTable = useAppSelector(packsCardsSelector)

    const tableFieldName = [`Name`, `Cards`, <ButtonSort header={'Last Update'}
                                                         sortSelector={sortPacksSelector}
                                                         setSort={setSortPack}/>, `Created by`, `Actions`]

    let rows = dataTable.map((pack, index) => createData(
        <NavLink key={index} className={styles.link}
                 onClick={() => dispatch(setCurrentOwnerOfPack(pack.name))}
                 to={`/cards-pack/${pack._id}`}>{pack.name}</NavLink>,
        pack.cardsCount,
        parseData(pack.updated),
        pack.user_name,
        <ButtonRowCrud userId={pack.user_id} packId={pack._id} packCardsCount={pack.cardsCount} />))


    const key = rows.length !== 0 ? Object.keys(rows[0]) : []

    return {tableFieldName, rows, key}
}







