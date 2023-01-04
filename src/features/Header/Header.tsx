import React from 'react';
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <NavLink to={'/login'}>Home</NavLink>
            <NavLink to={'/register'}> Register</NavLink>
            <NavLink to={'/recoverypass'}> Forgot pass</NavLink>
            <NavLink to={'/profile'}> profile</NavLink>
            <NavLink to={'/newpass'}> NewPass</NavLink>
            <NavLink to={'/testovich'}> ShowBase</NavLink>
            <NavLink to={'/404'}> PageNotFound</NavLink>
        </div>
    );
};

