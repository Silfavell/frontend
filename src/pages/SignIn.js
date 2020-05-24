/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import '../style/fonts/icomoon/style.css'
import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

import SiteWrap from '../components/SiteWrap'

const cookies = new Cookies()

class SignIn extends React.Component {

    state = {
        phoneNumber: '905466666666',
        password: '1234'
    }

    onSignInClick = () => {
        const url = `${process.env.REACT_APP_API_URL}/login`

        axios.post(url, this.state).then(({ status, data }) => {
            if (status === 200) {
                cookies.set('token', data.token)
                cookies.set('user', JSON.stringify(data.user))
                this.props.history.push('/')
            }
        })
    }

    onPhoneChange = (event) => {
        this.setState({ phoneNumber: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    UNSAFE_componentWillMount() {
        if (cookies.get('token')) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <SiteWrap divider>
                <div className='container'>
                    <div className='col-md-12 d-flex align-items-center justify-content-center'>
                        <div className='col-md-6'>
                            <div className='p-3 p-lg-5'>
                                <div className='form-group row'>
                                    <div className='col-md-12'>
                                        <label htmlFor='phone_number' className='text-black'>Phone Number</label>
                                        <input
                                            value={this.state.phoneNumber}
                                            onChange={this.onPhoneChange}
                                            type='tel'
                                            className='form-control'
                                            id='phone_number'
                                            name='phone_number'
                                            placeholder='Telefon Numaranızı giriniz' />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-md-12'>
                                        <label htmlFor='password' className='text-black'>Password</label>
                                        <input
                                            value={this.state.password}
                                            onChange={this.onPasswordChange}
                                            type='password'
                                            className='form-control'
                                            id='password'
                                            name='password'
                                            placeholder='Şifrenizi giriniz' />
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
                                        <button className='btn btn-primary btn-lg btn-block' onClick={this.onSignInClick}>Oturum Aç</button>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <a href='/sign-up'>
                                            <button className='btn btn-primary btn-lg btn-block'>Üye Ol</button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default SignIn