import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Upload from '../view/adUpload'
import Unauthorized from './UnauthorizedAdmin'
import Asesor from '../abis/Asesor.json'
import Admin from '../abis/Admin.json'

class AdminUpload extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.fetchAccount()
    await this.checkAuthorization()
    await this.loadDataAsesor()
    await this.loadDataAdmin()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async fetchAccount() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  async checkAuthorization() {
    const authorizedAccounts = [
      '0xb3e674a33FD0532b7BfAaFc7141237cF474916FB',
    ]
    const authorized = authorizedAccounts.includes(this.state.account)
    this.setState({ authorized })
  }

  async loadDataAsesor(){
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = Asesor.networks[networkId]
    if (networkData) {
      const asesor = web3.eth.Contract(Asesor.abi, networkData.address)
      this.setState({ asesor })
      const idCount = await asesor.methods.idCount().call()
      this.setState({ idCount })
      
      //load uploads asesor
      for (var i = 1; i <= idCount; i++) {
        const upload = await asesor.methods.uploads(i).call()
        
        this.setState({
          uploads: [...this.state.uploads, upload]
        })
        
      }

    } else {
      window.alert('Asesor contract not deployed to detected network.')
    }
  }

  async loadDataAdmin(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Admin.networks[networkId]
    if (networkData) {
      const admin = web3.eth.Contract(Admin.abi, networkData.address)
      this.setState({ admin: admin })
    } else {
      window.alert('Admin contract not deployed to detected network.')
    }
  }

  uploadTx(noLisensi, namaMitra, alamat, tlp, ipfsHash, checksumFile){
    this.state.admin.methods.uploadTx(noLisensi, namaMitra, alamat, tlp, ipfsHash, checksumFile).send({ from: this.state.account })
    .on('transactionHash', function(hash){
      window.open('https://kovan.etherscan.io/tx/'+hash,'_blank')
      window.location.href = '/daftardokumen'
    })
    .on('confirmation', function(confirmationNumber, receipt){
      console.log(receipt)
    })
    //console.log(this.state.admin)
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      authorized: false,
      idCount: 0,
      uploads: []
    }
    this.uploadTx = this.uploadTx.bind(this)
  }

  render() {
    let body

    if (this.state.authorized) {
      body = <Upload uploads={this.state.uploads}
                     account={this.state.account}
                     uploadTx={this.uploadTx} />
    } else {
      body = <Unauthorized account={this.state.account} />
    }

    return (
      <div>
          {body}
      </div>
    );
  }
}

export default AdminUpload;
