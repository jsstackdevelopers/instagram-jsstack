import React from 'react';
import styled from 'styled-components';
import { sugestAPI } from '../API/API';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserName, selectUserPhoto } from '../App/UserSlice';
import accountSvg from '../Images/account-blue.svg';

const Sugguests = () => {
    const currentUser = useSelector(selectUserName);
    const currentUserPhoto = useSelector(selectUserPhoto);
    return (
        <>
            <Section>
                <Admin>
                    <div>
                        <div><img src={currentUserPhoto || accountSvg} alt="cuurent/User" /></div>
                        <div className="div-margin"><Link to="#">{currentUser}</Link><h1>Welcome to Instagram</h1></div>
                    </div>
                    <div><button type="button">Switch</button></div>
                </Admin>
                <SuggesTitle>
                    <h1>Suggestions for you</h1>
                    <button type="button">See All</button>
                </SuggesTitle>
                
                {sugestAPI && sugestAPI.map((val,ind)=>(
                    <SuggesPeople key={ind}> 
                        <div>
                            <div><img src={val.sugavaSrc} alt="admin/jsstack" /></div>
                            <div className="div-margin"><Link to="#">{val.sugname}</Link><h1>Suggested for You</h1></div>
                        </div>
                        <div><button type="button">Follow</button></div>
                    </SuggesPeople>
                ))}
                
                <Copyright>
                    <p>&copy; 2021 Instagram From JSSTACK DEVELOPERS</p>
                </Copyright>

            </Section>
        </>
    );
};
const Section = styled.section`
    opacity: 1;
    z-index: 1500;
    position: relative;
    padding: 1rem 1rem 0.35rem 1rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(3rem);
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 0px 0.5px inset;
`;
const Admin = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    div{
        display: flex;
        align-items: center;
        justify-content: flex-start;

        > .div-margin{
            margin: 0 0.8rem;
        }

        div{
            display: flex;
            align-items: flex-start;
            flex-direction: column;

            img{
                width: 55px;
                height: 55px;
                object-fit: cover;
                border-radius: 50%;
            }
            a{
                color: #000;
                font-size: 1rem;
                font-weight: 600;
            }
            h1{
                line-height: 1;
                font-size: 0.8rem;
                font-weight: 500;
                color: rgba(0,0,0,0.8);
            }
        }
        button{
            outline: none;
            border: none;
            color: #0075ff;
            background: transparent;
            font-size: 1rem;
            opacity: 1;
            cursor: pointer;
            z-index: 1500;
        }
    }
`;
const SuggesTitle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem 0 0 0;

    h1{
        line-height: 1;
        font-size: 1rem;
        font-weight: 500;
    }
    button{
        outline: none;
        border: none;
        color: #000;
        font-weight: 500;
        background: transparent;
        font-size: 1rem;
        opacity: 1;
        cursor: pointer;
        z-index: 1500;
    }
`;
const SuggesPeople = styled.div`
    margin: 0.7rem 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    div{
        display: flex;
        align-items: center;
        justify-content: flex-start;

        > .div-margin{
            margin: 0 0.8rem;
        }

        div{
            display: flex;
            align-items: flex-start;
            flex-direction: column;

            img{
                width: 45px;
                height: 45px;
                object-fit: cover;
                border-radius: 50%;
            }
            a{
                color: #000;
                font-size: 0.75rem;
                font-weight: 600;
            }
            h1{
                line-height: 1;
                font-size: 0.75rem;
                font-weight: 400;
                color: rgba(0,0,0,0.8);
            }
        }
        button{
            outline: none;
            border: none;
            color: #0075ff;
            background: transparent;
            font-size: 0.8rem;
            opacity: 1;
            cursor: pointer;
            z-index: 1500;
        }
    }
`;
const Copyright = styled.div`
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    p{
        color: #0085ff;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
    }
`;
export default Sugguests;
