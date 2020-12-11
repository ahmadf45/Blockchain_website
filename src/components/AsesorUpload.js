import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Upload from '../view/asUpload.js'
import UnauthorizedAsesor from './UnauthorizedAsesor'
import Asesor from '../abis/Asesor.json'

class AsesorUpload extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.fetchAccount()
    await this.checkAuthorization()
    await this.loadBlockchainData()
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
      '0xdcA04Cee68f5450fb5DDb7Ef92fFe048e6A560bb',
      '0xe366b780adeB8589806954ad3DBDF42668559e11'
    ]
    const authorized = authorizedAccounts.includes(this.state.account)
    this.setState({ authorized })
  }

  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Asesor.networks[networkId]
    if (networkData) {
      const asesor = web3.eth.Contract(Asesor.abi, networkData.address)
      this.setState({ asesor })
    } else {
      window.alert('Asesor contract not deployed to detected network.')
    }
  }

  uploadPost(namaMitra, alamat, tlp, status){
    this.state.asesor.methods.uploadPost(namaMitra, alamat, tlp, status).send({ from: this.state.account })
      .on('transactionHash', function(hash){
        window.open('https://kovan.etherscan.io/tx/'+hash,'_blank')
        window.location.href = '/asesor'
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(receipt)
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      authorized: false,
      uploads: []
    }
    this.uploadPost = this.uploadPost.bind(this)
  }

  render() {
    let body

    if (this.state.authorized) {
      body = <Upload 
              account={this.state.account}
              uploadPost={this.uploadPost}  />
    } else {
      body = <UnauthorizedAsesor account={this.state.account} />
    }

    return (
      <div>
          {body}
      </div>
    );
  }
}

export default AsesorUpload;
