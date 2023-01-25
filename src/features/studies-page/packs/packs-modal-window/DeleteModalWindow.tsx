import React from 'react';
import styles from "./cards-modal-window.module.css";
import {GeneralButton} from "../../../../common/utils/style-for-mui/style-for-mui";

type ModalType = {
    setShowModal: (v: boolean) => void
    currentName?: string
    submitDelete: () => void
}

export const DeleteModalWindow = (props: ModalType) => {

    const {setShowModal, currentName, submitDelete} = props

    return (
        <div className={styles.contentChildren}>
            <p>Do you really want to remove <b>{currentName}</b>?
                All cards will be deleted.</p>
            <div className={styles.buttonsBlock}>
                <GeneralButton value={'white'} onClick={() => setShowModal(false)}>
                    Cancel
                </GeneralButton>
                <GeneralButton value={'red'} onClick={submitDelete}>
                    Delete
                </GeneralButton>
            </div>
        </div>
    )
}