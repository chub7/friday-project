import React, {FC, useState} from 'react';
import TextField from "@mui/material/TextField";
import styles from './modal-window-cards.module.css'
import {GeneralButton} from "../../utils/style-for-mui/style-for-mui";

import {ModalType, ModalWindow} from "../main-modal-window/ModalWindow";
import {SelectFormat} from "../../components/select/Select";
import {UploadImage} from "../../components/upload-img/UploadImage";


type ModalCardType = ModalType & {
    questionValue?: string
    answerValue?: string
    submitSave: (question: string, answer: string, answerImg: string, questionImg: string) => void,

}
export const ModalWindowForCards: FC<ModalCardType> = ({
                                                           showModal,
                                                           setShowModal,
                                                           questionValue,
                                                           answerValue,
                                                           submitSave,
                                                           title
                                                       }) => {

    const [question, setQuestion] = useState(questionValue ? questionValue : '')
    const [answer, setAnswer] = useState(answerValue ? answerValue : '')

    const [questionImg, setQuestionImg] = useState('')
    const [answerImg, setAnswerImg] = useState('')
    const [errorQuestion, setErrorQuestion] = useState('')
    const [errorAnswer, setErrorAnswer] = useState('')
    const [format, setFormat] = useState('text')

    const error = (question.length === 0 || answer.length === 0)&&(questionImg.length === 0 || answerImg.length === 0)

    const handleInputValue = (event: string, setInput: (value: string) => void, setError: (value: string) => void) => {
        if (!event.trim()) {
            setError("required field");
            setInput(``);
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

            submitSave(question, answer, answerImg, questionImg)
            setShowModal(false)
        }
    }

    return (
        <ModalWindow setShowModal={setShowModal} showModal={showModal} title={title}>
            <div className={styles.childrenContainer}>

                <SelectFormat format={format} setFormat={setFormat}/>
                <p className={styles.header}>Question</p>

                {format === 'text'
                    ? <TextField
                        id="standard-helperText"
                        placeholder="Enter question"
                        helperText={errorQuestion ? errorQuestion : ""}
                        variant="standard"
                        value={question}
                        onChange={(event) => handleInputValue(event.target.value, setQuestion, setErrorQuestion)}/>
                    :
                    <UploadImage image={questionImg} setImage={setQuestionImg}/>
                }

                <p className={styles.header}>Answer</p>

                {format === 'text'
                    ? <TextField
                        id="standard-helperText"
                        placeholder="Enter answer"
                        helperText={errorAnswer ? errorAnswer : ""}
                        variant="standard"
                        value={answer}
                        onChange={(event) => handleInputValue(event.target.value, setAnswer, setErrorAnswer)}/>
                    : <UploadImage image={answerImg} setImage={setAnswerImg}/>}


                <div className={styles.buttonsBlock}>
                    <GeneralButton value={'white'} onClick={handleCloseModal}>
                        Cancel
                    </GeneralButton>
                    <GeneralButton value={'blue'} onClick={handleAddCard} disabled={error}>
                        Save
                    </GeneralButton>
                </div>
            </div>
        </ModalWindow>


    );
};

