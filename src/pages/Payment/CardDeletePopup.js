import React from 'react'
import VanillaToasts from 'vanillatoasts'

import PopupWrapperHoc from '../../components/PopupWrapper/PopupWrapper'

import { removeCard } from '../../scripts/requests'

class CardDeletePopup extends React.PureComponent {
    onConfirm = async () => {
        try {
            const { status } = await removeCard({ cardToken: this.props.deleteCardToken })
            if (status === 200) {
                VanillaToasts.create({
                    title: 'Kart silindi',
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })

                this.props.hidePopup(this.props.deleteCardToken)
            }
        } catch (error) {
            this.props.hidePopup()
        }
    }

    render() {
        return (
            <div className='col-md-12'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='p-lg-5'>
                            <div className='form-group row mb-5'>
                                <div className='col-lg-12'>
                                    <span className='text-black h5'>Kartınızın silinmesini onaylıyor musunuz?</span>
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
        )
    }
}

export default PopupWrapperHoc(CardDeletePopup)