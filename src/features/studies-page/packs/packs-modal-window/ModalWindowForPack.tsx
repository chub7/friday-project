import React, {ChangeEvent, useState} from "react";
import styles from "./cards-modal-window.module.css";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {GeneralButton} from "../../../../common/utils/style-for-mui/style-for-mui";

export const ModalWindowForPack = (props: ModalType) => {

    const {setShowModal, currentName, submitSave} = props
    const [inputValue, setInputValue] = useState(``)
    const [checkBoxValue, setCheckBoxValue] = useState(false)
    const [error, setError] = useState<string>("");

    const handleInputValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!event.currentTarget.value.trim()) {
            setError("required field");
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
                                                 onChange={(event) => setCheckBoxValue(event.target.checked)}/>
                              } label="Private pack"
            />
            <div className={styles.buttonsBlock}>
                <GeneralButton value={'white'} sx={{width: '127px'}}
                               onClick={handleOnClose}>
                    Cancel
                </GeneralButton>
                <GeneralButton value={'blue'} sx={{width: '127px'}}
                               onClick={handleOnSubmit}
                               disabled={!!error || inputValue.length < 0}> Save
                </GeneralButton>
            </div>
        </div>
    )
}

type ModalType = {
    setShowModal: (v: boolean) => void
    currentName?: string
    submitSave: any //(inputValue:string, checkBoxValue:boolean) => void
}
