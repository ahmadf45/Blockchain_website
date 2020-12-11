import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Dashboard from '../view/asDashboard.js'
import UnauthorizedAsesor from './UnauthorizedAsesor'
import Asesor from '../abis/Asesor.json'

class AsesorDashboard extends Component {
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
      const idCount = await asesor.methods.idCount().call()
      this.setState({ idCount })
      
      //load uploads
      for (var i = 1; i <= idCount; i++) {
        const upload = await asesor.methods.uploads(i).call()
        
        this.setState({
          uploads: [...this.state.uploads, upload]
        })
        
      }
      
      console.log(this.state.uploads)
      
    } else {
      window.alert('Asesor contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      authorized: false,
      idCount: 0,
      uploads: []
    }
  }

  render() {
    let body

    if (this.state.authorized) {
      body = <Dashboard account={this.state.account} uploads={this.state.uploads}  />
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

export default AsesorDashboard;
