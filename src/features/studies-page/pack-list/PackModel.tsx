import {useAppDispatch, useAppSelector} from "../../../app/store";
import {parseData} from "../../../utils/data-parse/parse-data";
import {getMyIdSelector} from "../../Profile/profile-selectors";
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import {NavLink} from "react-router-dom";
import styles from '../studies-page.module.css'
import {changeNamePacksCards, deletePacksCards, setCurrentOwnerOfPack, setSortPack} from "./pack-slice";
import {packsCardsSelector, sortPacksSelector} from "./pack-selectors";
import {ButtonSort} from "../../../components/ButtonSort/ButtonSort";
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
        <ButtonRowCrud userId={pack.user_id} packId={pack._id} packCardsCount={pack.cardsCount}/>))


    const key = rows.length !== 0 ? Object.keys(rows[0]) : []

    return {tableFieldName, rows, key}
}







