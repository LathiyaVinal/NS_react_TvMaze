import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductItemActor from './Components/ProductItemsActor';
import ProductItemShows from './Components/ProductItemShows';

const Container = styled.div``;

const TopContainer = styled.div`
    width:100vw;
    height:90vh;
    position:relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("https://i.pinimg.com/originals/4f/6d/05/4f6d052bb1b26150115888ea06d4c106.jpg");
      display:flex;
      align-items:center;
      justify-content:center;
`;

const InsideContainer = styled.div`
    width:70vw;
    height:70vh;
    background: linear-gradient(
      rgba(128, 128, 128, 0.8),
      rgba(128, 128, 128, 0.8)
    )
`;

const Title = styled.h1`
    text-align:left;
    margin-left:4%;
    margin-top:40px;
    font-weight:900;
    font-size:45px;
    color:white;
`;

const SubTitle = styled.h4`
    text-align:left;
    margin-left:4%;
    font-size:30px;
    font-weight:400;
    color:white;
`;

const RadioGrp = styled.div`
    display:flex;
    margin-left:4%;
    margin-top:20px;
`;

const Label = styled.label`
    color:white;
    margin-right:10px;
`;

const RadioInput = styled.input`
    margin-right:3px;
`;

const Input = styled.input`
    padding:5px;
    display:flex;
    margin-left:4%;
    margin-top:10px;
    width:40%;
    border:none;
    border-radius:2px;
`;

const MainContainer = styled.div`
padding:20px;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
background: linear-gradient(
      rgba(128, 128, 128, 1),
      rgba(128, 128, 128, 1)
    )
`;

const ErrorView = styled.h5`
    color:red;
    font-weight:500;
    display:flex;
    margin-left:4%;
    margin-top:10px;
`;

const TagView = styled.h5`
color:yellow;
font-weight:500;
display:flex;
margin-left:4%;
margin-top:20px;
`;

const Home = () => {

    const [data, setData] = useState([]);
    const [radioType, setRadioType] = useState("");
    const [errorView, setErrorView] = useState("");
    const [tagView, setTagView] = useState("");
    const [inputText, setInputText] = useState("");
    const [inputPlaceholder, setPlaceHolder] = useState("eg: Friends...")

    function inputchangeEvent(value){
        console.log("Calue : " + value);

        setInputText(value);
        fetchData(radioType, value);
    }

    function radioButtonChangeEvent(type) {

        if (type === "Actor") {
            setTagView("Enter people below");
            setPlaceHolder("eg: akon");
            setRadioType("Actor");
        fetchData("Actor", inputText);
        }
        else if (type === "Shows") {
            setTagView("Enter shows below");
            setPlaceHolder("eg: Friends...");
            setRadioType("Shows");
            fetchData("Shows", inputText);
        }

       
    }

    function fetchData(type, value) {

        if (type === "Actor") {
            axios.get(`https://api.tvmaze.com/search/people?q=${value}`).
                then((response) => {
                    console.log("Actor response : " + response.data.length);
                    console.log("Actor response : " + response.data);
                    setData(response.data);
                    if (response.data.length <= 0 && value !== "") {
                        setErrorView("No result found!")
                    } else {
                        setErrorView("");
                    }
                }).catch((err) => {
                });
        } else if (type === "Shows") {
            axios.get(`https://api.tvmaze.com/search/shows?q=${value}`).
                then((response) => {

                    console.log("Shows response : " + response.data.length);
                    console.log("Shows response : " + response.data);
                    setData(response.data);
                    if (response.data.length <= 0 && value !== "") {
                        setErrorView("No result found!")
                    } else {
                        setErrorView("");
                    }
                }).catch((err) => {
                });
        }
    }

    return (        
        <Container>
            <TopContainer>
                <InsideContainer>
                    <Title>TVmaze</Title>
                    <SubTitle>Search your favorite shows</SubTitle>
                    <RadioGrp>
                        <RadioInput onChange={() => radioButtonChangeEvent("Actor")} type="radio" id="actor" name="fav_language" value="actor" />
                        <Label for="actor">Actor</Label>
                        <RadioInput onChange={() => radioButtonChangeEvent("Shows")} type="radio" id="shows" name="fav_language" value="shows" />
                        <Label for="shows">Shows</Label><br></br>
                    </RadioGrp>
                    <TagView>{tagView}</TagView>
                    <Input placeholder={inputPlaceholder} onChange={(event) => inputchangeEvent(event.target.value)}>
                    </Input>
                    <ErrorView>{errorView}</ErrorView>
                </InsideContainer>
            </TopContainer>


            <MainContainer>
                {radioType === "Shows" ?
                    data.map((item) => (<ProductItemShows item={item}/>)) :
                    radioType === "Actor" ?
                        data.map((item) => (<ProductItemActor item={item}/>)) : ""
                }
            </MainContainer>
        </Container>
    )
}

export default Home