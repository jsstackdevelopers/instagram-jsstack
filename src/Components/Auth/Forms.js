import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SignUP from './Utils/SignUp.js';
import SignIn from './Utils/SignIn.js';

import signupBg from "../Images/signup-bg.svg";
import signupImg from "../Images/signup-img.svg";

const Forms = () => {
    const [isSignUp, setIsSignUp] = useState();
    const switchMode = () => setIsSignUp((prevIsSignup) => !prevIsSignup);

    return (
        <>
            <Wrap>
                <Dashboard>
                    <Grid>
                        <Image><img src={signupImg} alt="" /></Image>
                        <InputGroup>
                            <Title>
                                {
                                    isSignUp ? (
                                        <><h1>Sign UP</h1><p>Sign up to see photos and videos from your friends. &nbsp;🚀🚀</p></>
                                    ) : (
                                        <><h1>Sign In</h1><p>Log In to Instgram &nbsp;🚀🚀</p></>
                                    )
                                }
                            </Title>
                            <form>
                                {
                                    isSignUp ? (
                                        <SignUP />
                                    ) : (
                                        <SignIn />
                                    )
                                }
                            </form>
                            <Spacer></Spacer>
                            <OtherLinks>
                                {
                                    isSignUp ? (
                                        <>
                                            <p onClick={switchMode}>Already have an Account!!<Link to="">Sing In</Link></p>
                                        </>
                                    ) : (
                                        <>
                                            <p onClick={switchMode}>Don't have an Account?<Link to="">Sing UP</Link></p><p>Forgot Password?<Link to="">Reset Password</Link></p>
                                        </>
                                    )
                                }
                                <p>LogIn with<Link to="">Fecebook</Link></p>
                            </OtherLinks>
                        </InputGroup>
                    </Grid>
                </Dashboard>
            </Wrap>
        </>
    );
};
const Wrap = styled.div`
    position: relative;
    opacity: 1;
    z-index: 1500;
    min-height: 81vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;

    @media screen and (max-width: 1200px){
        justify-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 767px){
        min-height: 100%;
        padding: 3rem 0 2rem 0;
    }
`;
const Dashboard = styled.div`
    width: 57rem;
    height: auto;
    border-radius: 1rem;
    border-bottom: 0.15rem solid #f2f6ff;
    background: rgba(50, 61, 109, 0.5);
    backdrop-filter: blur(0.5rem);
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 0px 0.5px  inset;
    
    @media screen and (max-width: 991px){
        width: 100%;
    }
`;
const Grid = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;

    @media screen and (max-width: 767px){
       flex-direction: column;
       justify-content: center;
       padding: 1rem 0.5rem;
    }
`;
const Image = styled.div`
    background: url(${signupBg})center/cover no-repeat;
    height: 550px;
    width: 350px;
    border-radius: 1rem;

    display: grid;
    place-content: center;
    
    @media screen and (max-width: 1200px){
        height: 500px;
        width: 300px;
    }
    @media screen and (max-width: 767px){
        height: 250px;
        width: 100%;
        background-position: top;
    }

    @media screen and (max-width: 450px){
        height: 185px;
    }

    img{
        width: 100%;
        height: auto;
        object-fit: contain;

        @media screen and (max-width: 767px){
            width: 100%;
            height: 250px;
            object-fit: contain;
        }
        @media screen and (max-width: 450px){
            height: 185px;
        }
    }
`;
const InputGroup = styled.div`
    height: 55vh;
    width: 21rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media screen and (max-width: 1200px){
        margin: 0 0;
    }
    @media screen and (max-width: 767px){
        margin-top: 5vh;
        margin-bottom: 3vh;
        height: auto;
    }
    @media screen and (max-width: 450px){
        width: 17rem;
    }
`;
const Spacer = styled.div`
    border: 0.5px solid #ddd;
    width: 75%;
    margin-top: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
`;
const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;

    @media screen and (max-width: 991px){
        align-items: center;
        justify-content: center;
    }

    h1{
        color: rgb(249,249,249);
        text-transform: uppercase;
    }
    p{
        color: #ddd;
        font-size: 0.75rem;
        font-weight: 500;
    }
`;
const OtherLinks = styled.div`
    p{
        color: #ddd;
        font-size: 0.9rem;
        @media screen and (max-width: 450px){
            font-size: 0.75rem;
        }
        a{
            color: #2fb8ff;
            padding: 0 1rem;
        }
    }
`;
export default Forms;
