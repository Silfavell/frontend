/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import $ from 'jquery'
import Cookies from 'universal-cookie'
import JoiBase from '@hapi/joi'
import JoiPhoneNumber from 'joi-phone-number'

import { bulkCart, signUp, sendActivationCode } from '../../scripts/requests'

import SiteWrap from '../../components/SiteWrap'
import ActivationSection from './ActivationSection'
import SignUpSection from './SignUpSection'

import './SignUp.css'

const Joi = JoiBase.extend(JoiPhoneNumber)
const cookies = new Cookies()

const registerSchema = Joi.object({
    phoneNumber: Joi.string().phoneNumber({ defaultCountry: 'TR', format: 'national', strict: true }).required(),
    nameSurname: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(4).required(),
    activationCode: Joi.number().min(1000).max(9999).required()
}).unknown()

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
        showKvkkAgreementPopup: false,

        validationError: null
    }

    static getDerivedStateFromProps(_, state) {
        return {
            ...state,
            validationError: registerSchema.validate(state).error?.message
        }
    }

    onInputChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
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
        sendActivationCode({
            phoneNumber: this.state.phoneNumber,
            activationCodeType: 0
        }).then(({ status }) => {
            if (status === 202) {
                $('#register').hide()
                $('#activation').fadeIn('slow')
            }
        })
    }

    showAgreementPopup = () => {
        this.setState({ showAgreementPopup: true })
    }

    hideAgreementPopup = () => {
        this.setState({ showAgreementPopup: false })
    }

    showKvkkAgreementPopup = () => {
        this.setState({ showKvkkAgreementPopup: true })
    }

    hideKvkkAgreementPopup = () => {
        this.setState({ showKvkkAgreementPopup: false })
    }

    onSubmitForm = (event) => {
        event.preventDefault()
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
                            <SignUpSection
                                onInputChange={this.onInputChange}
                                sendActivationCode={this.sendActivationCode}
                                showAgreementPopup={this.showAgreementPopup}
                                hideAgreementPopup={this.hideAgreementPopup}
                                showKvkkAgreementPopup={this.showKvkkAgreementPopup}
                                hideKvkkAgreementPopup={this.hideKvkkAgreementPopup}
                                state={this.state}
                            />

                            <ActivationSection
                                onInputChange={this.onInputChange}
                                onSignUpClick={this.onSignUpClick}
                                activationCode={this.state.activationCode}
                                validationError={this.state.validationError}
                            />
                        </div>
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default SignUp