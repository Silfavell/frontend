/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import VanillaToasts from 'vanillatoasts'
import joi from '@hapi/joi'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

import SiteWrap from '../components/SiteWrap'

const cookies = new Cookies()

class SignIn extends React.Component {

    state = {
        phoneNumber: '',
        password: '',

        isPhoneNumberInitialized: false,
        isPasswordInitialized: false,

        invalidPhoneNumber: false,
        invalidPassword: false
    }

    onSignInClick = () => {
        const url = `${process.env.REACT_APP_API_URL}/login`

        const {
            phoneNumber,
            password
        } = this.state

        axios.post(url, { phoneNumber, password }).then(({ status, data }) => {
            if (status === 200) {
                cookies.set('token', data.token)
                localStorage.setItem('favoriteProducts', JSON.stringify(data.user.favoriteProducts))

                if (window.localStorage.getItem('cart')) {
                    axios.post(`${process.env.REACT_APP_API_URL}/user/cart`, JSON.parse(window.localStorage.getItem('cart'))).then(() => {
                        window.localStorage.removeItem('cart')
                        this.props.history.push('/')
                    })
                } else {
                    this.props.history.push('/')
                }
            }
        }).catch((err) => {
            VanillaToasts.create({
                title: err?.response?.data?.error ?? 'Beklenmedik Bir Hata oluştu',
                positionClass: 'topRight',
                type: 'error',
                timeout: 3 * 1000
            })
        })
    }

    onSignUpClick = () => {
        this.props.history.push('/sign-up')
    }

    onPhoneChange = (event) => {
        const { value } = event.target

        joi.string()
            .trim()
            .strict()
            .min(10)
            .max(12)
            .validateAsync(value).then(() => {
                this.setState({ phoneNumber: value, isPhoneNumberInitialized: true, invalidPhoneNumber: false })
            }).catch((err) => {
                if (err.details[0].message.includes('12') && err.details[0].message.includes('equal')) {
                    this.setState({ isPhoneNumberInitialized: true, invalidPhoneNumber: false })
                } else {
                    this.setState({ phoneNumber: value, isPhoneNumberInitialized: true, invalidPhoneNumber: !!err })
                }
            })

    }

    onPasswordChange = (event) => {
        const { value } = event.target

        joi.string()
            .alphanum()
            .min(4)
            .validateAsync(value).then(() => {
                this.setState({ password: value, isPasswordInitialized: true, invalidPassword: false })
            }).catch((err) => {
                this.setState({ password: value, isPasswordInitialized: true, invalidPassword: !!err })
            })
    }

    UNSAFE_componentWillMount() {
        if (cookies.get('token')) {
            this.props.history.push('/')
        }
    }

    render() {
        const divider = [
            { path: null, title: 'Giriş Yap' }
        ]

        const {
            phoneNumber,
            password,
            isPhoneNumberInitialized,
            isPasswordInitialized,
            invalidPhoneNumber,
            invalidPassword
        } = this.state

        return (
            <SiteWrap divider={divider}>
                <div className='container'>
                    <div className='col-md-12 d-flex align-items-center justify-content-center'>
                        <div className='col-md-6'>
                            <div className='p-3 p-lg-5'>
                                <div className='form-group row'>
                                    <div className='col-md-12'>
                                        <label htmlFor='phone_number' className='text-black'>Telefon Numarası</label>
                                        <input
                                            value={phoneNumber}
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
                                        <label htmlFor='password' className='text-black'>Şifre</label>
                                        <input
                                            value={password}
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
                                        <button
                                            className='btn btn-primary btn-lg btn-block'
                                            onClick={this.onSignInClick}
                                            disabled={
                                                invalidPhoneNumber
                                                || !isPhoneNumberInitialized
                                                || invalidPassword
                                                || !isPasswordInitialized
                                            }>Oturum Aç</button>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <button
                                            className='btn btn-primary btn-lg btn-block'
                                            onClick={this.onSignUpClick}
                                        >Üye Ol</button>
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