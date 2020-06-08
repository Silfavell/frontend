import React from 'react'

class AddressCard extends React.Component {

    onClick = () => {
        this.props.setSelectedAddress(this.props.index)
    }

    onDeleteClick = () => {
        this.props.showDeleteAddressPopup(this.props.item._id)
    }

    render() {
        const {
            openAddress,
            addressTitle
        } = this.props.item

        return (
            <div className='col-md-12 mb-4' style={{
                border: this.props.selected ? '2px solid #80DF80' : '1px solid #dee2e6'
            }} onClick={this.onClick}>
                <div className='row p-4'>
                    <div className='col-md-12' style={{ fontWeight: 'bold' }}>
                        {
                            addressTitle
                        }
                    </div>
                    <div className='col-md-12'>
                        {
                            openAddress
                        }
                    </div>
                    <div className='col-md-12'>
                        <span className='text-primary float-md-right' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={this.onDeleteClick}>
                            Sil
                    </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddressCard