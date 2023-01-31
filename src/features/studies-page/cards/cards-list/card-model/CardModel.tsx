import {useAppSelector} from "../../../../../app/store";
import {parseData} from "../../../../../common/utils/data-parse/parse-data";
import {getMyIdSelector} from "../../../../profile/profile-selectors";
import {cardsSelector, packUserIdSelector, sortCardsSelector} from "../../cards-selectors";
import {ButtonSort} from "../../../../../common/components/button-sort/ButtonSort";
import {setSortCard} from "../../cards-slice";
import {GradeRow} from "./grade-row/GradeRow";
import React from "react";
import styles from '../../../studies-page.module.css'
import {ButtonRowCrudCard} from "./button-row-crud/ButtonRowCrudCard";

function createData(question: any, answer: any, updated: string, grade: any, myProfile: any) {
    return {question, answer, updated, grade, myProfile};
}


export const CardModel = () => {
    let tableFieldName = [`Question`, `Answer`, <ButtonSort header={'Last Update'}
                                                            sortSelector={sortCardsSelector}
                                                            setSort={setSortCard}/>, `Grade`, ``]
    const dataTable = useAppSelector(cardsSelector)
    const myId = useAppSelector(getMyIdSelector)
    const packUserId = useAppSelector(packUserIdSelector)

    const formatCompare = (text: string, image: string) => {

        if (text === 'no question' || text === 'no answer') {
            return <img className={styles.imageForCard} src={image}/>
        } else {
            return text
        }

    }

    let rows = dataTable.map(pack => createData(
        formatCompare(pack.question, pack.questionImg),
        formatCompare(pack.answer, pack.answerImg),
        parseData(pack.updated),
        <GradeRow grade={pack.grade}/>,
        pack.user_id === myId && <ButtonRowCrudCard pack={pack}/>
    ))

    const key = rows.length !== 0 ? Object.keys(rows[0]) : [] // ключи для таблицы
    const myPack = packUserId === myId //моя колода или нет

    return {tableFieldName, rows, key, myPack}
}