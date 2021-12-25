import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { db, storage } from '../../Firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore';
import { selectUserName, selectUserPhoto } from '../App/UserSlice';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { useSelector } from 'react-redux';

const Model = ({ openState, setOpenState }) => {
    const useFilePickerRef = useRef(null);
    const useCaptionRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoding] = useState(false);
    const currentUser = useSelector(selectUserName);
    const currentUserPhoto = useSelector(selectUserPhoto);

    const uploadPost = async () => {
        if(loading) return;
        setLoding(true);

        const docRef = await addDoc(collection(db, 'posts'), {
            username: currentUser,
            caption: useCaptionRef.current.value,
            profileImg: currentUserPhoto,
            timestamp: serverTimestamp()
        })
        console.log(`New Doc Added with ID: ${docRef.id}`);

        const imgRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imgRef, selectedFile, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imgRef);
            await updateDoc(doc(db, "posts", docRef.id), {
                image: downloadURL,
            })
        });

        setOpenState(false);
        setLoding(false);
        setSelectedFile(null);
    }

    const addImageToModle = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    return (
        <>
            {openState &&
                <ModelOverlay>
                    <ModelWrap>
                        <CloseButton onClick={()=> setOpenState(false)}><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2 2L14 14"/><path d="M2 14L14 2"/></svg></div></CloseButton>
                        <ModelTitle><h1>Create a Post</h1></ModelTitle>
                        <ModelContent>
                            {
                                selectedFile ? (
                                    <div className="Remove_HW">
                                        <UserPost><img src={selectedFile} onClick={()=> setSelectedFile(null)} alt="postnotselected"/></UserPost>
                                        <PostTagline><h4>File has selected!!</h4></PostTagline>
                                        <UserCaption ref={useCaptionRef} rows="2" placeholder="Write a Caption!!"></UserCaption>
                                        <UploadButton type="submit" disabled={!selectedFile} onClick={uploadPost}><span>{loading ? "Uploading....." : "Upload Post"}</span></UploadButton>
                                    </div>
                                ) : (
                                    <div className="Add_HW">
                                        <CameraIcon onClick={() => useFilePickerRef.current.click()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg></CameraIcon>
                                        <PostTagline><h4>Upload Photos/Videos</h4><h4>Select from Your Local Device</h4></PostTagline>
                                        <div><input type="file" hidden onChange={addImageToModle} ref={useFilePickerRef} /></div>
                                    </div>
                                )
                            }
                        </ModelContent>
                    </ModelWrap>
                </ModelOverlay>
            }
        </>
    );
};
const animateOverlay = keyframes`
    0% {
        backdrop-filter: blur(0) saturate(100%);
    }100% {
        backdrop-filter: blur(1rem) saturate(120%);
    }
`;
const animateModel = keyframes`
    0% {
        transform: translateY(-100px) scale(0.8);
        opacity: 0;
    }
    100% {
        transform: translateY(0px) scale(1);
        opacity: 1;
    }
`;
const ModelOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    opacity: 1;
    z-index: 2500;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px) saturate(100%);
    animation: 0.7s ease 0s 1 normal forwards running ${animateOverlay};
`;
const ModelWrap = styled.div`
    padding: 1.7rem 1rem 1rem 1rem;
    border-radius: 1rem;
    position: relative;
    background: rgba(50, 61, 109, 0.7);
    backdrop-filter: blur(40px);
    box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px, rgb(47 184 255) 0px 0px 0px 1px inset;
    animation: 0.7s cubic-bezier(0.075, 0.82, 0.165, 1) 0s 1 normal forwards running ${animateModel};

    @media screen and (max-width: 425px){
        padding: 1.5rem 0.7rem 1rem 0.7rem;
    }
`;
const CloseButton = styled.div`
    position: absolute;
    top: -15px;
    right: -15px;

    @media screen and (max-width: 550px){
        top: -13px;
        right: -13px;
    }

    div{
        display: grid;
        align-items: center;
        justify-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        cursor: pointer;
        border-radius: 2rem;
        box-sizing: border-box;
        backdrop-filter: blur(2rem);
        background: linear-gradient(360deg, rgba(99, 106, 150, 0.4) 0%, rgba(182, 186, 214, 0.5) 100%);
        box-shadow: rgb(0 0 0 / 15%) 0px 20px 40px, rgb(255 255 255 / 30%) 0px 0px 0px 0.5px inset;

        @media screen and (max-width: 550px){
            width: 31px;
            height: 31px;
        }

        svg{
            fill: none;
            width: 17px;
            height: 17px;
            stroke: #fff;
            stroke-width: 2;
            stroke-miterlimit: 10;
            stroke-linecap: round;
            stroke-linejoin: round;
            @media screen and (max-width: 550px){
                width: 13px;
                height: 13px;
            }
        }
    }
