import {useAppDispatch, useAppSelector} from "../../../app/store";
import {parseData} from "../../../utils/data-parse/parse-data";
import {getMyIdSelector} from "../../Profile/profile-selectors";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCard, updateNameCard } from "./cards-slice";
import {cardsSelector, packUserIdSelector, sortCardsSelector} from "./cards-selectors";
import {ButtonSort} from "../../../components/ButtonSort/ButtonSort";
import {setSortCard} from "./cards-slice";
import {GradeRow} from "../../../components/GradeRow/GradeRow";

function createData(question: string, answer: string, updated: string, grade: any, myProfile: any) {
    return {question, answer, updated, grade, myProfile};
}


export const CardModel = () => {
    let tableFieldName = [`Question`, `Answer`, <ButtonSort header={'Last Update'}
                                                            sortSelector={sortCardsSelector}
                                                            setSort={setSortCard}/>, `Grade`, ``]
    const dataTable = useAppSelector(cardsSelector)
    const myId = useAppSelector(getMyIdSelector)
    const packUserId = useAppSelector(packUserIdSelector)
    const dispatch = useAppDispatch();

    let rows = dataTable.map(pack => createData(
        pack.question,
        pack.answer,
        parseData(pack.updated),
        <GradeRow grade={pack.grade}/>,
        pack.user_id === myId &&
        <div>
            <IconButton onClick={()=>{dispatch(updateNameCard(pack._id, pack.cardsPack_id))}}> <EditIcon/></IconButton>
            <IconButton onClick={()=>{dispatch(deleteCard(pack._id, pack.cardsPack_id))}}> <DeleteIcon/></IconButton>
        </div>
    ))

    const key = rows.length != 0 ? Object.keys(rows[0]) : [] // ключи для таблицы
    const myPack = packUserId === myId //моя колода или нет

    return {tableFieldName, rows, key, myPack}
}