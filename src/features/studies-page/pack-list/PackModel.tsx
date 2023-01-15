import {useAppDispatch, useAppSelector} from "../../../app/store";
import {packsCardsSelector} from "../studies-selectors";
import {parseData} from "../../../utils/data-parse/parse-data";
import {getProfileSelector} from "../../Profile/profile-selectors";
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import {NavLink} from "react-router-dom";
import styles from '../studies-page.module.css'
import {setCurrentOwnerOfPack} from "./pack-slice";

export function createData(name?: any, cardsCount?: number, lastUpdated?: any, createdBy?: string, myProfile?: any,) {
    return {name, cardsCount, lastUpdated, createdBy, myProfile}
}

export const PackModel = () => {
    const tableFieldName = [`Name`, `Cards`, `Last updated`, `Created by`, `Actions`]
    const dispatch = useAppDispatch()
    const dataTable = useAppSelector(packsCardsSelector)
    const {_id} = useAppSelector(getProfileSelector)

    let rows = dataTable.map(pack => createData(
        <NavLink className={styles.link} onClick={()=>dispatch(setCurrentOwnerOfPack(pack.name))} to={`/cards-pack/${pack._id}`}>{pack.name}</NavLink>,
        pack.cardsCount,
        parseData(pack.updated),
        pack.user_name,
        (pack.user_id === _id) ?
            <div className={styles.linkContainer}>
                <NavLink to={`/learn`}>
                    <IconButton disabled={pack.cardsCount===0}><SchoolIcon/></IconButton>
                </NavLink>
                <IconButton> <EditIcon/></IconButton>
                <IconButton> <DeleteIcon/></IconButton>
            </div>
            : <NavLink to={`learn/`}>
                <IconButton disabled={pack.cardsCount===0}><SchoolIcon/></IconButton>
            </NavLink>))

    const key = rows.length != 0 ? Object.keys(rows[0]) : []

    return {tableFieldName, rows, key}
}
