import {useAppSelector} from "../../../app/store";
import {cardsSelector} from "../studies-selectors";
import {parseData} from "../../../utils/data-parse/parse-data";
import {getProfileSelector} from "../../Profile/profile-selectors";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GradeIcon from '@mui/icons-material/Grade';

function createData(question: string, answer: string, updated: string, grade: any, myProfile: any) {
    return {question, answer, updated, grade, myProfile};
}


export const CardModel = (deleteCard:(id:string)=>void) => {
    let tableFieldName = [`Question`, `Answer`, `Last updated`, `Grade`, ``]
    const dataTable = useAppSelector(cardsSelector)
    console.log(dataTable)
    const {_id} = useAppSelector(getProfileSelector)

    let rows = dataTable.map(pack => createData(
        pack.question,
        pack.answer,
        parseData(pack.updated),
        <div>
            {new Array(5).fill(null).map((grade, index) => <GradeIcon key={index} sx={{color: (pack.grade > index ? '#FFC700' : '#DADADA')}}
            />)}
        </div>,
        pack.user_id === _id &&
        <div>
            <IconButton> <EditIcon/></IconButton>
            <IconButton onClick={()=>deleteCard(pack._id)}> <DeleteIcon/></IconButton>
        </div>
    ))

    const key = rows.length != 0 ? Object.keys(rows[0]) : [] // ключи для таблицы
    const myPack = (dataTable.length!=0)&&dataTable[0].user_id===_id //моя колода или нет

    return {tableFieldName, rows, key,myPack}
}