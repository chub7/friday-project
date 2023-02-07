import IconButton from "@mui/material/IconButton";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import styles from "./profile.module.css";
import {ChangeEvent, useState} from "react";
import {changeProfileAvatarThunk} from "./profile-slice";
import {useAppDispatch} from "../../app/store";
import {convertFileToBase64} from "../../common/utils/convert-file/convert-file";

export const ProfileAvatar = () => {

    const dispatch = useAppDispatch();

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 100000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeProfileAvatarThunk(file64))
                })
            } else {
                alert( 'Файл слишком большого размера')
            }
        }
    }


    return (
        <div className={styles.buttonPhoto}>
            <label>
                <input type="file"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
                <IconButton component="span">
                    <LocalSeeOutlinedIcon className={styles.photoIcon}/>
                </IconButton>
            </label>
        </div>
    )
}