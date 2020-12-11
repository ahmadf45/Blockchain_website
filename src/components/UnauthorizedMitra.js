import React, { Component } from 'react';
import styled from 'styled-components'


const Center = styled.div`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
`

class UnauthorizedMitra extends Component {
  render() {
    return (
      <div>
        <Center>
          <p>Hanya Mitra yang diizinkan untuk mengakses halaman ini!</p>
          <p>Silahkan login terlebih dahulu melalui Ekstensi Metamask!</p>
        </Center>
      </div>
    );
  }
}

export default UnauthorizedMitra;
