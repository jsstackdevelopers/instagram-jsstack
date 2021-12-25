import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase';
import styled from 'styled-components';
import Posts from './Posts/Posts';
import dummyuser from '../Images/account-blue.svg';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';

const InstaPosts = () => {
    const [selectPosts, setSelectPosts] = useState([]);

    useEffect(() => {
        const createQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
        const request = onSnapshot(createQuery, (snapshot) => {
            setSelectPosts(snapshot.docs)
        })
        return request;
    }, [])
    // console.log(selectPosts);
    return (
        <>
            <Wrap>
                {
                    selectPosts && selectPosts?.map((post, index) => (
                        <Posts
                            key={index}
                            id={post.id}
                            username={post.data().username}
                            profileImg={post.data().profileImg}
                            image={post.data().image}
                            caption={post.data().caption}
                            dummyuser={dummyuser}
                        />
                    ))
                }
            </Wrap>
        </>
    );
};
const Wrap = styled.div`
    position: relative;
    top: 1vh;
    left: 0;
    right: 0;
`;
export default InstaPosts;
