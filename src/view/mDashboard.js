import React, {Component} from 'react';
import styled from 'styled-components';
import Sidebar from '../mSidebar/MSidebar';

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem;
    margin-top: 2rem;
`

class Dashboard extends Component {

  render(){
    return (
    <div>
      <Sidebar />
      <Container>
      <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Mitra</th>
              <th scope="col">Nomor Telepon</th>
              <th scope="col">Alamat</th>
              <th scope="col">Status</th>
              <th scope="col">Address</th>
              <th scope="col">Verify</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.uploads.map((upload, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{upload.id.toString()}</th>
                  <td>{upload.namaMitra}</td>
                  <td>{upload.tlp} </td>
                  <td>{upload.alamat}</td>
                  <td>{upload.status}</td>
                  <td>{upload.author}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Container>
    </div>
    
  );
  }
  
}

export default Dashboard;