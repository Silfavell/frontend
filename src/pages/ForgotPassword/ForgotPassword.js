/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import $ from 'jquery'
import VanillaToasts from 'vanillatoasts'
import joi from '@hapi/joi'
import InputMask from 'react-input-mask'

import { resetPassword, sendActivationCode } from '../../scripts/requests'

import SiteWrap from '../../components/SiteWrap'

class UpdatePassword extends React.Component {

    state = {
        isActivationCodeSended: false,

        phoneNumber: '',
        newPassword: '',
        reNewPassword: '',
        activationCode: '',

        invalidPhoneNumber: false,
        invalidNewPassword: false,
        invalidReNewPassword: false,
        invalidActivationCode: false,

        isPhoneNumberInitialized: false,
        isNewPasswordInitialized: false,
        isReNewPasswordInitialized: false,
        isActivationCodeInitialized: false
    }

    onUpdateClick = () => {
        if (this.state.newPassword === '' || this.state.reNewPassword === '') {
            VanillaToasts.create({
                title: `Lütfen gerekli alanlarını doldurunuz`,
                positionClass: 'topRight',
                type: 'error',
                timeout: 3 * 1000
            })
        } else if (this.state.newPassword.length < 4) {
            VanillaToasts.create({
                title: `Yeni şifreniz en az 4 haneli olmalı`,
                positionClass: 'topRight',
                type: 'error',
                timeout: 3 * 1000
            })
        } if (this.state.newPassword !== this.state.reNewPassword) {
            VanillaToasts.create({
                title: `Yeni şifreniz tekrarı ile eşleşmemektedir`,
                positionClass: 'topRight',
                type: 'error',
                timeout: 3 * 1000
            })
        } else {

            resetPassword({
                phoneNumber: this.state.phoneNumber,
                newPassword: this.state.newPassword,
                activationCode: this.state.activationCode
            }).then(({ status }) => {
                if (status === 200) {
                    VanillaToasts.create({
                        title: `Şifreniz değiştirildi`,
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
                    })

                    this.props.history.push('/sign-in')
                }
            })
        }
    }

    onSendActivationCodeClick = () => {
        sendActivationCode({
            phoneNumber: this.state.phoneNumber,
            activationCodeType: 1
        }).then(({ status }) => {
            if (status === 202) {
                this.setState({ isActivationCodeSended: true }, () => {
                    $('#phone-section').hide()
                    $('#password-section').fadeIn('slow')
                })
            }
        })
    }

    onNewPasswordChange = (event) => {
        const { value } = event.target

        joi.string()
            .alphanum()
            .min(4)
            .validateAsync(value).then(() => {
                this.setState({ newPassword: value, isNewPasswordInitialized: true, invalidNewPassword: false })
            }).catch((err) => {
                this.setState({ newPassword: value, isNewPasswordInitialized: true, invalidNewPassword: !!err })
            })
    }

    onReNewPasswordChange = (event) => {
        const { value } = event.target

        joi.string()
            .alphanum()
            .min(4)
            .validateAsync(value).then(() => {
                this.setState({ reNewPassword: value, isReNewPasswordInitialized: true, invalidReNewPassword: false })
            }).catch((err) => {
                this.setState({ reNewPassword: value, isReNewPasswordInitialized: true, invalidReNewPassword: !!err })
            })
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

    onActivationCodeChange = (event) => {
        const { value } = event.target

        joi.string()
            .alphanum()
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

    onSubmitForm = (event) => {
        event.preventDefault()
    }

    renderPhoneSection = () => (
        <form id='phone-section' className='p-3 p-lg-5' autoComplete='off' action='' onSubmit={this.onSubmitForm}>
            <div className='form-group row'>
                <div className='col-md-12'>
                    <label htmlFor='phone' className='text-black'>Telefon Numarası <span className='text-danger'>*</span></label>
                    <InputMask
                        mask='\+\9\0 \(999\) 999 99 99'
                        value={this.state.phoneNumber}
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
            </div>

            <div className='form-group row'>
                <div className='col-lg-12'>
                    <div
                        onClick={this.onSendActivationCodeClick}
                        className='btn btn-primary btn-lg btn-block'
                        disabled={
                            this.state.invalidPhoneNumber || !this.state.isPhoneNumberInitialized
                        }
                    >Aktivasyon kodu gönder</div>
                </div>
            </div>
        </form>
    )

    renderPasswordSection = () => (
        <form className='p-3 p-lg-5' autoComplete='off' action='' onSubmit={this.onSubmitForm}>

            <div className='form-group row'>
                <div className='col-md-12'>
                    <label htmlFor='new_password' className='text-black'>Yeni Şifre <span className='text-danger'>*</span></label>
                    <input
                        onChange={this.onNewPasswordChange}
                        type='password'
                        className='form-control'
                        id='new_password'
                        name='new_password'
                        placeholder='Yeni Şifrenizi giriniz'
                        value={this.state.newPassword} />
                </div>
            </div>

            <div className='form-group row'>
                <div className='col-md-12'>
                    <label htmlFor='re_new_password' className='text-black'>Yeni Şifre (tekrar) <span className='text-danger'>*</span></label>
                    <input
                        onChange={this.onReNewPasswordChange}
                        type='password'
                        className='form-control'
                        id='re_new_password'
                        name='re_new_password'
                        placeholder='Yeni Şifrenizi tekrar giriniz'
                        value={this.state.reNewPassword} />
                </div>
            </div>

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
                        value={this.state.activationCode} />
                </div>
            </div>

            <div className='form-group row'>
                <div className='col-lg-12'>
                    <div
                        onClick={this.onUpdateClick}
                        className='btn btn-primary btn-lg btn-block'
                        disabled={
                            this.state.invalidPhoneNumber || !this.state.isPhoneNumberInitialized
                            || this.state.invalidActivationCode || !this.state.isActivationCodeInitialized
                            || this.state.invalidNewPassword || !this.state.isNewPasswordInitialized
                        }
                    >Şifremi Sıfırla</div>
                </div>
            </div>

        </form>
    )

    render() {
        const divider = [
            {
                path: null, title: 'Şifremi Unuttum'
            }
        ]

        return (
            <SiteWrap divider={divider}>
                <div className='container'>
                    <div className='col-md-12 d-flex align-items-center justify-content-center'>
                        <div className='col-md-6'>
                            {
                                this.state.isActivationCodeSended ? this.renderPasswordSection() : this.renderPhoneSection()
                            }
                        </div>
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default UpdatePassword