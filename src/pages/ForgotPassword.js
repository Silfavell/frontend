/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import VanillaToasts from 'vanillatoasts'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

import SiteWrap from '../components/SiteWrap'

class UpdatePassword extends React.Component {

    state = {
        isActivationCodeSended: false,
        activationCode: '',
        phoneNumber: '',
        newPassword: '',
        reNewPassword: ''
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
            const url = `${process.env.REACT_APP_API_URL}/reset-password`

            axios.put(url, {
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
            }).catch((err) => {
                console.log(err.response.data)
            })
        }
    }

    onSendActivationCodeClick = () => {
        const url = `${process.env.REACT_APP_API_URL}/send-activation-code`

        axios.post(url, {
            phoneNumber: this.state.phoneNumber,
            activationCodeType: 1
        }).then(({ status }) => {
            if (status === 202) {
                this.setState({ isActivationCodeSended: true }, () => {
                    $('#phone-section').hide()
                    $('#password-section').fadeIn('slow')
                })
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

    onNewPasswordChange = (event) => {
        this.setState({ newPassword: event.target.value })
    }

    onReNewPasswordChange = (event) => {
        this.setState({ reNewPassword: event.target.value })
    }

    onPhoneNumberChange = (event) => {
        this.setState({ phoneNumber: event.target.value })
    }

    onActivationCodeChange = (event) => {
        this.setState({ activationCode: event.target.value })
    }

    renderPhoneSection = () => (
        <div id="phone-section" className='p-3 p-lg-5'>

            <div className='form-group row'>
                <div className='col-md-12'>
                    <label htmlFor='phone' className='text-black'>Telefon Numarası <span className='text-danger'>*</span></label>
                    <input
                        onChange={this.onPhoneNumberChange}
                        type='phone'
                        className='form-control'
                        id='phone'
                        name='phone'
                        placeholder='Telefon Numaranızı giriniz'
                        value={this.state.phoneNumber} />
                </div>
            </div>

            <div className='form-group row'>
                <div className='col-lg-12'>
                    <button onClick={this.onSendActivationCodeClick} className='btn btn-primary btn-lg btn-block'>Aktivasyon Kodu Gönder</button>
                </div>
            </div>

        </div>
    )

    renderPasswordSection = () => (
        <div className='p-3 p-lg-5'>

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
                    <button onClick={this.onUpdateClick} className='btn btn-primary btn-lg btn-block'>Şifremi Güncelle</button>
                </div>
            </div>

        </div>
    )

    render() {
        const divider = [
            {
                path: null, title: 'Şiremi Unuttum'
            }
        ]

        return (
            <SiteWrap divider={divider}>
                <div className='container'>
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
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