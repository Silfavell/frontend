import React from 'react'

import PopupWrapper from '../../components/PopupWrapper/PopupWrapper'
import { saveAddress } from '../../scripts/requests'

class AddressPopup extends React.Component {

    state = {
        openAddress: '',
        addressTitle: ''
    }

    onAddressChange = (event) => {
        this.setState({ openAddress: event.target.value })
    }

    onTitleChange = (event) => {
        this.setState({ addressTitle: event.target.value })
    }

    onSaveAddressClick = async () => {
        const { status, data } = await saveAddress(this.state)

        if (status === 200) {
            this.props.hideSaveAddressPopup(data.addresses)
        }
    }

    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hideSaveAddressPopup()
    }

    onCloseClick = (event) => {
        this.props.hideSaveAddressPopup()
    }

    render() {
        const {
            openAddress,
            addressTitle
        } = this.state

        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12'>
                    <div className='m-3 p-lg-5'>
                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='addressTitle' className='text-black'>Adres Başlığı <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onTitleChange}
                                    type='text'
                                    className='form-control'
                                    id='addressTitle'
                                    name='addressTitle'
                                    value={addressTitle}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='openAddress' className='text-black'>Adres <span className='text-danger'>*</span></label>
                                <textarea
                                    onChange={this.onAddressChange}
                                    style={{ resize: 'none' }}
                                    name='openAddress'
                                    id='openAddress'
                                    cols='30'
                                    rows='7'
                                    className='form-control'
                                    value={openAddress}
                                ></textarea>
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className='col-lg-12'>
                                <button className='btn btn-primary btn-lg btn-block' onClick={this.onSaveAddressClick}>Adresi Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </PopupWrapper>
        )
    }
}

export default AddressPopup