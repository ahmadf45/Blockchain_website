import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    margin-top: 2rem;
    width: 100%;
`

const Link = styled.a`
    order-left: 5px solid ${props => props.active ? props.theme.activeMenu : "transparent"};
    width: 14.7rem;
    height : 3rem;
    padding-left: 2rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: 0.2s all ease-in-out;
    color: black;
    font-size: 1.2rem;
    margin-right: 1rem;
    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
    &:visited {
        text-decoration: none;
    }
    &:link {
        text-decoration: none;
    }
    &:active {
        background-color: rgba(0,0,0,0.5);
    }
    &:focus {
        background-color: rgba(0,0,0,0.5);
    }
`
const List = styled.div`
    border-style: double;
    border-radius: 5px;
    margin-left : 0.5rem;
    margin-right : 0.5rem;
    margin-bottom : 0.5rem;

`


const Menu = () => {
    return (
        <Container>          
                <List><Link icon={'home'} href="/asesor">Dashboard</Link></List>
                <List><Link icon={'file-multiple'} href="/uploadhasil">Upload</Link></List>
        </Container>
    )
}

export default Menu