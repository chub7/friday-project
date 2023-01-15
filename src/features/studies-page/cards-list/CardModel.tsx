import {useAppSelector} from "../../../app/store";
import {cardsSelector} from "../studies-selectors";
import {parseData} from "../../../utils/data-parse/parse-data";
import {getProfileSelector} from "../../Profile/profile-selectors";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useParams} from "react-router-dom";

function createData(question: string, answer: string, updated: string, grade: any, myProfile: any) {
    return {question, answer, updated, grade, myProfile};
}

export const CardModel = () => {
    let tableFieldName = [`Question`, `Answer`, `Last updated`, `Grade`, ``]
    const dataTable = useAppSelector(cardsSelector)
    const {_id} = useAppSelector(getProfileSelector)


    let rows = dataTable.map(pack => createData(
        pack.question,
        pack.answer,
        parseData(pack.updated),
        pack.grade,
        pack.user_id === _id &&
        <div>
            <IconButton> <EditIcon/></IconButton>
            <IconButton> <DeleteIcon/></IconButton>
        </div>
    ))

    const key = rows.length != 0 ? Object.keys(rows[0]) : []

    return {tableFieldName, rows, key}
}