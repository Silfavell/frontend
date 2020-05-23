/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import '../style/fonts/icomoon/style.css'
import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

import SiteWrap from '../components/SiteWrap'

class SignUp extends React.Component {
    render() {
        return (
            <SiteWrap divider>
                <div className='container'>
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
                        <div className='col-md-6'>
                            <form action='#' method='post'>
                                <div className='p-3 p-lg-5'>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='name' className='text-black'>Name <span className='text-danger'>*</span></label>
                                            <input type='name' className='form-control' id='name' name='name' placeholder='Adınızı giriniz' />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='surname' className='text-black'>Surname <span className='text-danger'>*</span></label>
                                            <input type='name' className='form-control' id='surname' name='surname' placeholder='Soyadınızı giriniz' />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='c_email' className='text-black'>E-Mail <span className='text-danger'>*</span></label>
                                            <input type='email' className='form-control' id='c_email' name='c_email' placeholder='E-Posta adresinizi giriniz' />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='password' className='text-black'>Password <span className='text-danger'>*</span></label>
                                            <input type='password' className='form-control' id='password' name='password' placeholder='Şifrenizi giriniz' />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='repassword' className='text-black'>Password (repeat) <span className='text-danger'>*</span></label>
                                            <input type='password' className='form-control' id='repassword' name='repassword' placeholder='Şifrenizi yeniden giriniz' />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='phone' className='text-black'>Phone Number <span className='text-danger'>*</span></label>
                                            <input type='phone' className='form-control' id='phone' name='phone' placeholder='Telefon Numaranızı giriniz' />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' />
                                            <label htmlFor='dont-forget' className='form-check-label ml-2'>Üyelik Sözleşmesi şartlarını okudum ve kabul ediyorum.</label>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12 d-flex align-items-md-start justify-content-md-start'>
                                            <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' />
                                            <label htmlFor='dont-forget' className='form-check-label ml-2'>Tarafımla pazarlama ve tanıtım amaçlı iletişime geçilmesine izin veriyorum.</label>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-lg-12'>
                                            <input type='submit' className='btn btn-primary btn-lg btn-block' value='Üye Ol' />
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

export default SignUp