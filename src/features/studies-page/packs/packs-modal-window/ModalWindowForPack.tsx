import React, {ChangeEvent, useState} from "react";
import styles from "./cards-modal-window.module.css";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {GeneralButton} from "../../../../common/utils/style-for-mui/style-for-mui";
import {ModalType, ModalWindow} from "../../../../common/modal-window/ModalWindow";

type ModalPackType = ModalType & {
    currentName?: string
    submitSave: (inputValue: string, checkBoxValue: boolean) => void

}

export const ModalWindowForPack = (props: ModalPackType) => {

    const {showModal, setShowModal, currentName, submitSave, title} = props
    const [inputValue, setInputValue] = useState(currentName ? currentName : '')
    const [checkBoxValue, setCheckBoxValue] = useState(false)
    const [error, setError] = useState<string>("");

    const handleInputValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!event.currentTarget.value.trim()) {
            setError("required field");
            setInputValue(``);
        } else {
            setError("");
            setInputValue(event.currentTarget.value);
        }
    }

    const handleOnClose = () => {
        setShowModal(false)
    }

    const handleOnSubmit = () => {
        if (inputValue.length > 0) {
            submitSave(inputValue, checkBoxValue)
            setShowModal(false)
        }
        setError("Enter name pack");
    }

    return (
        <ModalWindow setShowModal={setShowModal} showModal={showModal} title={title}>
            <div className={styles.contentChildren}>
                <TextField
                    id="standard-helperText"
                    label="Name pack"
                    placeholder="Enter pack name"
                    helperText={error ? error : ""}
                    variant="standard"
                    value={inputValue}
                    onChange={handleInputValue}
                    defaultValue="Default Value"
                    sx={{fontFamily: 'Montserrat'}}
                />
                <FormControlLabel className={styles.input}
                                  control={<Checkbox defaultChecked={checkBoxValue} sx={{fontFamily: 'Montserrat'}}
                                                     onChange={(event) => setCheckBoxValue(event.target.checked)}/>}
                                  label="Private pack"
                />
                <div className={styles.buttonsBlock}>
                    <GeneralButton value={'white'} onClick={handleOnClose}>
                        Cancel
                    </GeneralButton>
                    <GeneralButton value={'blue'} onClick={handleOnSubmit} disabled={!!error || inputValue.length < 0}>
                        Save
                    </GeneralButton>
                </div>
            </div>
        </ModalWindow>
    )
}
