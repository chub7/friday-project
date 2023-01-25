import React, {FC, useState} from 'react';
import TextField from "@mui/material/TextField";
import styles from './modal-window-cards.module.css'
import {GeneralButton} from "../../../../common/utils/style-for-mui/style-for-mui";
import {addNewCard, updateNameCard} from "../cards-slice";
import {useAppDispatch} from "../../../../app/store";
import {useParams} from "react-router-dom";

type ModalCardType = {
    setShowModal: (value: boolean) => void
    questionValue?: string
    answerValue?: string
    submitSave: (question: string, answer: string) => void

}
export const ModalWindowForCards: FC<ModalCardType> = ({
                                                           setShowModal,
                                                           questionValue,
                                                           answerValue,
                                                           submitSave
                                                       }) => {

    const [question, setQuestion] = useState(questionValue ? questionValue : '')
    const [answer, setAnswer] = useState(answerValue ? answerValue : '')
    const [errorQuestion, setErrorQuestion] = useState('')
    const [errorAnswer, setErrorAnswer] = useState('')

    const error=question.length === 0||answer.length===0

    const handleInputValue = (event: string, setInput: (value: string) => void, setError: (value: string) => void) => {
        if (!event.trim()) {
            setError("required field");
        } else {
            setError("");
            setInput(event);
        }
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    const handleAddCard = () => {
        if (!error) {
            submitSave(question, answer)
            setShowModal(false)
        }
    }

    return (

        <div className={styles.childrenContainer}>
            <TextField
                id="standard-helperText"
                label="Question"
                placeholder="Enter question"
                helperText={errorQuestion ? errorQuestion : ""}
                variant="standard"
                value={question}
                onChange={(event) => handleInputValue(event.target.value, setQuestion, setErrorQuestion)}/>

            <TextField
                id="standard-helperText"
                label="Answer"
                placeholder="Enter answer"
                helperText={errorAnswer ? errorAnswer : ""}
                variant="standard"
                value={answer}
                onChange={(event) => handleInputValue(event.target.value, setAnswer, setErrorAnswer)}

            />

            <div className={styles.buttonsBlock}>
                <GeneralButton value={'white'} onClick={handleCloseModal}>
                    Cancel
                </GeneralButton>
                <GeneralButton value={'blue'} onClick={handleAddCard} disabled={error}>
                    Save
                </GeneralButton>
            </div>
        </div>


    );
};

