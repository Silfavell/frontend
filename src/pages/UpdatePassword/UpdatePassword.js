/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'
import joi from '@hapi/joi'

import SiteWrap from '../../components/SiteWrap'
import ProfileColumn from '../../components/ProfileColumn'

import '../../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style/css/owl.theme.default.min.css'
import '../../style/css/style.css'

class UpdatePassword extends React.Component {

    state = {
        oldPassword: '',
        newPassword: '',
        reNewPassword: '',

        invalidOldPassword: false,
        invalidNewPassword: false,
        invalidReNewPassword: false,

        isOldPasswordInitialized: false,
        isNewPasswordInitialized: false,
        isReNewPasswordInitialized: false
    }

    onUpdateClick = () => {
        if (this.state.oldPassword === '' || this.state.newPassword === '') {
            VanillaToasts.create({
                title: 'Lütfen gerekli alanlarını doldurunuz',
                positionClass: 'topRight',
                type: 'success',
                timeout: 3 * 1000
            })
        } else if (this.state.newPassword.length < 4) {
            VanillaToasts.create({
                title: 'Yeni şifreniz en az 4 haneli olmalı',
                positionClass: 'topRight',
                type: 'success',
                timeout: 3 * 1000
            })
        } if (this.state.newPassword !== this.state.reNewPassword) {
            VanillaToasts.create({
                title: 'Yeni şifreniz tekrarı ile eşleşmemektedir',
                positionClass: 'topRight',
                type: 'success',
                timeout: 3 * 1000
            })
        } else if (this.state.oldPassword === this.state.newPassword) {
            VanillaToasts.create({
                title: 'Yeni şifre eskisi ise aynı olamaz',
                positionClass: 'topRight',
                type: 'success',
                timeout: 3 * 1000
            })
        } else {
            const url = `${process.env.REACT_APP_API_URL}/user/change-password`

            axios.put(url, {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            }).then(({ status }) => {
                if (status === 200) {
                    VanillaToasts.create({
                        title: 'Şifreniz değiştirildi',
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
                    })
                }
            })
        }
    }

    onOldPasswordChange = (event) => {
        const { value } = event.target

        joi.string()
            .alphanum()
            .min(4)
            .validateAsync(value).then(() => {
                this.setState({ oldPassword: value, isOldPasswordInitialized: true, invalidOldPassword: false })
            }).catch((err) => {
                this.setState({ oldPassword: value, isOldPasswordInitialized: true, invalidOldPassword: !!err })
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

    onSubmitForm = (event) => {
        event.preventDefault()
    }

    render() {
        const {
            oldPassword,
            newPassword,
            reNewPassword
        } = this.state

        const divider = [
            {
                path: null,
                title: 'Şifremi Değiştir'
            }
        ]

        return (
            <SiteWrap
                divider={divider}>
                <div className='container'>
                    <div className='row'>
                        <ProfileColumn />
                        <form className='col-md-9 my-2' autoComplete='off' action='' onSubmit={this.onSubmitForm}>
                            <div className='w-100 h-100 border py-4 d-flex align-items-center justify-content-center'>
                                <div className='col-md-6'>
                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='old_password' className='text-black'>Eski Şifre <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onOldPasswordChange}
                                                type='password'
                                                className='form-control'
                                                id='old_password'
                                                name='old_password'
                                                placeholder='Eski Şifrenizi giriniz'
                                                value={oldPassword} />
                                        </div>
                                    </div>

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
                                                value={newPassword} />
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
                                                value={reNewPassword} />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-lg-12'>
                                            <div
                                                onClick={this.onUpdateClick}
                                                className='btn btn-primary btn-lg btn-block'
                                                disabled={
                                                    this.state.invalidOldPassword || !this.state.isOldPasswordInitialized
                                                    || this.state.invalidNewPassword || !this.state.isNewPasswordInitialized
                                                    || this.state.invalidReNewPassword || !this.state.isReNewPasswordInitialized
                                                }
                                            >Şifremi Güncelle</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </SiteWrap >
        )
    }
}

export default UpdatePassword