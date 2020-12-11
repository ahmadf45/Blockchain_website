import React, { Component } from 'react';
import styled from 'styled-components';
import Sidebar from '../adSidebar/AdSidebar';
import { Form, Button, Col, Row } from 'react-bootstrap';
import md5 from 'crypto-js/md5';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const Container = styled.div`
    width: 50%;
    margin-left: 27rem;
    margin-top: 1rem;
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
    super(props)
    this.state = {
      value: '',
      namaMitra:'',
      select:[],
      alamat:'',
      status:'',
      tlp:'',
      author:'',
      noLisensi:'',
      buffer:null,
      ipfsHash:'',
      checksumFile:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const arr = event.target.value;
    const [namaR, alamatR, tlpR, statusR, authorR] = arr.split(',');
    this.setState({namaMitra: namaR});
    this.setState({alamat: alamatR});
    this.setState({tlp: tlpR});
    this.setState({status: statusR});
    this.setState({author: authorR});

  }

  captureFile = (event) =>{
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      const buffer = Buffer(reader.result).toString()
      const md5hash = md5(buffer)
      this.setState({ checksumFile: md5hash.toString() })

      //get ipfshash link
      console.log("Submitting file to ipfs...")
      ipfs.add(this.state.buffer, (error, result) => {
        console.log('Ipfs result', result)
        const hash = result[0].hash.toString()
        this.setState({ ipfsHash: hash })
        if(error) {
          console.error(error)
          return
        }
      })

    }
  }

  handleUpload = (event) => {
    event.preventDefault()
    
  }

  handleSubmit=(event)=>{
    event.preventDefault()
    const noLisensi = this.uploadNoLisensi.value.toString()
    const namaMitra = this.state.namaMitra
    const alamat = this.state.alamat
    const tlp = this.state.tlp
    const ipfsHash = this.state.ipfsHash
    const checksumFile = this.state.checksumFile
    this.props.uploadTx(noLisensi, namaMitra, alamat, tlp, ipfsHash, checksumFile)
    console.log(noLisensi,namaMitra, alamat, tlp, ipfsHash, checksumFile)
  }

  render(){
    return (
      <div>
        <Sidebar />
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Judul>Upload Dokumen Lisensi</Judul>
            
            <Form.Group as={Row} controlId="exampleForm.ControlInput1">
              <Form.Control as="select" value={this.state.select} onChange={this.handleChange}>
                <option>Pilih Mitra</option>
                  {this.props.uploads.map((upload,key) => {
                    return(    
                    <option key={upload.id} value={[upload.namaMitra,upload.alamat,upload.tlp,upload.status, upload.author]} >
                    {upload.namaMitra}</option>
                    )
                  })}
              </Form.Control>
            </Form.Group>
              
            <Form.Group as={Row} controlId="exampleForm.ControlInput2">
              <Form.Label column sm="3">
                Nama Mitra
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" value={this.state.namaMitra} disabled />
              </Col> 
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput2">
              <Form.Label column sm="3">
                Nomor Telepon
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" value={this.state.tlp}  disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput2">
              <Form.Label column sm="3">
                Alamat
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" value={this.state.alamat}  rows="3" disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput2">
              <Form.Label column sm="3">
                Status
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" value={this.state.status}  disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput2">
              <Form.Label column sm="3">
                Asesor
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" value={this.state.author} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput2">
              <Form.Label column sm="3">
                No Dokumen
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" ref={(input) => { this.uploadNoLisensi = input }} required />
              </Col>
            </Form.Group>
  
            <Form.Group as={Row} controlId="exampleForm.ControlInput3">
              <Form.Label column sm="3">
                File Dokumen
              </Form.Label>
              <Col column sm="6">
                <input type="file" onChange={this.captureFile} accept="application/pdf"/>
              </Col>
              <Col column sm="3">
                <Button href={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`} target="_blank">Lihat File</Button>    
              </Col>          
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput2">
              <Form.Label column sm="3">
                IPFS Hash
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" value={this.state.ipfsHash} readOnly />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput2">
              <Form.Label column sm="3">
                Checksum File
              </Form.Label>
              <Col sm="9">
                <Form.Control type="text" value={this.state.checksumFile} disabled />
              </Col>
            </Form.Group>
  
            <Form.Group as={Row} controlId="exampleForm.ControlInput3">
              <Col sm={10}></Col>
              <Col sm={2}>
                <Button disabled={(this.state.namaMitra.length<1)||(this.state.ipfsHash.length<1)} variant="primary" type="submit" >
                  Submit
                </Button>
              </Col>
            </Form.Group>
  
          </Form>
          <br/>
          
        </Container>
      </div>
      
    );
  }

  
}

export default Upload;