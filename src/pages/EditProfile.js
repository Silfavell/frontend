/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Cookies from 'universal-cookie'

import '../style/fonts/icomoon/style.css'
import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

import SiteWrap from '../components/SiteWrap'

const cookies = new Cookies()

class EditProfile extends React.Component {

    UNSAFE_componentWillMount() {
        this.setState(cookies.get('user'))
    }

    onNameSurnameChange = (event) => {
        this.setState({ nameSurname: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPhoneChange = (event) => {
        this.setState({ phoneNumber: event.target.value })
    }

    render() {

        const {
            nameSurname,
            email,
            phoneNumber
        } = this.state

        return (
            <SiteWrap divider>
                <div className='container'>
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
                        <div className='col-md-6'>
                            <form action='#' method='post'>
                                <div className='p-3 p-lg-5'>
                                
                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='nameSurname' className='text-black'>Name Surname <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onNameSurnameChange}
                                                type='name'
                                                className='form-control'
                                                id='nameSurname'
                                                name='nameSurname'
                                                placeholder='Adınız ve Soyadınızı giriniz'
                                                value={nameSurname} />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='c_email' className='text-black'>E-Mail <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onEmailChange}
                                                type='email'
                                                className='form-control'
                                                id='c_email'
                                                name='c_email'
                                                placeholder='E-Posta adresinizi giriniz' value={email} />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='phone' className='text-black'>Phone Number <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onPhoneChange}
                                                type='phone'
                                                className='form-control'
                                                id='phone'
                                                name='phone'
                                                placeholder='Telefon Numaranızı giriniz'
                                                value={phoneNumber} />
                                        </div>
                                    </div>

                                    {   /*
                                        <div className='form-group row'>
                                            <div className='col-md-12 d-flex align-items-md-start justify-content-md-start'>
                                                <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' checked />
                                                <label htmlFor='dont-forget' className='form-check-label ml-2'>Tarafımla pazarlama ve tanıtım amaçlı iletişime geçilmesine izin veriyorum.</label>
                                            </div>
                                        </div>
                                        */
                                    }

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' checked disabled />
                                            <label htmlFor='dont-forget' className='form-check-label ml-2'>Üyelik Sözleşmesi şartlarını okudum ve kabul ediyorum.</label>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-lg-12'>
                                            <input type='submit' className='btn btn-primary btn-lg btn-block' value='Kaydet' />
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default EditProfile