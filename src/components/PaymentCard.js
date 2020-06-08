import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'

class PaymentCard extends React.Component {

    onClick = () => {
        this.props.setSelectedCard(this.props.index)
    }

    onDeleteClick = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/payment-card`, {
            cardToken: this.props.item.cardToken
        }).then(({ status }) => {
            if (status === 200) {
                VanillaToasts.create({
                    title: 'Kart silindi',
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })
            }
        })
    }

    render() {
        return (
            <div className='col-md-12 mb-4' style={{
                border: this.props.selected ? '3px solid #80DF80' : '1px solid #dee2e6'
            }} onClick={this.onClick}>
                <div className='row p-4'>
                    <div className='col-md-12'>
                        <label className='text-black float-md-left font-weight-bold'>{this.props.item.cardAlias}</label>

                        <span style={{ fontWeight: 'normal' }} className={'pl-4'}>{`**** **** **** ${this.props.item.lastFourDigits}`}</span>

                        <span style={{ fontWeight: 'normal' }} className={'pl-4'}>
                            <img alt='' src={'https://n11scdn.akamaized.net/static/new-design/static/img/layout/mastercard-logo.png?v=1590583905836'} />
                        </span>

                        <span className='text-primary float-md-right' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={this.props.showDeleteAddressPopup}>
                            Sil
                        </span>

                    </div>
                </div>
            </div>
        )
    }
}

export default PaymentCard