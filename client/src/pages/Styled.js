import styled from "styled-components";

import back from "../pic/back.jpg"

import { Link } from "react-router-dom";

export const colors={
    primary:"#fff",
    theme:"#c62616",
    light1:"#F3F4F6",
    light2:"#35E7EB",
    dark1:"#1F2937",
    dark2:"#4B5563",
    red:"#c62616"
}
export const StyledContainer = styled.div`
    margin=0;
    min-height: 100vh;
    justify-content:center;
    align-items:center;
    background: linear-gradient(0deg,rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${back});
    background-size: 100% 100%;
    background-attachment:fixed;
`;
export const StyledTitle = styled.h2`
    font-size:${(props) => props.size}px;
    text-align:center;
    color:${(props) => props.color ? props.color : colors.primary};
    padding: 5px;
    margin-bottom:20px;
`;
export const StyledSubTitle = styled.p`
    font-size:${(props) => props.size}px;
    text-align:center;
    color:${(props) => props.color ? props.color : colors.primary};
    padding: 5px;
    margin-bottom:25px;  
`;
export const Avater = styled.div`
    width:85px;
    height:85px;
    border-raduis:50px;
    background-image:url:${(props)=> props.image};
    background-size:cover;
    background-position:center;
    margin:auto;
`;
export const StyledButton = styled.button`
    padding: 10px;
    width:210px;
    background-color: transparent;
    font-size: 16px;
    border: 2px solid ${colors.primary};
    border-radius:25px;
    color:${colors.primary};
    text-decoration:none;
    text-align:center;
    transition : ease-in-out 0.4s;

    &:hover{
        background-color: ${colors.theme};
        color:${colors.primary};
        cursor:pointer;
        border:2px solid ${colors.theme}
    }
`;
export const StyledButtonn = styled.button`
    padding: 10px;
    width:210px;
    background-color: transparent;
    font-size: 16px;
    border: 2px solid ${colors.theme};
    border-radius:25px;
    color:${colors.theme};
    text-decoration:none;
    text-align:center;
    transition : ease-in-out 0.4s;

    &:hover{
        background-color: ${colors.theme};
        color:${colors.primary};
        cursor:pointer;
    }
`;
export const ButtonGroup = styled.div`
    display : flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top:70px;
`;

//input
export const StyledInput = styled.input`
    width:280px;
    padding:15px;
    padding-left:50px;
    font-size:17px;
    letter-spacing:1px;
    color:${colors.light2};
    border:0;
    display:block;
    margin: 5px auto 10px auto;
    transition: ease-in-out: 0.3s;

    ${(props)=> props.invalid && `background-color: ${colors.red}; color:${colors.primary};`};

    &:focus{
        background-color: ${colors.dark2};
        color:${colors.primary};
    }
`;
export const StyledLabel = styled.p`
    text-align : screenLeft;
    font-size: 13px;
    font-weight:bold;  
`;
export const StyledFormArea = styled.div`
    background-color:${ props => props.bg || colors.light1};
    text-align:center;
    padding: 45px 55px;
    margin-top:2cm;
    position:absolute;
`;
export const StyledFormButton = styled.button`
    padding: 10px;
    width:210px;
    background-color: transparent;
    font-size: 16px;
    border: 2px solid ${colors.theme};
    border-radius:25px;
    color:${colors.theme};
    transition : ease-in-out 0.4s;

    &:hover{
        background-color: ${colors.theme};
        color:${colors.primary};
        cursor:pointer;
    }
`;
//Icons
export const StyledIcon = styled.p`
    color:${colors.dark1};
    position:absolute;
    font-size:21px;
    top:35px;
    ${(props)=>props.right && `right:15px;`};
    ${(props)=> props.right && `left:15px;`};
`;
