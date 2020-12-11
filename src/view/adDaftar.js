import React,{ Component } from 'react';
import styled from 'styled-components';
import Sidebar from '../adSidebar/AdSidebar';
import { Table, Button } from 'react-bootstrap';

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    margin-top: 3rem;
    position: relative;
    padding: 0 4rem;
`
const Judul = styled.div`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
`
const Fs = styled.div`
    font-size: 0.82rem;
`

class Daftar extends Component {
  render(){
    return (
    <div>
      <Sidebar/>
      <Container>
        <Judul>
          Daftar Dokumen Lisensi
        </Judul>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nomor Dokumen</th>
              <th>Nama Mitra</th>
              <th>Nomor Telepon</th>
              <th>Alamat</th>
              <th>Dokumen</th>
            </tr>
          </thead>
          <tbody>
            { this.props.licenses.map((lisensi, key) => {
              return(
                <tr key={key}>
                  <th width="20%"><Fs>{lisensi.noLisensi}</Fs></th>
                  <td width="20%"><Fs>{lisensi.namaMitra}</Fs></td>
                  <td width="20%"><Fs>{lisensi.tlp}</Fs></td>
                  <td width="32%"><Fs>{lisensi.alamat}</Fs></td>
                  <td width="8%"><Button href={`https://ipfs.infura.io/ipfs/${lisensi.ipfsHash}`} target="_blank" variant="info">Lihat</Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </div>
    
  );
  }

  
}

export default Daftar;