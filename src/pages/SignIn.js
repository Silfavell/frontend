/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import '../style/fonts/icomoon/style.css'
import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

import SiteWrap from '../components/SiteWrap'

class SignIn extends React.Component {
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
                                            <label htmlFor='c_email' className='text-black'>E-Posta</label>
                                            <input type='email' className='form-control' id='c_email' name='c_email' placeholder='E-Posta adresinizi giriniz' />
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='password' className='text-black'>Password</label>
                                            <input type='password' className='form-control' id='password' name='password' placeholder='Şifrenizi giriniz' />
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <div className='col-md-6 d-flex align-items-center justify-content-start'>
                                            <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' />
                                            <label htmlFor='dont-forget' className='form-check-label ml-2'>Beni Unutma</label>
                                        </div>
                                        <div className='col-md-6 d-flex align-items-flex-end justify-content-end'>
                                            <a href='forgot-password'>Şifremi Unuttum</a>
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <div className='col-lg-12'>
                                            <input type='submit' className='btn btn-primary btn-lg btn-block' value='Oturum Aç' />
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

export default SignIn