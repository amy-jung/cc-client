import React, { Component } from 'react'
import { binder } from '../../utils/'

class componentName extends Component {
  constructor(props) {
    super(props);
    binder(this, ['renderTransactions'])
  }

  componentDidMount() {

  }

  renderTransactions () {
    console.log(this.props.transactions)    
    return this.props.transactions.map((trans, i) => {
      return(
        <tr key={i}>
          <th>{ trans }</th>
          <th>some date</th> 
        </tr>
      )
    })
  }

  render() {
    return <div className="image-transaction-history">
        transaction history
        <table>
          <thead>
            <tr>
              <th>from-address</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTransactions() }
          </tbody>
        </table>
      </div>
  }
}
export default componentName;