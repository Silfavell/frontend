import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'

class AddressCard extends React.Component {

    onClick = () => {
        this.props.setSelectedAddress(this.props.index)
    }

    onDeleteClick = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/user/address/${this.props.item._id}`).then(({ status }) => {
            if (status === 200) {
                VanillaToasts.create({
                    title: `Adresiniz silindi`,
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })
            }
        }).catch((err) => {
            console.log(err)

            VanillaToasts.create({
                title: err.response.data.error,
                positionClass: 'topRight',
                type: 'error',
                timeout: 3 * 1000
            })
        })
    }

    render() {
        const {
            openAddress,
            addressTitle
        } = this.props.item

        return (
            <div className='col-md-12 mb-4' style={{
                border: this.props.selected ? '3px solid #80DF80' : '1px solid #dee2e6'
            }} onClick={this.onClick}>
                <div className='row p-4'>
                    <div className='col-md-12'>
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