import React from 'react'

import {
    FaCcVisa,
    FaCcMastercard
} from 'react-icons/fa'

class PaymentCard extends React.PureComponent {
    getCardLogo = () => {
        switch (this.props.item.cardAssociation) {
            case 'MASTER_CARD': return <FaCcMastercard size={48} color='black' />

            case 'VISA': return <FaCcVisa size={48} color='black' />

            default: return null
        }
    }

    onClick = () => {
        this.props.setSelectedCard(this.props.index)
    }

    onDeleteClick = () => {
        this.props.showDeleteCardPopup(this.props.item.cardToken)
    }

    render() {
        return (
            <div
                className='col-md-12 mb-4'
                style={{
                    border: this.props.selected ? '1px solid #80DF80' : '1px solid #dee2e6'
                }}
                onClick={this.onClick}>
                <div className='row p-4'>
                    <div className='col-md-12'>
                        <span className='text-black font-weight-bold'>{this.props.item.cardAlias}</span>

                        <span style={{ fontWeight: 'normal' }} className='pl-4'>{`**** **** **** ${this.props.item.lastFourDigits}`}</span>

                        <span style={{ fontWeight: 'normal' }} className='pl-5'>
                            {
                                this.getCardLogo()
                            }
                        </span>

                        <span
                            className='text-primary float-md-right'
                            style={{ fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={this.onDeleteClick}>
                            Sil
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default PaymentCard
