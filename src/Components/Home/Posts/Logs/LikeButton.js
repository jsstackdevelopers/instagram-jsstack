import { collection, deleteDoc, doc, onSnapshot, setDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { db } from '../../../../Firebase';
import { selectUserName, selectUserUID } from '../../../App/UserSlice';

const LikeButton = ({id}) => {
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const currentUser = useSelector(selectUserName);
    const currentUID = useSelector(selectUserUID);
    
    useEffect(() => {
        const request = onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
            setLikes(snapshot.docs);
        })
        return request;
    }, [id])

    useEffect(() => {
        const isLike = setHasLiked(likes.findIndex((val) => val.id === currentUID) !== -1)
        return isLike;
    }, [likes, currentUID])

    const likePost = async () => {
        if(hasLiked){
            await deleteDoc(doc(db, "posts", id, "likes", currentUID));
        }else{
            await setDoc(doc(db, "posts", id, "likes", currentUID), {
                username: currentUser,
            });
        }
    }
    return (
        <>
            <FeedButtons>
                <div>
                {
                    hasLiked ? (
                        <svg onClick={likePost} xmlns="http://www.w3.org/2000/svg" className="like-btn-filled" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                    ) : (
                        <svg onClick={likePost} xmlns="http://www.w3.org/2000/svg" className="like-btn-outline" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    )
                }
                    <svg className="svg-margin like-btn-outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <svg className="svg-rotate like-btn-outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
                <div><svg xmlns="http://www.w3.org/2000/svg" className="like-btn-outline" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg></div>
            </FeedButtons>
            
            {likes.length > 0 && (
                <LikesJS><span>{likes.length} likes</span></LikesJS>
            )}
        </>
    );
};
const LikesJS = styled.div`
    margin-left: 1rem;
    display: flex;
    align-items: center;

    @media screen and (max-width: 550px){
        margin-left: 0.7rem;
    }
    
    span{
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
    }
`;
const FeedButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 0.5rem 1rem;

    @media screen and (max-width: 550px){
        padding: 0.7rem;
    }
    

    div{
        display: flex;
        align-items: center;

        svg{
            width: 27px;
            height: 27px;
            opacity: 1;
            cursor: pointer;
            z-index: 1500;
            position: relative;            
            transition: all 250ms cubic-bezier(0.39, 0.575, 0.565, 1) 0s;
        }

        > .like-btn-outline{
            fill: none;
            stroke: #000;
            stroke-opacity: 1;
            stroke-width: 1.3;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
        > .like-btn-filled{
            fill: red;
            stroke: none;
            fill-opacity: 1;
            fill-rule: evenodd;
            clip-rule: evenodd;
        }

        > .svg-rotate{
            transform: rotate(45deg);
        }

        > .svg-margin{
            margin: 0 0.5rem;
        }
    }

`;
export default LikeButton;
