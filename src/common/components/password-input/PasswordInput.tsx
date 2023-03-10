import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import {TextField} from "@mui/material";

type PasswordInputType = {
    handleChange: any;
    name: string;
    placeHolder: string;
    inputValue: string;
    touched: boolean | undefined;
    error: string | undefined;
};

export const PasswordInput = (props: PasswordInputType) => {
    const {name, placeHolder, handleChange, inputValue, touched, error} = props;
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <FormControl sx={{width: "347px"}} variant="standard">
            <TextField
                variant="standard"
                id={name}
                name={name}
                label={placeHolder}
                type={show ? "text" : "password"}
                value={inputValue}
                onChange={handleChange}
                error={touched && !!error}
                helperText={touched && error}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleClick}>
                            {show ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    ),
                }}
            ></TextField>
        </FormControl>
    );
};
