import IconButton from "@mui/material/IconButton";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import styles from "./profile.module.css";
import { ChangeEvent, useState } from "react";
import { changeProfileAvatarThunk } from "./profile-slice";
import { useAppDispatch } from "../../app/store";

export const ProfileAvatar = () =>{

    const dispatch = useAppDispatch();
    
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeProfileAvatarThunk(file64))
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }


    const convertFileToBase64 = (
        file: File,
        callBack: (value: string) => void
    ) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }


    return(
        <div className={styles.buttonPhoto}>
        <label>
                <input type="file"
                    onChange={uploadHandler}
                    style={{ display: 'none' }}
                />
                <IconButton component="span">
                    <LocalSeeOutlinedIcon className={styles.photoIcon} />
                </IconButton>
            </label>
        </div>
    ) 
}