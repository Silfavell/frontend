/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import Cookies from 'universal-cookie'
import joi from '@hapi/joi'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

import SiteWrap from '../components/SiteWrap'

const cookies = new Cookies()

class SignUp extends React.Component {

    state = {
        phoneNumber: '',
        nameSurname: '',
        email: '',
        password: '',
        // rePassword: '',
        activationCode: '',

        invalidPhoneNumber: false,
        invalidPassword: false,
        invalidNameSurname: false,
        invalidEmail: false,

        isPhoneNumberInitialized: false,
        isPasswordInitialized: false,
        isNameSurnameInitialized: false,
        isEmailInitialized: false
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
            .min(4)
            .validateAsync(value).then(() => {
                this.setState({ password: value, isPasswordInitialized: true, invalidPassword: false })
            }).catch((err) => {
                this.setState({ password: value, isPasswordInitialized: true, invalidPassword: !!err })
            })
    }

    onRePasswordChange = (event) => {
        const { value } = event.target

        joi.string()
            .min(4)
            .validateAsync(value).then(() => {
                this.setState({ password: value, isPasswordInitialized: true, invalidPassword: false })
            }).catch((err) => {
                this.setState({ password: value, isPasswordInitialized: true, invalidPassword: !!err })
            })
    }

    onNameSurnameChange = (event) => {
        const { value } = event.target

        joi.string()
            .trim()
            .validateAsync(value).then(() => {
                this.setState({ nameSurname: value, isNameSurnameInitialized: true, invalidNameSurname: false })
            }).catch((err) => {
                this.setState({ nameSurname: value, isNameSurnameInitialized: true, invalidNameSurname: !!err })
            })
    }

    onEmailChange = (event) => {
        const { value } = event.target

        joi.string()
            .trim()
            .strict()
            .email({ tlds: { allow: false } })
            .validateAsync(value).then(() => {
                this.setState({ email: value, isEmailInitialized: true, invalidEmail: false })
            }).catch((err) => {
                this.setState({ email: value, isEmailInitialized: true, invalidEmail: !!err })
            })
    }

    onActivationCodeChange = (event) => {
        const { value } = event.target

        joi.string()
            .trim()
            .strict()
            .min(4)
            .max(4)
            .validateAsync(value).then(() => {
                this.setState({ activationCode: value, isActivationCodeInitialized: true, invalidActivationCode: false })
            }).catch((err) => {
                if (err.details[0].message.includes('4') && err.details[0].message.includes('equal')) {
                    this.setState({ isActivationCodeInitialized: true, invalidActivationCode: false })
                } else {
                    this.setState({ activationCode: value, isActivationCodeInitialized: true, invalidActivationCode: !!err })
                }
            })
    }

    onSignUpClick = () => {
        const url = `${process.env.REACT_APP_API_URL}/register`

        const {
            phoneNumber,
            nameSurname,
            email,
            password,
            // rePassword,
            activationCode
        } = this.state

        axios.post(url, {
            phoneNumber,
            nameSurname,
            email,
            password,
            // rePassword,
            activationCode
        }).then(({ status, data }) => {
            if (status === 200) {
                cookies.set('token', data.token)
                this.props.history.push('/')
            }
        })
    }

    sendActivationCode = () => {
        //  if (this.state.password !== this.state.rePassword) {
        //      VanillaToasts.create({
        //          title: `Yeni şifreniz tekrarı ile eşleşmemektedir.`,
        //          positionClass: 'topRight',
        //          type: 'success',
        //          timeout: 3 * 1000
        //      })
        //  } else

        const url = `${process.env.REACT_APP_API_URL}/send-activation-code`

        axios.post(url, {
            phoneNumber: this.state.phoneNumber,
            activationCodeType: 0
        }).then(({ status, data }) => {
            if (status === 202) {
                $('#register').hide()
                $('#activation').fadeIn('slow')
            }
        })
        //}
    }

