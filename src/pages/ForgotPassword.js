/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'

import '../style/fonts/icomoon/style.css'
import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

import SiteWrap from '../components/SiteWrap'

class UpdatePassword extends React.Component {

    state = {
        newPassword: '',
        reNewPassword: ''
    }

    onUpdateClick = () => {
        if (this.state.newPassword === '' || this.state.reNewPassword === '') {
            alert('Lütfen gerekli alanlarını doldurunuz')
        } else if (this.state.newPassword.length < 4) {
            alert('Yeni şifreniz en az 4 haneli olmalı')
        } if (this.state.newPassword !== this.state.reNewPassword) {
            alert('Yeni şifreniz tekrarı ile eşleşmemektedir')
        } else {
            const url = `${process.env.REACT_APP_API_URL}/user/reset-password`
            console.log('yeah')
            axios.put(url, {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            }).then((x) => {
                console.log(x)
            }).catch((err) => {
                console.log(err.response.data)
            })
        }
    }

    onNewPasswordChange = (event) => {
        this.setState({ newPassword: event.target.value })
    }

    onReNewPasswordChange = (event) => {
        this.setState({ reNewPassword: event.target.value })
    }

    render() {
        const {
            newPassword,
            reNewPassword
        } = this.state

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