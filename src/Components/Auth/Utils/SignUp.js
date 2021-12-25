import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../../Firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setSigninState } from '../../App/UserSlice.js';

import emailSvg from '../../Images/email.svg';
import usernameImg from '../../Images/username.svg';
import pswd from '../../Images/pswd.svg';
import userProfileImg from '../../Images/profile.svg';

const SignUP = () => {
    const [username, setUsername] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    
    const OnSignUp = async () => {
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential?.user;
            updateProfile(user, {
                displayName: username,
                photoURL: profilePic,
            }).then(() => {
                dispatch(setSigninState({
                    name: user?.displayName,
                    email: user?.email,
                    uid: user?.uid,
                    photo: user?.photoURL,
                }));
            });
            history.push("/home");
        }).catch((error) => {
            alert(`Errors: ${error.message}`);
        })
    }
    return (
        <>
            <InputDiv><Label><img alt="img/svg" src={usernameImg} /></Label><input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User Name" required aria-label="User Name" autoComplete="off" /></InputDiv>
            <InputDiv><Label><img alt="img/svg" src={userProfileImg} /></Label><input type="text" name="profilepic" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder="Add Profile Pic (URL)" required aria-label="User Name" autoComplete="off" /></InputDiv>
            <InputDiv><Label><img alt="img/svg" src={emailSvg} /></Label><input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} name="email" placeholder="Email Adress" required aria-label="Email Adress of User" autoComplete="off" /></InputDiv>
            <InputDiv><Label><img alt="img/svg" src={pswd} /></Label><input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required aria-label="Password of User" autoComplete="off" /></InputDiv>
            <LoginButton type="button" onClick={OnSignUp}><span>Sign UP</span></LoginButton>
        </>
    );
};
const Label = styled.div`
    border-radius: 50%;
    position: absolute;
    opacity: 1;
    z-index: 1500;
    top: 0.4rem;
    left: 0.45rem;
    width: 28px;
    height: 28px;
    padding: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    
    @media screen and (max-width: 450px){
        top: 0.35rem;
        left: 0.35rem;
        width: 21px;
        height: 21px;
    }

    img{
        width: 19px;
        height: 19px;
        object-fit: contain;

        @media screen and (max-width: 450px){
            width: 13px;
            height: 13px;
        }
    }   
`;
const InputDiv = styled.div`
    position: relative;
    width: 21rem;
    margin-top: 1rem;
    @media screen and (max-width: 450px){
        width: 17rem;
    }
    
    input{    
        color: #fff;
        height: 100%;
        width: 100%;
        border: none;
        display: flex;
        align-items: center;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 130%;
        position: relative;
        color: rgb(255, 255, 255);
        padding: 0.65rem 3rem 0.65rem 3.3rem;
        box-sizing: border-box;
        background-clip: border-box;
        border-radius: 2rem;
        letter-spacing: 0.1rem;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
        box-shadow: rgb(0 0 0 / 15%) 0px 20px 40px, rgb(255 255 255 / 30%) 0px 0px 0px 0.5px inset;
        background: linear-gradient(rgba(99, 106, 150, 0.5) 0%, rgba(182, 186, 214, 0.5) 100%);

        @media screen and (max-width: 450px){
            padding: 0.45rem 2rem 0.45rem 2.5rem;
        }

        &::placeholder{
            color: #fff;
        }
        &:focus{
            outline: none;
            padding-left: 4rem;
            box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px, rgb(47 184 255) 0px 0px 0px 1px inset;
            background: linear-gradient(rgba(24, 32, 79, 0.4) 0%, rgba(24, 32, 79, 0.25) 100%);

            @media screen and (max-width: 991px){
                padding-left: 3rem;
            }
        }
    }
`;
const LoginButton = styled.button`
    margin-top: 1.7rem;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    padding: 0.55rem 0;
    width: 100%;
    position: relative;
    box-shadow: rgb(147 231 221 / 15%) 0px 20px 40px;
    background: linear-gradient(91.4deg, rgb(47, 184, 255) 0%, rgb(158, 236, 217) 100%);
    transition: all 500ms cubic-bezier(0.23, 1, 0.320, 1) 0s;
    @media screen and (max-width: 450px){
        margin-top: 1.3rem;
    }
    
    @media screen and (max-width: 450px){
        padding: 0.4rem 0;
    }
    
    span{
        font-size: 1rem;
        color: rgb(14, 67, 92);
        font-weight: 600;
        text-transform: uppercase;
        font-style: inherit;

        @media screen and (max-width: 450px){
            font-size: 0.8rem;
        }
    }

    &:hover{
        transform: translateY(-2px);
        box-shadow: rgb(0 0 0 / 15%) 0px 20px 40px, rgb(0 0 0 / 30%) 0px 0px 0px 0.5px inset, rgb(0 0 0 / 10%) 0px 10px 40px inset;
    }
`;

export default SignUP;
