import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUserName, selectUserPhoto } from '../App/UserSlice.js';
import { StoriesAPI } from '../API/API.js';
import accountSvg from '../Images/account-blue.svg';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";


const Stories = () => {
    const currentUser = useSelector(selectUserName);
    const currentUserPhoto = useSelector(selectUserPhoto);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [ sliderRef, setSliderButton ] = useKeenSlider({
        initial: 0,
        slidesPerView: 7.5,
        mode: "free",
        spacing: 1,
        loop: false,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide)
        },
        breakpoints: {
            "(max-width: 1200px)": {
                slidesPerView: 7.5,
                mode: "free-snap",
            },"(max-width: 500px)": {
                slidesPerView: 6,
                spacing: 0,
            },"(max-width: 400px)": {
                slidesPerView: 5.5,
            },"(max-width: 375px)": {
                slidesPerView: 4.7,
                spacing: 1,
            }
        },
    });

    const ArrowLeft = (props) => {
        const disabled = props.disabled ? " arrow--disabled" : "";
        return (
            <>
                <button type="button" onClick={props.onClick} className={"arrow--left " + disabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
            </>
        )
    }
    const ArrowRight = (props) => {
        const disabled = props.disabled ? " arrow--disabled" : "";
        return (
            <>
                <button type="button" onClick={props.onClick} className={"arrow--right " + disabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
            </>
        )
    }
    
    return (
        <>
            <Section>
                <div ref={sliderRef} className="keen-slider">
                    <div className="keen-slider__slide">
                        <Wrap><Link to="#"><img src={currentUserPhoto || accountSvg} alt="current/user" /></Link><div>{currentUser}</div></Wrap>
                    </div>
                    { StoriesAPI && StoriesAPI.map((val, ind) =>(
                        <div key={ind} className="keen-slider__slide">
                            <Wrap><Link to="#"><img src={val.avatarSrc} alt="img/user" /></Link><div>{val.name}</div></Wrap>
                        </div>
                    ))}
                </div>
                <Arrows>
                    {setSliderButton && (
                        <>
                            <ArrowLeft onClick={(e) => e.stopPropagation() || setSliderButton.prev()} disabled={currentSlide === 0} />
                            <ArrowRight onClick={(e) => e.stopPropagation() || setSliderButton.next()} disabled={currentSlide === setSliderButton.details().size - 1} />
                        </>
                    )}
                </Arrows>
            </Section>
        </>
    );
};
const Arrows = styled.div`
    position: absolute;
    top: 2.3rem;
    left: 0.5rem;
    right: 0.5rem;

    @media screen and (max-width: 550px){
        top: 2rem;
        left: 0;
        right: 0;
    }

    > .arrow--right{
        position: absolute;
        top: 0;
        right: 0;
    }
    > .arrow--left{
        position: absolute;
        top: 0;
        left: 0;
    }

    button{
        outline: none;
        border: none;
        opacity: 1;
        z-index: 1500;
        border-radius: 50%;
        cursor: pointer;
        padding: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(242, 246, 255);

        svg{
            width: 21px;
            height: 21px;
            stroke: #0085ff;
        }
    }

    > .arrow--disabled {
        svg{
            stroke: #f23023;
        }
    }
`;
const Section = styled.section`
    opacity: 1;
    z-index: 1500;
    position: relative;
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    border-bottom: 0.15rem solid #f2f6ff;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(3rem);
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 0px 0.5px inset;

    @media screen and (max-width: 550px){
        padding: 0.7rem 0.5rem;
    }
`;
const Wrap = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    a{
        width: 61px;
        height: 61px;
        border-radius: 50%;
        border: 1px solid red;
        
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 0 0.1rem rgba(0,0,0,0.5));

        @media screen and (max-width: 550px){
            width: 51px;
            height: 51px;
        }

        img{
            cursor: pointer;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            filter: drop-shadow(0 0 0.1rem rgba(255,255,255,1));

            @media screen and (max-width: 550px){
                width: 45px;
                height: 45px;
            }
        }
    }
    div{
        font-size: 0.8rem;
        font-style: normal;
        font-weight: 500;
        margin-top: 0.3rem;
    }
`;
export default Stories;