`;
const ModelTitle = styled.div`
    position: absolute;
    top: -1.3rem;
    left: 1rem;
    right: 0;
    width: 11rem;
    height: auto;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    backdrop-filter: blur(2rem);
    background: linear-gradient(360deg, rgba(99, 106, 150, 0.4) 0%, rgba(182, 186, 214, 0.5) 100%);
    box-shadow: rgb(0 0 0 / 15%) 0px 20px 40px, rgb(255 255 255 / 30%) 0px 0px 0px 0.5px inset;
    
    @media screen and (max-width: 550px){
        width: 8rem;
        padding: 0.2rem;
        top: -1.6rem;
    }
    h1{
        font-size: 1.3rem;
        font-weight: 400;
        text-transform: uppercase;

        @media screen and (max-width: 550px){
            font-size: 1rem;
        }
    }
`;
const ModelContent = styled.div`
    div{
        display: flex;
        align-items: center;
        justify-items: center;
        flex-direction: column;
        justify-content: center;
    }

    > .Remove_HW{
        height: auto !important;
        width: 25rem !important;

        @media screen and (max-width: 550px){
            height: auto !important;
            width: 19rem !important;
        }
        @media screen and (max-width: 350px){
            height: auto !important;
            width: 15rem !important;
        }
    }
    > .Add_HW{
        height: 25vh !important;
        width: 21rem !important;
        
        @media screen and (max-width: 550px){
            height: 21vh !important;
            width: 15rem !important;
        }
    }
`;
const UserPost = styled.div`
    width: 100%;
    height: auto;
    border-radius: 100%;
    display: grid;
    justify-items: center;
    justify-content: center;
    place-content: center;

    img{
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
        object-fit: contain;
    }    
`;
const UserCaption = styled.textarea`    
    display: block;
    margin: 1vh 0 1rem 0;
    padding: 0.5rem 3rem 0.5rem 1rem;

    resize: none;
    opacity: 1;
    width: 21rem;
    height: auto;
    z-index: 1500;
    outline: none;
    position: relative;
    font-size: 0.75rem;
    border-radius: 0.5rem;
    cursor: default;
    overflow: hidden;
    color: rgba(249,249,249,1);
    backdrop-filter: blur(0.1rem);
    border: 1px solid rgba(249,249,249,0.1);
    background: linear-gradient(rgba(99, 106, 150, 0.5) 0%, rgba(182, 186, 214, 0.5) 100%);    

    &::placeholder{
        color: rgba(249,249,249,0.9);
    }

    &:focus{    
        background: linear-gradient(rgba(24, 32, 79, 0.4) 0%, rgba(24, 32, 79, 0.25) 100%);
        box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px, rgb(47 184 255) 0px 0px 0px 1px inset;
    }

    @media screen and (max-width: 550px){
        width: 17rem;
        padding: 0.5rem 1rem 0.5rem 1rem;
    }
    @media screen and (max-width: 350px){
        width: 13rem;
        padding: 0.5rem 1rem 0.5rem 1rem;
    }
`;
const UploadButton = styled.button`
    outline: none;
    border: none;
    width: 100%;
    padding: 0.35rem;
    border-radius: 0.5rem;
    box-sizing: border-box;
    backdrop-filter: blur(2rem);
    background: linear-gradient(360deg, rgba(99, 106, 150, 0.4) 0%, rgba(182, 186, 214, 0.5) 100%);
    box-shadow: rgb(0 0 0 / 15%) 0px 20px 40px, rgb(255 255 255 / 30%) 0px 0px 0px 0.5px inset;
        
    span{
        font-size: 1rem;
        color: rgba(255,255,255,1);
        font-weight: 300;
        text-transform: uppercase;
    }

    &:hover{
        box-shadow: rgb(47 184 255 / 10%) 0 0 1rem;
        background: linear-gradient(rgb(47,184,255,1), rgb(47 184 255));
    }

    &:disabled {
        cursor: not-allowed;
        &:hover {
            background: red;
        }
    }
`;
const PostTagline = styled.div`
    display: grid;
    justify-items: center;
    justify-content: center;
    place-content: center;

    h4{
        color: rgba(249,249,249,1);
        font-weight: 300;
        margin-top: 1vh;
        @media screen and (max-width: 550px){
            font-size: 0.85rem;
            margin-top: 0.5vh;
        }
    }
`;
const CameraIcon = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 2rem;
    box-sizing: border-box;
    backdrop-filter: blur(2rem);
    background: linear-gradient(360deg, rgba(99, 106, 150, 0.4) 0%, rgba(182, 186, 214, 0.5) 100%);
    box-shadow: rgb(0 0 0 / 15%) 0px 20px 40px, rgb(255 255 255 / 30%) 0px 0px 0px 0.5px inset;
    margin-bottom: 1vh;

    @media screen and (max-width: 550px){
        width: 41px;
        height: 41px;
    }
        
    svg{
        fill: none;
        width: 30px;
        height: 30px;
        stroke: #fff;
        stroke-width: 1.3;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
`;
export default Model;
