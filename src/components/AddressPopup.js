import React from 'react'
import PopupWrapper from './PopupWrapper'

class AddressPopup extends React.Component {

    onSaveAddressClick = () => {
        console.log('save address')
    }

    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hideSaveAddressPopup()
    }

    render() {
        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick}>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='m-3 p-lg-5'>
                                <div className='form-group row'>
                                    <div className='col-md-12'>
                                        <label htmlFor='c_fname' className='text-black'>Adres Başlığı <span className='text-danger'>*</span></label>
                                        <input type='text' className='form-control' id='c_fname' name='c_fname' />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-md-4'>
                                        <label htmlFor='c_subject' className='text-black'>Building No <span className='text-danger'>*</span></label>
                                        <input type='text' className='form-control' id='c_subject' name='c_subject' />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor='c_subject' className='text-black'>Floor <span className='text-danger'>*</span></label>
                                        <input type='text' className='form-control' id='c_subject' name='c_subject' />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor='c_subject' className='text-black'>Apt. No <span className='text-danger'>*</span></label>
                                        <input type='text' className='form-control' id='c_subject' name='c_subject' />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <div className='col-md-12'>
                                        <label htmlFor='c_message' className='text-black'>Adres <span className='text-danger'>*</span></label>
                                        <textarea name='c_message' id='c_message' cols='30' rows='4' className='form-control'></textarea>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-lg-12'>
                                        <button className='btn btn-primary btn-lg btn-block' onClick={this.onSaveAddressClick}>Adresi Kaydet</button>
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

export default AddressPopup