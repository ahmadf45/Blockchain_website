import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Admin from '../abis/Admin.json'
import styled from 'styled-components';
import { Form, Button, Col, Row, Modal, Badge } from 'react-bootstrap';
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
const Center = styled.div`
    text-align: Center;
    font-size: 1.5rem;
`

const Padd = styled.div`
    padding-left: 0.95rem;
    padding-Right: 0.95rem;
`

const ImgDoc = styled.img`
    width: 7rem;
    height : 7rem;
    
`

class Verifikasi extends Component {

    async componentWillMount() {
      await this.loadBlockchainData()
    }
    
    async loadBlockchainData() {
      const web3 = new Web3('https://api.infura.io/v1/jsonrpc/kovan', '0x4aad895a6869e2e241c0ab156d09309f09a77d95')
      //const web3 = new Web3('http://127.0.0.1:7545', '0x9197797751063c72cc6ef5b13910A6c22A62FeB9')
      const accounts = '0xe2f659a692557f6a0063efb0e69798ab44422bd2'
      this.setState({ account: accounts })
      const networkId = 42
      const networkData = Admin.networks[networkId]
      if(networkData) {
        const contract = web3.eth.Contract(Admin.abi, networkData.address)
        this.setState({ contract })
      } else {
        window.alert('Smart contract not deployed to detected network.')
        }
    }

    verifikasi(noLisensi){
      this.state.contract.methods.getByNoLisensi(noLisensi).call()
      .then((response)=>{
        const noLisensi = response[1]
        const namaMitra = response[2]
        const alamat = response[3]
        const tlp = response[4]
        const ipfsHash = response[5]
        const checksumFile = response[6]
        this.setState({noLisensi: noLisensi})
        this.setState({namaMitra: namaMitra})
        this.setState({alamat: alamat})
        this.setState({tlp: tlp})
        this.setState({ipfsHash: ipfsHash})
        this.setState({checksumFile: checksumFile})
        if(this.state.namaMitra===''){
          this.setState({showEr: true})
        } else{
          this.setState({show: true})
        }
        
      })
    }

    handleSubmit=(event)=>{
      event.preventDefault()
      const noLisensi = this.uploadNoLisensi.value.toString()
      this.setState({ valueLisensi: noLisensi})
      this.verifikasi(noLisensi)
      
    }

    handleModal(){
      this.setState({show: false})
      this.setState({showEr: false})
    }

    
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      authorized: false,
      response:[],
      valueLisensi:'',
      show: false,
      showEr: false,
      noLisensi:'',
      namaMitra:'',
      alamat:'',
      tlp:'',
      ipfsHash:'',
      checksumFile:''
    }
    this.verifikasi = this.verifikasi.bind(this)
  } 

  render() {
    return (
      <div>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="exampleForm.ControlInput3">
              <Col column sm="3">
                  <ImgDoc src={ImageDoc}></ImgDoc>
              </Col>
              <Col column sm="9">
                  <Judul>BALITSA<br/></Judul><Subjudul>Verifikasi Dokumen Lisensi</Subjudul>
              </Col>
            </Form.Group>
              
            <Padd><Form.Group as={Row} controlId="exampleForm.ControlInput2">    
              <Form.Control type="text" onChange={this.onChange} placeholder="Masukan Nomor Dokumen Lisensi" ref={(input) => { this.uploadNoLisensi = input }} required/>  
            </Form.Group></Padd>
              
            <Form.Group as={Row} controlId="exampleForm.ControlInput3">
              <Col column sm="8">
                <Left><input type="file"/></Left>
              </Col>     
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlInput3">
              <Col column sm="8"> 
              </Col>
              <Col column sm="4">
                <Right><Button variant="secondary" type="submit" >Check File</Button></Right>    
              </Col>          
            </Form.Group>
          </Form>
        </Container>

        <Modal show={this.state.show} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Body>
            <Form>
              <Center><Badge variant="success">Nomor Dokumen Valid</Badge></Center><br/>
              
              <Form.Group as={Row} controlId="exampleForm.ControlInput2">
                <Form.Label column sm="3">
                  No Lisensi
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" value={this.state.noLisensi} disabled />
                </Col> 
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
                  No Telepon
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" value={this.state.tlp} disabled />
                </Col> 
              </Form.Group>
              <Form.Group as={Row} controlId="exampleForm.ControlInput2">
                <Form.Label column sm="3">
                  Alamat
                </Form.Label>
                <Col sm="9">
                  <Form.Control as="textarea" rows="3" value={this.state.alamat} disabled />
                </Col> 
              </Form.Group>
              <Form.Group as={Row} controlId="exampleForm.ControlInput2">
                <Form.Label column sm="3">
                  File
                </Form.Label>
                <Col sm="9">
                  <Button href={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`} target="_blank">Lihat File Dokumen</Button>
                </Col> 
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={()=>{this.handleModal()}} variant="secondary">Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showEr} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Body>
            <Form>
              <Center><Badge variant="danger">Nomor Dokumen Tidak Valid</Badge></Center><br/>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={()=>{this.handleModal()}} variant="secondary">Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default Verifikasi;
