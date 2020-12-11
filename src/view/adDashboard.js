import React, { Component } from 'react';
import styled from 'styled-components';
import Sidebar from '../adSidebar/AdSidebar';
import {Row, Col} from 'react-bootstrap';
import ImageDoc from '../img/document.png';
import ImageUp from '../img/upload.png';

const Container = styled.div`
    width: 50%;
    margin-left: 35%;
    margin-top: 15%;
    position: relative;
    padding: 0 4rem;
    align-items: center;
    font-size= 2rem;
`

const ImgDoc = styled.img`
    width: 10rem;
    height : 10rem;
    
`
const ImgUp = styled.img`
    width: 10rem;
    height : 10rem;
`
const ImgTitle = styled.a`
    
    align-items: center;
    text-align: center;
`
const Link = styled.div`
    cursor: pointer;
    
    &:hover {
      background-color: rgba(0,0,0,0.1);
      border-radius: 5px;
    }
`

class Dashboard extends Component {
  render(){
    return (
      <div>
        <Sidebar />
        <Container>
          <Row xs={1} md={2}>
            <Col>
              <Link>
                <Row className="justify-content-md-center">
                  <ImgDoc src={ImageDoc}></ImgDoc>
                </Row>
                <Row className="justify-content-md-center">
                  <ImgTitle>Daftar Dokumen Lisensi</ImgTitle>
                </Row>
              </Link>
            </Col>
            <Col>
              <Link>
                <Row className="justify-content-md-center">
                  <ImgUp src={ImageUp}></ImgUp>
                </Row>
                <Row className="justify-content-md-center">
                  <ImgTitle>Upload Dokumen Lisensi</ImgTitle>
                </Row>
              </Link>
            </Col>
          </Row>
  
        </Container>
      </div>
      
    );
  }
  
}

export default Dashboard;