/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Cookies from 'universal-cookie'
import joi from '@hapi/joi'
import InputMask from 'react-input-mask'

import { bulkCart, login } from '../../scripts/requests'

import SiteWrap from '../../components/SiteWrap/SiteWrap'

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

    constructor(props) {
        super(props)

        if (cookies.get('token')) {
            this.props.history.push('/')
        }
    }

    onSignInClick = async () => {
        const {
            phoneNumber,
            password
        } = this.state
        
        const { status, data } = await login({ phoneNumber, password })
        if (status === 200) {
            cookies.set('token', data.token)
            localStorage.setItem('_id', data.user._id)

            if (data.user.alias) {
                localStorage.setItem('alias', data.user.alias)
            }
            console.log(data.user.favoriteProducts)
            if (data.user.favoriteProducts) {
                localStorage.setItem('favoriteProducts', JSON.stringify(data.user.favoriteProducts))
            } else {
                localStorage.setItem('favoriteProducts', JSON.stringify([]))
            }
            

            if (window.localStorage.getItem('cart')) {
                await bulkCart()

                window.localStorage.removeItem('cart')

                if (document.referrer.includes(window.location.origin)) {
                    this.props.history.goBack()
                } else {
                    this.props.history.push('/')
                }
            } else {
                if (document.referrer.includes(window.location.origin)) {
                    this.props.history.goBack()
                } else {
                    this.props.history.push('/')
                }
            }
        }
    }

    onSignUpClick = () => {
        this.props.history.push('/sign-up')
    }

    onPhoneChange = (event) => {
        const { value } = event.target

        joi.string()
            .trim()
            .strict()
            .min(19)
            .max(19)
            .validateAsync(value).then(() => {
                this.setState({ phoneNumber: value, isPhoneNumberInitialized: true, invalidPhoneNumber: false })
            }).catch((err) => {
                this.setState({ phoneNumber: value, isPhoneNumberInitialized: true, invalidPhoneNumber: !!err })
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

    onSubmitForm = (event) => {
        event.preventDefault()
    }

    render() {
        const breadcrumb = [
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
            <SiteWrap breadcrumb={breadcrumb}>
                <div className='container'>
                    <div className='w-100 d-flex align-items-center justify-content-center'>
                        <div className='col-md-6 px-0'>
                            <div className='p-3 p-lg-5'>
                                <form className='form-group row' autoComplete='off' action='' onSubmit={this.onSubmitForm}>
                                    <div className='col-md-12'>
                                        <label htmlFor='phone_number' className='text-black'>Telefon Numarası</label>
                                        <InputMask
                                            mask='\+\9\0 \(999\) 999 99 99'
                                            value={phoneNumber}
                                            onChange={this.onPhoneChange}
                                        >
                                            <input
                                                type='text'
                                                className='form-control'
                                                id='phone_number'
                                                name='phone'
                                                placeholder='Telefon Numaranızı giriniz' />
                                        </InputMask>
                                    </div>
                                </form>
                                <form className='form-group row' autoComplete='off' action='' onSubmit={this.onSubmitForm}>
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
                                </form>
                                <div className='form-group row'>
                                    <div className='col-6 d-flex align-items-center justify-content-start'>
                                        <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' />
                                        <label style={{ display: 'unset' }} htmlFor='dont-forget' className='form-check-label ml-2'>Beni Unutma</label>
                                    </div>
                                    <div className='col-6 d-flex align-items-flex-end justify-content-end'>
                                        <a href='/forgot-password'>Şifremi Unuttum</a>
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