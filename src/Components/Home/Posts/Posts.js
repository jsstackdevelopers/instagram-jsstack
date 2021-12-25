import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LikeButton from './Logs/LikeButton';
import PostComments from './Logs/PostComments';
import PostNav from './Logs/PostNav';

const Posts = ({ id, username, profileImg, image, caption, dummyuser }) => {
    return (
        <>
            <Section>
                <PostNav dummyuser={dummyuser} profileImg={profileImg} id={id} username={username} />
                <PostImg><img src={image} alt={`InstagramPost/Img/${id}`} /></PostImg>
                <LikeButton id={id} />
                <CaptionTitle><p><Link to="#" className="username">{username}</Link><span className="caption">{caption}</span></p></CaptionTitle>
                <PostComments username={username} caption={caption} id={id} dummyuser={dummyuser} />
            </Section>
        </>
    );
};
const Section = styled.div`
    opacity: 1;
    z-index: 1500;
    margin: 2vh 0;
    position: relative;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(3rem);
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 0px 0.5px inset;
`;
const PostImg = styled.div`
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        opacity: 1;
        z-index: 1500;
        position: relative;
        width: 100%;
        height: 100%;
    }
`;
const CaptionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.3rem 0;
    width: 93%;
    margin: 0 auto;
    
    p{
        line-height: 1.1;
        word-wrap: break-word;
        > .username{
            color: #0099ff;
            font-weight: bold;
            font-size: 0.8rem;
        }
        > .caption{
            color: #000;
            line-height: 0;
            margin-left: 0.7rem;
            font-size: 0.8rem;
        }
    }
`;
export default Posts;
