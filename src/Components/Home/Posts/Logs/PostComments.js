import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import styled from 'styled-components';
import { db } from '../../../../Firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUserName, selectUserPhoto } from '../../../App/UserSlice';


const PostComments = ({ id, dummyuser }) => {
    const currentUserName = useSelector(selectUserName);
    const currentUserPhoto = useSelector(selectUserPhoto);
    const [InputState, setInputState] = useState("");
    const [StateArray, setStateArray] = useState([]);

    useEffect(() => {
        const rfcQuery = query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc"));
        const rfcs = onSnapshot(rfcQuery, (snapshot) => {
            setStateArray(snapshot.docs);
        });
        return rfcs;
    }, [id])

    const onSendComments = async (e) => {
        e.preventDefault();
        const commentToSend = InputState;
        setInputState('');

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            curUserName: currentUserName,
            curUserPhoto: currentUserPhoto,
            timestamp: serverTimestamp(),
        });
        console.log(`The New Comment is Add with ${id}`)
    }
    return (
        <>
            {StateArray.length > 0 && (
                <CommentScroll>
                    {StateArray.map((val) => (
                        <CommentBox key={val.id}>
                            <div>
                                <img src={val.data().curUserPhoto || dummyuser} alt="comment/profile" /><p><Link to="#">{val.data().curUserName}</Link><span>{val.data().comment}</span></p>
                            </div>
                            <Moment fromNow className="moment">{val.data().timestamp?.toDate()}</Moment>
                        </CommentBox>
                    ))}
                </CommentScroll>
            )}
            <CommentForms>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <input value={InputState} onChange={(e) => setInputState(e.target.value)} type="text" placeholder="Add a comment" />
                </div>
                <button type="submit" disabled={!InputState.trim()} onClick={onSendComments}>Post</button>
            </CommentForms>
        </>
    );
};
const CommentScroll = styled.div`
    max-height: 65px !important;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
    &::-webkit-scrollbar{
        display: none;
    }
`;
const CommentBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 93%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    margin-bottom: 0.7vh;

    @media screen and (max-width: 550px){
        flex-direction: column;
        justify-content: flex-start;
    }

    div{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0.5rem 0;
        width: 83%;

        @media screen and (max-width: 550px){
            width: 100%;
        }

        img{
            width: 23px;
            height: 23px;
            object-fit: contain;
            margin-right: 0.5rem;
            border-radius: 50%;
        }
        p{
            line-height: 1.1;
            word-wrap: break-word;
            word-break: break-all;
            a{
                color: #0099ff;
                font-weight: 500;
                font-size: 0.8rem;
            }
            span{
                color: #000;
                line-height: 0;
                margin-left: 0.7rem;
                font-size: 0.8rem;
            }
        }
    }

    > .moment{
        width: 17%;
        color: #0099ff;
        font-size: 0.7rem;
        font-weight: 700;
        margin-left: 0.4rem;

        @media screen and (max-width: 550px){
            width: 87%;
            margin: 0 auto;
        }
    }
`;
const CommentForms = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 1.3rem 1rem;
    
    @media screen and (max-width: 550px){
        padding: 0.7rem 0.7rem 1rem 0.7rem;
    }

    div{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        input{
            width: 100%;
            padding: 0 0.7rem;
            outline: none;
            border: none;
            font-size: 0.85rem;
            background: transparent;
            resize: none;
        }
        
        svg{
            fill: none;
            width: 30px;
            height: 30px;
            stroke: #000;
            stroke-width: 1.5;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
    }

    button{
        cursor: pointer;
        outline: none;
        border: none;
        padding: 0;
        color: #0085ff;
        opacity: 1;
        z-index: 1500;
        position: relative;
        background: transparent;
        font-size: 1rem;
        font-weight: 500;
    }
`;
export default PostComments;
