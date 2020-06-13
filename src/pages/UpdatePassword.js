/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'

import SiteWrap from '../components/SiteWrap'
import ProfileColumn from '../components/ProfileColumn'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

class UpdatePassword extends React.Component {

    state = {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
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
                        title: 'Şifreniz değiştirildi.',
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
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
    }

    onOldPasswordChange = (event) => {
        this.setState({ oldPassword: event.target.value })
    }

    onNewPasswordChange = (event) => {
        this.setState({ newPassword: event.target.value })
    }

    onReNewPasswordChange = (event) => {
        this.setState({ reNewPassword: event.target.value })
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
                        <div className="col-md-9 d-flex align-items-center justify-content-center">
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
                                        <button onClick={this.onUpdateClick} className='btn btn-primary btn-lg btn-block'>Şifremi Güncelle</button>
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

export default UpdatePassword