    renderSignUpScreen = () => {
        const {
            phoneNumber,
            nameSurname,
            email,
            password,
            // rePassword
        } = this.state

        return (
            <div id={'register'} className='p-3 p-lg-5'>

                <div className='form-group row'>
                    <div className='col-md-12'>
                        <label htmlFor='nameSurname' className='text-black'>Adınız Soyadınız <span className='text-danger'>*</span></label>
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
                        <label htmlFor='c_email' className='text-black'>E-Posta <span className='text-danger'>*</span></label>
                        <input
                            onChange={this.onEmailChange}
                            type='email'
                            className='form-control'
                            id='c_email'
                            name='c_email'
                            placeholder='E-Posta adresinizi giriniz'
                            value={email} />
                    </div>
                </div>

                <div className='form-group row'>
                    <div className='col-md-12'>
                        <label htmlFor='password' className='text-black'>Şifre <span className='text-danger'>*</span></label>
                        <input
                            onChange={this.onPasswordChange}
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            placeholder='Şifrenizi giriniz'
                            value={password} />
                    </div>
                </div>

                {
                    /*
                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='repassword' className='text-black'>Şifre (repeat) <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onRePasswordChange}

                                    type='password'
                                    className='form-control'
                                    id='repassword'
                                    name='repassword'
                                    placeholder='Şifrenizi yeniden giriniz'
                                    value={rePassword} />
                            </div>
                        </div>
                    */
                }

                <div className='form-group row'>
                    <div className='col-md-12'>
                        <label htmlFor='phone' className='text-black'>Telefon Numarası <span className='text-danger'>*</span></label>
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

                <div className='form-group row form-check'>
                    <div className='col-md-12'>
                        <input
                            type='checkbox'
                            className='form-check-input' id='agreement' name='agreement' placeholder='' />
                        <label
                            style={{ cursor: 'pointer' }}
                            htmlFor='agreement'
                            className='form-check-label ml-2'>Üyelik Sözleşmesi şartlarını okudum ve kabul ediyorum.</label>
                    </div>
                </div>

                <div className='form-group row form-check'>
                    <div className='col-md-12'>
                        <input
                            type='checkbox'
                            className='form-check-input' id='dont-forget' name='dont-forget' placeholder='' />
                        <label
                            style={{ cursor: 'pointer' }}
                            htmlFor='dont-forget'
                            className='form-check-label ml-2'>Tarafımla pazarlama ve tanıtım amaçlı iletişime geçilmesine izin veriyorum.</label>
                    </div>
                </div>

                <div className='form-group row'>
                    <div className='col-lg-12'>
                        <button
                            className='btn btn-primary btn-lg btn-block'
                            onClick={this.sendActivationCode}
                            disabled={
                                this.state.invalidEmail || !this.state.isEmailInitialized
                                || this.state.invalidNameSurname || !this.state.isNameSurnameInitialized
                                || this.state.invalidPassword || !this.state.isPasswordInitialized
                                || this.state.invalidPhoneNumber || !this.state.isPhoneNumberInitialized
                            }
                        >Üye Ol</button>
                    </div>
                </div>

            </div>
        )
    }

    renderActivationScreen = () => {

        const {
            activationCode
        } = this.state

        return (
            <div id={'activation'} className='p-3 p-lg-5' style={{ display: 'none' }}>

                <div className='form-group row'>
                    <div className='col-md-12'>
                        <label htmlFor='activation-code' className='text-black'>Aktivasyon Kodu <span className='text-danger'>*</span></label>
                        <input
                            onChange={this.onActivationCodeChange}
                            type='text'
                            className='form-control'
                            id='activation-code'
                            name='activation-code'
                            placeholder='Aktivasyon kodunuzu giriniz'
                            value={activationCode} />
                    </div>
                </div>

                <div className='form-group row'>
                    <div className='col-lg-12'>
                        <button
                            className='btn btn-primary btn-lg btn-block'
                            onClick={this.onSignUpClick}
                            disabled={this.state.invalidActivationCode || !this.state.isActivationCodeInitialized}
                        >Üye Ol</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const divider = [
            {
                path: null, title: 'Üye Ol'
            }
        ]

        return (
            <SiteWrap divider={divider}>
                <div className='container'>
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
                        <div className='col-md-6'>
                            {
                                this.renderSignUpScreen()
                            }
                            {
                                this.renderActivationScreen()
                            }
                        </div>
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default SignUp