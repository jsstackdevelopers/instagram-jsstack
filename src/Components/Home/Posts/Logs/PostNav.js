import React from 'react';
import styled from 'styled-components';

const PostNav = ({id, username, profileImg, dummyuser }) => {
    return (
        <>
            <Nav>
                <div><div className="Post_profile_img"><img src={profileImg || dummyuser} alt={`Profile/img/${id}`} /></div><div className="Post_profile_name"><h1>{username}</h1><p>Sponsored</p></div></div>
                <div><button type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg></button></div>
            </Nav>
        </>
    );
};
const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1rem 1rem;
    border-bottom: 1px solid red;

    @media screen and (max-width: 550px){
        padding: 0.7rem;
    }

    div{
        display: flex;
        align-items: center;
        justify-content: center;
        
        > .Post_profile_img{
            width: 41px;
            height: 41px;
            display: grid;
            justify-items: center;
            place-content: center;
            filter: drop-shadow(0 0 0.1rem rgba(0,0,0,0.5));
            border-radius: 50%;
            border: 1px solid #f23023;

            img{
                width: 35px;
                height: 35px;
                object-fit: cover;
                box-sizing: border-box;
                border-radius: 50%;
            }
        }
        > .Post_profile_name{
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            margin-left: 0.85rem;
            margin-top: 0.4rem;
            
            h1{
                font-size: 0.8rem;
                font-weight: 600;
                font-style: normal;
                line-height: 1;
            }
            p{
                font-size: 0.8rem;
                font-style: normal;
                font-weight: 500;
            }
        }

        button{
            cursor: pointer;
            outline: none;
            border: none;
            display: flex;
            align-items: center;
            justify-items: center;
            background: transparent;

            svg{
                width: 21px;
                height: 21px;
                fill: #000;
            }
        }
    }

`;
export default PostNav;
