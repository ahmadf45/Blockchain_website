import React, { Component } from 'react';
import styled from 'styled-components';
import Sidebar from '../mSidebar/MSidebar';
import { Form, Button, Col, Row } from 'react-bootstrap';

const Container = styled.div`
    width: 50%;
    margin-left: 27rem;
    margin-top: 3rem;
    position: relative;
    padding: 0 4rem;
`
const Judul = styled.div`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
`


class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'Belum Diperiksa'
    };

    this.onStatusChange = this.onStatusChange.bind(this);

  }

  
  onStatusChange(event) {
    this.setState({ status: event.target.value });
  }

  render(){
    return (
      <div>
        <Sidebar />
        <Container>
          <Form onSubmit={(event) => {
            event.preventDefault()
            const namaMitra = this.uploadNama.value
            const alamat = this.uploadAlamat.value
            const tlp = this.uploadTlp.value
            const status = this.state.status
            this.props.uploadPost(namaMitra, alamat, tlp, status)
          }}>
            <Judul>Data Pengajuan</Judul>
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Label column sm={3}>
                Nama Mitra
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text"  ref={(input) => { this.uploadNama = input }} required />
              </Col>
            </Form.Group>
  
            <Form.Group as={Row} controlId="exampleForm.ControlInput2">
              <Form.Label column sm={3}>
                Nomor Telepon
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text"  ref={(input) => { this.uploadTlp = input }} required />
              </Col>
            </Form.Group>
  
            <Form.Group as={Row} controlId="exampleForm.ControlInput3">
              <Form.Label column sm={3}>
                Alamat Mitra
              </Form.Label>
              <Col sm={9}>
                <Form.Control as="textarea" rows="3" ref={(input) => { this.uploadAlamat = input }} required/>
              </Col>
            </Form.Group>
  
            
  
            <Form.Group as={Row} controlId="exampleForm.ControlInput3">
              <Col sm={10}></Col>
              <Col sm={2}>
                <Button variant="primary" type="submit" >
                  Submit
                </Button>
              </Col>
            </Form.Group>
  
          </Form>
        </Container>
      </div>
      
    );
  }
  
}

export default Upload;