import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../Firebase';
import { signOut } from '@firebase/auth';
import { selectUserPhoto, setSignOutState } from '../App/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Model from './Model';
import logoPng from '../Images/instagram-title.png';
import searchSvg from '../Images/search.svg';
import homeSvg from '../Images/home-icon.svg';
import notificationSvg from '../Images/notification.svg';
import plusiconSvg from '../Images/plus-icon.svg';
import livestreamSvg from '../Images/livestream.svg';
import accountSvg from '../Images/account-blue.svg';
import signoutSvg from '../Images/sign-out.svg';


const Navbar = () => {
    const userPhoto = useSelector(selectUserPhoto);
    const [openState, setOpenState] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSignOut = async () => {
        await signOut(auth).then(() => {
            dispatch(setSignOutState());
            history.push('/');
        })
    }

    return (
        <>
            <Nav>
                <Navbrand src={logoPng} alt="instagram-title" />
                <Form><input type="text" name="search" placeholder="Search" aria-label="search-instagram-user" autoComplete="off" autoCorrect="on" /><i><img src={searchSvg} alt="search/icon" /></i></Form>
                <Menu>
                    <Link to="#"><img src={homeSvg} alt="home/icon" /></Link>
                    <Link to="#"><img src={livestreamSvg} alt="livestream/icon" /></Link>
                    <Link to="#" onClick={() => setOpenState(true)}><img src={plusiconSvg} alt="plus/icon" /></Link>
                    <Link to="#"><img src={notificationSvg} alt="notification/icon" /></Link>
                    <Link to="#"><img className="instaUser" src={userPhoto || accountSvg} alt="current/User" /></Link>
                    <Link to="#"><img className="instaUser" onClick={onSignOut} src={signoutSvg} alt="account/icon" /></Link>
                </Menu>
            </Nav>
            <Model openState={openState} setOpenState={setOpenState} />
        </>
    );
};
const Nav = styled.div`
    position: fixed;
    top: 2vh;
    left: 0;
    right: 0;
    opacity: 1;
    z-index: 2000;
    width: 69vw;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (max-width: 1200px){
        width: 95vw;
    }
`;
const Navbrand = styled.img`
    width: 125px;
    height: auto;
    object-fit: contain;

    @media screen and (max-width: 425px){
        width: 101px;
    }
`;
const Form = styled.form`
    display: flex;
    align-items: center;
    position: relative;
    @media screen and (max-width: 650px){
        display: none;
    }
    input{
        opacity: 1;
        width: 100%;
        height: 100%;
        z-index: 1500;
        outline: none;
        display: flex;
        align-items: flex-start;
        position: relative;
        font-size: 0.95rem;
        border-radius: 0.25rem;
        cursor: default;
        text-transform: uppercase;
        color: rgba(249,249,249,1);
        padding: 0.35rem 1.5rem 0.35rem 1rem;
        backdrop-filter: blur(0.1rem);
        border: 1px solid rgba(249,249,249,0.1);
        background: linear-gradient(rgba(99, 106, 150, 0.5) 0%, rgba(182, 186, 214, 0.5) 100%);    
    
        &::placeholder{
            color: rgba(249,249,249,0.7);
        }
    
        &:focus{    
            background: linear-gradient(rgba(24, 32, 79, 0.4) 0%, rgba(24, 32, 79, 0.25) 100%);
            box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px, rgb(47 184 255) 0px 0px 0px 1px inset;
        }
    }

    i{
        position: absolute;
        top: 0.5rem;
        right: 0.7vw;
        opacity: 1;
        z-index: 1500;
    }
`;
const Menu = styled.ul`
    display: flex;
    align-items: center;
    a{
        cursor: pointer;
        display: block;
        display: flex;
        align-items: center;
        text-decoration: none;
        margin-left: 0.5rem;

        img{
            width: 27px;
            height: 27px;
            opacity: 1;
            z-index: 1500;
            object-fit: contain;

            @media screen and (max-width: 425px){
                width: 23px;
                height: 23px;
            }
        }
        > .instaUser{
            width: 30px;
            height: 30px;
            object-fit: cover;
            border-radius: 100%;
            filter: brightness(1.1) drop-shadow(0.1rem 0.1rem 1rem rgba(0,0,0,0.3));
            
            @media screen and (max-width: 425px){
                width: 27px;
                height: 27px;
            }
        }
    }
`;

export default Navbar;
