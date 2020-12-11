import React, { Component } from 'react';
import styled from 'styled-components';
import Sidebar from '../asSidebar/AsSidebar';
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
            <Judul>Upload Hasil Pengecekan Fasilitas</Judul>
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
  
            <fieldset>
              <Form.Group as={Row} controlId="exampleForm.ControlInput4">
                <Form.Label as="legend" column sm={3}>
                  Status
                </Form.Label>
                <Col sm={9}>
                  <Form.Check
                    type="radio"
                    label="Ya"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    value="Ya"
                    checked={this.state.status === "Ya"}
                    onChange={this.onStatusChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Tidak"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    value="Tidak"
                    checked={this.state.status === "Tidak"}
                    onChange={this.onStatusChange}
                  />
                </Col>
              </Form.Group>
            </fieldset>
  
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