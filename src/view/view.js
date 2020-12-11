import React, {Component} from 'react';

import Sidebar from '../asSidebar/AsSidebar';
import styled from 'styled-components';
import { Form, Button, Col, Row } from 'react-bootstrap';
import ImageDoc from '../img/logobalitsa.png';

const Container = styled.div`
    position: absolute;
    top:0px; 
    bottom:0px; 
    width: 100%;
    padding: 0 29rem;
    padding-top: 8rem;
    background: #14b370;
`
const Judul = styled.div`
    text-align: Left;
    font-size: 1.8rem;
    padding-top: 1rem;
`

const Subjudul = styled.div`
    text-align: Left;
    font-size: 1.5rem;
`

const Right = styled.div`
    text-align: Right;
`

const Left = styled.div`
    text-align: Left;
`

const Padd = styled.div`
    padding-left: 0.95rem;
    padding-Right: 0.95rem;
`

const ImgDoc = styled.img`
    width: 7rem;
    height : 7rem;
    
`

class View extends Component {

 

  render(){
    return (
    <div>
      
          <br/>
      </Container>
    </div>
    
  );
  }
  
}

export default View;