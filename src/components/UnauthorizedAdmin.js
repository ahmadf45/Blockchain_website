import React, { Component } from 'react';
import styled from 'styled-components'


const Center = styled.div`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
`

class Unauthorized extends Component {
  render() {
    return (
      <div>
        <Center>
          <p>Hanya Admin yang Diizinkan untuk mengakses halaman ini!</p>
          <p>Silah login terlebih dahulu melalui Ekstensi Metamask!</p>
        </Center>
        
      </div>
    );
  }
}

export default Unauthorized;
