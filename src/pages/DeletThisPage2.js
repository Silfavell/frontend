import React from 'react'
import KVKK from './SignUp/KvkkAgreement'


class DeletThisPage2 extends React.Component { // TODO

  state = {
    showKvkkAgreementPopup: true
  }

  hideSalesContractPopup = () => { }

  render() {
    return (
      <>
        {
          this.state.showKvkkAgreementPopup && <KVKK hideKvkkAgreementPopup={() => { }} />
        }
      </>
    )
  }
}

export default DeletThisPage2