import React from 'react';
import styled from 'styled-components';

const Theme = () => {
    return (
        <>
            <Background><div className="shape-divider"><svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path></svg></div></Background>
        </>
    );
};
const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 1;
    opacity: 1300;
    min-height: 83vh;
    background: linear-gradient(189deg , rgb(57, 15, 199) 65%, rgb(40, 35, 77) 100%);

    @media screen and (max-width: 550px){
        min-height: 80%; 
    }

    > .shape-divider{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        line-height: 0;

        svg{
            position: relative;
            display: block;
            width: calc(100% + 5rem);
            height: 75px;
            transform: rotateY(180deg);

            @media (min-width: 768px) and (max-width: 1023px) {
                width: calc(111% + 1.3px);
                height: 42px;
            }
            @media (max-width: 767px) {
                height: 45px;
                width: calc(130% + 1.0px);
            }

            > .shape-fill{
                fill: #f2f6ff;
            }
        }
    }
`;
export default Theme;