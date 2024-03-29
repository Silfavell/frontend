/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import joi from '@hapi/joi'
import VanillaToasts from 'vanillatoasts'

import ProfileColumn from '../../components/ProfileColumn/ProfileColumn'
import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'
import { getProfile, updateProfile } from '../../scripts/requests'

class EditProfile extends React.Component {
    state = {
        nameSurname: '',
        phoneNumber: '',
        email: '',

        invalidNameSurname: false,
        invalidEmail: false,

        isNameSurnameInitialized: true,
        isEmailInitialized: true
    }

    async componentDidMount() {
        try {
            const { status, data } = await getProfile()

            if (status === 200) {
                this.setState(data)
            }
        } catch (error) {
            this.props.history.push('/')
        }
    }

    onSaveClick = async () => {
        try {
            const { status, data } = await updateProfile({
                nameSurname: this.state.nameSurname,
                email: this.state.email
            })

            if (status === 200) {
                this.setState(data, () => {
                    VanillaToasts.create({
                        title: `Bilgileriniz güncellendi`,
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
                    })
                })
            }
        } catch (error) {
            this.props.history.push('/')
        }
    }

    onNameSurnameChange = (event) => {
        const { value } = event.target

        joi.string()
            .trim()
            .validateAsync(value).then(() => {
                this.setState({ nameSurname: value, isNameSurnameInitialized: true, invalidNameSurname: false })
            })
            .catch((err) => {
                this.setState({ nameSurname: value, isNameSurnameInitialized: true, invalidNameSurname: !!err })
            })
    }

    onEmailChange = (event) => {
        const { value } = event.target

        joi.string()
            .trim()
            .strict()
            .email({ tlds: { allow: false } })
            .validateAsync(value)
            .then(() => {
                this.setState({ email: value, isEmailInitialized: true, invalidEmail: false })
            })
            .catch((err) => {
                this.setState({ email: value, isEmailInitialized: true, invalidEmail: !!err })
            })
    }

    render() {
        const {
            nameSurname,
            email,
            phoneNumber
        } = this.state

        return (
            <div className='container'>
                <div className='row'>
                    <ProfileColumn />
                    <div className='col-md-9'>
                        <div className='w-100 h-100 d-flex align-items-center justify-content-center my-2 border py-4'>
                            <div className='col-md-6'>

                                <div className='form-group row'>
                                    <div className='col-md-12'>
                                        <label htmlFor='nameSurname' className='text-black'>
                                            Adınız Soyadınız
                                            <span className='text-danger'>*</span>
                                        </label>
                                        <input
                                            onChange={this.onNameSurnameChange}
                                            type='name'
                                            className='form-control'
                                            id='nameSurname'
                                            name='nameSurname'
                                            placeholder='Adınızı ve Soyadınızı giriniz'
                                            value={nameSurname} />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <div className='col-md-12'>
                                        <label htmlFor='email' className='text-black'>
                                            E-Posta
                                            <span className='text-danger'>*</span>
                                        </label>
                                        <input
                                            onChange={this.onEmailChange}
                                            type='email'
                                            className='form-control'
                                            id='email'
                                            name='email'
                                            placeholder='E-Posta adresinizi giriniz'
                                            value={email} />
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <div className='col-md-12'>
                                        <label htmlFor='phone' className='text-black'>
                                            Telefon Numarası
                                            <span className='text-danger'>*</span>
                                        </label>
                                        <input
                                            type='phone'
                                            className='form-control'
                                            id='phone'
                                            name='phone'
                                            placeholder='Telefon Numaranızı giriniz'
                                            disabled
                                            value={phoneNumber} />
                                    </div>
                                </div>

                                { /*
                                    <div className='form-group row'>
                                        <div className='col-md-12 d-flex align-items-md-start justify-content-md-start'>
                                            <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' checked />
                                            <label
                                            style={{ display: 'unset' }}
                                            htmlFor='dont-forget' className='form-check-label ml-2'>Tarafımla pazarlama ve tanıtım amaçlı iletişime geçilmesine izin veriyorum.</label>
                                        </div>
                                    </div>
                                */
                                }

                                <div className='form-group row'>
                                    <div className='col-md-12'>
                                        <input type='checkbox' className='form-check-label' id='dont-forget' name='dont-forget' placeholder='' checked disabled />
                                        <label style={{ display: 'unset' }} htmlFor='dont-forget' className='form-check-label ml-2'>Üyelik Sözleşmesi şartlarını okudum ve kabul ediyorum.</label>
                                    </div>
                                </div>

                                <div className='form-group row'>
                                    <div className='col-lg-12'>
                                        <button
                                            className='btn btn-primary btn-lg btn-block'
                                            onClick={this.onSaveClick}
                                            disabled={
                                                this.state.invalidEmail || !this.state.isEmailInitialized
                                                || this.state.invalidNameSurname || !this.state.isNameSurnameInitialized
                                            }>
                                            Kaydet
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const breadcrumb = [
    {
        path: null,
        title: 'Profilimi Düzenle'
    }
]

export default SiteWrapHoc(EditProfile, { breadcrumb })
