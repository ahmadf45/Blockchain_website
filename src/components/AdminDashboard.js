import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Dashboard from '../view/adDashboard'
import Unauthorized from './UnauthorizedAdmin'

class AdminDashboard extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.fetchAccount()
    await this.checkAuthorization()
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

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      authorized: false
    }
  }

  render() {
    let body

    if (this.state.authorized) {
      body = <Dashboard account={this.state.account} />
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

export default AdminDashboard;
