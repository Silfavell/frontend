import React from 'react'
import VanillaToasts from 'vanillatoasts'

import PopupWrapper from '../../components/PopupWrapper/PopupWrapper'

import { deleteAddress } from '../../scripts/requests'

class AddressDeletePopup extends React.PureComponent {
    onConfirm = async () => {
        try {
            const { data, status } = await deleteAddress(this.props.deleteAddressId)
            if (status === 200) {
                VanillaToasts.create({
                    title: `Adresiniz silindi`,
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })
            }

            this.props.hideDeleteAddressPopup(data.addresses)
        } catch (error) {
            this.props.hideDeleteAddressPopup()
        }
    }

    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hideDeleteAddressPopup()
    }

    onCloseClick = (event) => {
        this.props.hideDeleteAddressPopup()
    }

    render() {
        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='p-lg-5'>
                                <div className='form-group row mb-5'>
                                    <div className='col-lg-12'>
                                        <span className='text-black h5'>Adresinizin silinmesini onaylıyor musunuz?</span>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-lg-6 ml-auto'>
                                        <button className='btn btn-primary btn-lg btn-block' onClick={this.onConfirm}>Evet</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PopupWrapper>
        )
    }
}

export default AddressDeletePopup