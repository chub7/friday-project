import {useAppDispatch, useAppSelector} from "../../../../../app/store";
import {parseData} from "../../../../../common/utils/data-parse/parse-data";
import {getMyIdSelector} from "../../../../profile/profile-selectors";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteCard, updateNameCard} from "../../cards-slice";
import {cardsSelector, packUserIdSelector, sortCardsSelector} from "../../cards-selectors";
import {ButtonSort} from "../../../../../common/components/button-sort/ButtonSort";
import {setSortCard} from "../../cards-slice";
import {GradeRow} from "./grade-row/GradeRow";
import {ModalWindow} from "../../../../../common/modal-window/ModalWindow";
import {ModalWindowForPack} from "../../../packs/packs-modal-window/ModalWindowForPack";
import React from "react";
import {ButtonRowCrudCard} from "./button-row-crud/ButtonRowCrudCard";

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

    let rows = dataTable.map(pack => createData(
        pack.question,
        pack.answer,
        parseData(pack.updated),
        <GradeRow grade={pack.grade}/>,
        pack.user_id === myId && <ButtonRowCrudCard pack={pack} />
    ))

    const key = rows.length !== 0 ? Object.keys(rows[0]) : [] // ключи для таблицы
    const myPack = packUserId === myId //моя колода или нет

    return {tableFieldName, rows, key, myPack}
}