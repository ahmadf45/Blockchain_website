import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Daftar from '../view/adDaftar'
import Unauthorized from './UnauthorizedAdmin'
import Admin from '../abis/Admin.json'

class AdminDaftar extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.fetchAccount()
    await this.checkAuthorization()
    await this.loadData()
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

  async loadData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Admin.networks[networkId]
    if (networkData) {
      const admin = web3.eth.Contract(Admin.abi, networkData.address)
      this.setState({ admin })
      const idCount = await admin.methods.idCount().call()
      this.setState({ idCount })
      
      //load licenses
      for (var i = 1; i <= idCount; i++) {
        const licence = await admin.methods.licenses(i).call() 
        this.setState({
          licenses: [...this.state.licenses, licence]
        })  
      }
      console.log(this.state.licenses)  
    } else {
      window.alert('Asesor contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      authorized: false,
      idCount:0,
      licenses:[]
    }
  }

  render() {
    let body

    if (this.state.authorized) {
      body = <Daftar account={this.state.account} 
                      licenses={this.state.licenses} />
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

export default AdminDaftar;
