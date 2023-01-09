import React from 'react';
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import {useAppSelector} from "../../app/store";

type PasswordInputType = {
    handleChange: any
    name: string
    placeHolder: string
    inputValue: string
}

export const PasswordInput = (props: PasswordInputType) => {
    const {name, placeHolder, handleChange, inputValue} = props
    const [showPassword, setShowPassword] = React.useState(false);
    const isInProgress = useAppSelector(state => state.login.isInProgress)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    return (
        <FormControl sx={{width: "347px"}} variant="standard">
            <InputLabel htmlFor={name}>{placeHolder}</InputLabel>
            <Input
                disabled={isInProgress}
                id={name}
                name={name}
                onChange={handleChange}
                value={inputValue}
                type={showPassword ? "text" : "password"}

                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />

        </FormControl>
    );
};

