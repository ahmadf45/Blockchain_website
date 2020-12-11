import React from 'react';
import styled from 'styled-components';
import Image from '../../img/profile.png';

const Container = styled.div`
    margin-top: 5rem;
`

const ProfileImg = styled.img`
    height: 5rem;
`
const ProfileName = styled.h1`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
`

const Profile = () => {
    return (
        <Container>
            <ProfileImg src={Image} />
            <ProfileName>Asesor</ProfileName>
        </Container>
    )
}

export default Profile