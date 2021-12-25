import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import appStore from '../Images/appStore.png';
import playStore from '../Images/palyStore.png';
import code from '../Images/code.svg';

const Footer = () => {
    return (
        <>
            <Wrap>
                <h2>Get the App From!!</h2>
                <GetApp>
                    <Link to=""><img src={appStore} alt="App/store" /></Link>
                    <Link to=""><img src={playStore} alt="Play/store" /></Link>
                </GetApp>
                <Copyright>
                    <img src={code} alt="code/svg" /><span>DESIGNED AND DEVELOPED BY &copy; JSSTACK DEVELOPERS</span>
                </Copyright>
            </Wrap>
        </>
    );
};
const Wrap = styled.div`
    opacity: 1;
    z-index: 1500;
    padding: 1rem 0;
    display: grid;
    place-content: center;
    align-items: center;
    justify-items: center;
    

    h2{
        font-weight: 700;
        text-transform: uppercase;

        @media screen and (max-width: 450px){
            font-size: 1rem;
        }
    }
`;
const GetApp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1vh 0;

    @media screen and (max-width: 450px){
        margin: 0.5vh 0;
    }

    a{
        margin: 0 1rem;
        text-decoration: none;
        img{
            width: 9rem;
            height: auto;
            object-fit: contain;
            opacity: 1;
            z-index: 1500;
            @media screen and (max-width: 450px){
                width: 7rem;
            }
        }
    }
`;
const Copyright = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media screen and (max-width: 450px){
        max-width: 200px;
    }
    span{
        font-weight: 500;
        font-size: 1rem;
        
        @media screen and (max-width: 450px){
            font-size: 0.8rem;
            text-align: center;
        }
    }
    img{
        width: 27px;
        height: 27px;
    }
`;
export default Footer;
