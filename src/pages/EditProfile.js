/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'

import SiteWrap from '../components/SiteWrap'
import ProfileColumn from '../components/ProfileColumn'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/owl.theme.default.min.css'
import '../style/css/style.css'

const cookies = new Cookies()

class EditProfile extends React.Component {

    state = {}

    UNSAFE_componentWillMount() {
        if (cookies.get('token')) {
            axios.get(`${process.env.REACT_APP_API_URL}/user/profile`).then(({ status, data }) => {
                if (status === 200) {
                    this.setState(data)
                }
            }).catch((err) => {
                VanillaToasts.create({
                    title: err.response.data.error,
                    positionClass: 'topRight',
                    type: 'error',
                    timeout: 3 * 1000
                })

                this.props.history.push('/')
            })
        } else {
            this.props.history.push('/')
        }
    }

    onSaveClick = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/profile`, {
            nameSurname: this.state.nameSurname,
            email: this.state.email
        }).then(({ status, data }) => {
            if (status === 200) {
                this.setState(data)
            }
        }).catch((err) => {
            VanillaToasts.create({
                title: err.response.data.error,
                positionClass: 'topRight',
                type: 'error',
                timeout: 3 * 1000
            })

            this.props.history.push('/')
        })
    }

    onNameSurnameChange = (event) => {
        this.setState({ nameSurname: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPhoneChange = (event) => {
        this.setState({ phoneNumber: event.target.value })
    }

    render() {
        const {
            nameSurname,
            email,
            phoneNumber
        } = this.state

        const divider = [
            {
                path: null,
                title: 'Profilimi Düzenle'
            }
        ]

        return (
            <SiteWrap divider={divider}>
                <div className='container'>
                    <div className='row'>
                        <ProfileColumn />
                        <div className='col-md-9 d-flex align-items-center justify-content-center'>
                            <div className='col-md-6'>
                                <div className='p-3 p-lg-5'>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='nameSurname' className='text-black'>Name Surname <span className='text-danger'>*</span></label>
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
                                            <label htmlFor='c_email' className='text-black'>E-Mail <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onEmailChange}
                                                type='email'
                                                className='form-control'
                                                id='c_email'
                                                name='c_email'
                                                placeholder='E-Posta adresinizi giriniz' value={email} />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='phone' className='text-black'>Phone Number <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onPhoneChange}
                                                type='phone'
                                                className='form-control'
                                                id='phone'
                                                name='phone'
                                                placeholder='Telefon Numaranızı giriniz'
                                                disabled
                                                value={phoneNumber} />
                                        </div>
                                    </div>

                                    {   /*
                                            <div className='form-group row'>
                                                <div className='col-md-12 d-flex align-items-md-start justify-content-md-start'>
                                                    <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' checked />
                                                    <label htmlFor='dont-forget' className='form-check-label ml-2'>Tarafımla pazarlama ve tanıtım amaçlı iletişime geçilmesine izin veriyorum.</label>
                                                </div>
                                            </div>
                                            */
                                    }

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' checked disabled />
                                            <label htmlFor='dont-forget' className='form-check-label ml-2'>Üyelik Sözleşmesi şartlarını okudum ve kabul ediyorum.</label>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-lg-12'>
                                            <button className='btn btn-primary btn-lg btn-block' onClick={this.onSaveClick}>Kaydet</button>
                                        </div>
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

export default EditProfile