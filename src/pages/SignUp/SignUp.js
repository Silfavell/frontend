/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import $ from 'jquery'
import Cookies from 'universal-cookie'
import joi from '@hapi/joi'
import InputMask from 'react-input-mask'

import { bulkCart, signUp, sendActivationCode } from '../../scripts/requests'

import SiteWrap from '../../components/SiteWrap'
import MembershipAgreement from './MembershipAgreement'

import '../../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style/css/owl.theme.default.min.css'
import '../../style/css/style.css'

const cookies = new Cookies()

class SignUp extends React.Component {

    state = {
        phoneNumber: '',
        nameSurname: '',
        email: '',
        password: '',
        // rePassword: '',
        activationCode: '',
        membershipAgreement: true,
        showAgreementPopup: false,

        invalidPhoneNumber: false,
        invalidPassword: false,
        invalidNameSurname: false,
        invalidEmail: false,
        invalidActivationCode: false,

        isPhoneNumberInitialized: false,
        isPasswordInitialized: false,
        isNameSurnameInitialized: false,
        isEmailInitialized: false,
        isActivationCodeInitialized: false
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
        const {
            phoneNumber,
            nameSurname,
            email,
            password,
            // rePassword,
            activationCode
        } = this.state

        signUp({
            phoneNumber,
            nameSurname,
            email,
            password,
            // rePassword,
            activationCode
        }).then(({ status, data }) => {
            if (status === 200) {
                cookies.set('token', data.token)
                localStorage.setItem('_id', data.user._id)

                if (data.user.alias) {
                    localStorage.setItem('alias', data.user.alias)
                }

                localStorage.setItem('favoriteProducts', JSON.stringify(data.user.favoriteProducts))

                if (window.localStorage.getItem('cart')) {
                    bulkCart().then(() => {
                        window.localStorage.removeItem('cart')

                        if (document.referrer.includes(window.location.origin)) {
                            window.history.back()
                        } else {
                            this.props.history.push('/')
                        }
                    })
                } else {
                    if (document.referrer.includes(window.location.origin)) {
                        window.history.back()
                    } else {
                        this.props.history.push('/')
                    }
                }
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

        sendActivationCode({
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

    showAgreementPopup = () => {
        this.setState({ showAgreementPopup: true })
    }

    hideAgreementPopup = () => {
        this.setState({ showAgreementPopup: false })
    }

    onSubmitForm = (event) => {
        event.preventDefault()
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
                {
                    this.state.showAgreementPopup && <MembershipAgreement hideAgreementPopup={this.hideAgreementPopup} />
                }

                <div className='form-group row'>
                    <div className='col-md-12'>
                        <label htmlFor='nameSurname' className='text-black'>Adınız Soyadınız <span className='text-danger'>*</span></label>
                        <input
                            onChange={this.onNameSurnameChange}
                            type='text'
                            className='form-control'
                            id='nameSurname'
                            name='name'
                            placeholder='Adınız ve Soyadınızı giriniz'
                            value={nameSurname} />
                    </div>
                </div>

                <div className='form-group row'>
                    <div className='col-md-12'>
                        <label htmlFor='c_email' className='text-black'>E-Posta <span className='text-danger'>*</span></label>
                        <input
                            onChange={this.onEmailChange}
                            type='text'
                            className='form-control'
                            id='c_email'
                            name='email'
                            placeholder='E-Posta adresinizi giriniz'
                            value={email} />
                    </div>
                </div>

                <form className='form-group row' autoComplete='off' action='' onSubmit={this.onSubmitForm}>
                    <div className='col-md-12'>
                        <label htmlFor='phone' className='text-black'>Telefon Numarası <span className='text-danger'>*</span></label>
                        <InputMask
                            mask='\+\9\0 \(999\) 999 99 99'
                            value={phoneNumber}
                            onChange={this.onPhoneChange}>
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
                </form>

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

                <div className='form-group row form-check'>
                    <label
                        htmlFor='agreement'
                        className='form-check-label'>Hesap oluşturarak <span style={{ cursor: 'pointer' }} className='text-primary' onClick={this.showAgreementPopup}>üyelik sözleşmesini</span> okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.</label>
                </div>

                {
                    /*
                        <div className='form-group row form-check'>
                            <div className='col-md-12'>
                                <input
                                    type='checkbox'
                                    className='form-check-input' id='dont-forget' name='dont-forget' placeholder='' />
                                <label
                                    style={{ cursor: 'pointer', display: 'unset' }}
                                    htmlFor='dont-forget'
                                    className='form-check-label ml-2'>Tarafımla pazarlama ve tanıtım amaçlı iletişime geçilmesine izin veriyorum.</label>
                            </div>
                        </div>
                    */
                }

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
                                || !this.state.membershipAgreement
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
                    <div className='w-100 d-flex align-items-center justify-content-center'>
                        <div className='col-md-6 px-0'>
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