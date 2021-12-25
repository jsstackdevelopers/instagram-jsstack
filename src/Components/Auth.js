import React from 'react';
import styled from 'styled-components';
import Footer from './Auth/Footer';
import Forms from './Auth/Forms';


const Auth = () => {
    return (
        <>
            <Container>
                <Forms />
                <Footer />
            </Container>
        </>
    );
};
const Container = styled.div`
    width: 95%;
    margin: 0 auto;
`;
export default Auth;