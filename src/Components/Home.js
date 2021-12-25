import React from 'react';
import styled from 'styled-components';
import InstaPosts from './Home/InstaPosts';
import Navbar from './Home/Navbar';
import Stories from './Home/Stories';
import Sugguests from './Home/Sugguests';


const Home = () => {

    return (
        <>
            <Navbar />
            <Main>
                <FlexBox>
                    <InstaFeeds>
                        <Stories />
                        <InstaPosts />
                    </InstaFeeds>
                    <Suggestions>
                        <Sugguests />
                    </Suggestions>
                </FlexBox>
            </Main>
        </>
    );
};
const Main = styled.main`
    opacity: 1;
    z-index: 1500;
    position: relative;
    top: 9vh;
    left: 0;
    right: 0;
    width: 59rem;
    margin: 0 auto;

    @media screen and (max-width: 991px){
        width: 100%;
    }

`;
const FlexBox = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-items: flex-start;
    justify-content: space-between;
    @media screen and (max-width: 991px){
        justify-content: center;
        justify-items: center;
        align-items: center;
        flex-direction: column;
    }
`;
const InstaFeeds = styled.div`
    width: 38rem;
    margin: 0;
    height: 90vh;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;

    ::-webkit-scrollbar{
        display: none;
    }

    @media screen and (max-width: 630px){
        margin: 0 auto;
        width: 95%;
    }
`;
const Suggestions = styled.div`
    width: 20rem;
    margin: 0;
    height: auto;

    @media screen and (max-width: 991px){
        display: none;
    }
`;
export default Home;
