import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    flex:1;
    margin:10px 50px;
    position:relative;
    min-width:200px;
    max-width:200px;
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    background-color:#696969;
    height:350px;
`;

const Image = styled.img`
    height:90%;
    width:100%;
    background-size:cover;
`;

const Info = styled.div`
display:flex;
height:10%;
flex-wrap:wrap;
flex-direction:column;
`;

const Title = styled.h2`
    color:white;
`;
const Desc = styled.div``;

const ProductItemActor = ({ item }) => {

    if (item.person != null) {
        if (item.person.image != null) {
            return (
                <Container>
                    <Image src={item.person.image.medium} />
                    <Info>
                        <Title>
                            {item.person.name}
                        </Title>
                    </Info>
                </Container>
            )
        }
    }
}

export default ProductItemActor