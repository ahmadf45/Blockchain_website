import React, { Component } from 'react';
import styled from 'styled-components'
import Menu from './menu/Menu.js'
import Profile from './menu/Profile.js'

const Container = styled.div`
    background: #14b370;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;


`

class AdSidebar extends Component {
    render(){
        return (
        <Container>
            <Profile />
            <Menu />
        </Container>
    )
    }   
}

export default AdSidebar