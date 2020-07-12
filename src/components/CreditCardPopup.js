import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'
import joi from '@hapi/joi'
import InputMask from 'react-input-mask'

import PopupWrapper from './PopupWrapper'

class NewCreditCardPopup extends React.Component {

    state = {
        cardAlias: '',
        cardHolderName: '',
        cardNumber: '', // 5526080000000006
        expireYear: '',
        expireMonth: '',
        cvc2: '',

        invalidCardAlias: false,
        invalidCardHolderName: false,
        invalidCardNumber: false,
        invalidExpireYear: false,
        invalidExpireMonth: false,
        invalidCvc2: false,

        isCardAliasInitialized: false,
        isCardHolderNameInitialized: false,
        isCardNumberInitialized: false,
        isExpireYearInitialized: false,
        isExpireMonthInitialized: false,
        isCvc2Initialized: false
    }

    onAliasChange = (event) => {
        const { value } = event.target

        joi.string()
            .min(1)
            .validateAsync(value).then(() => {
                this.setState({ cardAlias: value, isCardAliasInitialized: true, invalidCardAlias: false })
            }).catch((err) => {
                this.setState({ cardAlias: value, isCardAliasInitialized: true, invalidCardAlias: !!err })
            })
    }

    onCardHolderNameChange = (event) => {
        const { value } = event.target

        joi.string()
            .min(1)
            .validateAsync(value).then(() => {
                this.setState({ cardHolderName: value, isCardHolderNameInitialized: true, invalidCardHolderName: false })
            }).catch((err) => {
                this.setState({ cardHolderName: value, isCardHolderNameInitialized: true, invalidCardHolderName: !!err })
            })
    }

    onCardNumberChange = (event) => {
        const { value } = event.target

        joi.string()
            .creditCard()
            .min(16)
            .max(16)
            .validateAsync(value.split(' ').join('')).then(() => {
                this.setState({ cardNumber: value, isCardNumberInitialized: true, invalidCardNumber: false })
            }).catch((err) => {
                this.setState({ cardNumber: value, isCardNumberInitialized: true, invalidCardNumber: !!err })
            })
    }

    onExpireMonthChange = (event) => {
        const { value } = event.target

        joi.string()
            .alphanum()
            .min(2)
            .max(2)
            .validateAsync(value).then(() => {
                this.setState({ expireMonth: value, isExpireMonthInitialized: true, invalidExpireMonth: false })
            }).catch((err) => {
                if (err.details[0].message.includes('2') && err.details[0].message.includes('equal')) {
                    this.setState({ isExpireMonthInitialized: true, invalidExpireMonth: false })
                } else {
                    this.setState({ expireMonth: value, isExpireMonthInitialized: true, invalidExpireMonth: !!err })
                }
            })
    }

    onExpireYearChange = (event) => {
        const { value } = event.target

        joi.string()
            .alphanum()
            .min(4)
            .max(4)
            .validateAsync(value).then(() => {
                this.setState({ expireYear: value, isExpireYearInitialized: true, invalidExpireYear: false })
            }).catch((err) => {
                if (err.details[0].message.includes('2') && err.details[0].message.includes('equal')) {
                    this.setState({ isExpireYearInitialized: true, invalidExpireYear: false })
                } else {
                    this.setState({ expireYear: value, isExpireYearInitialized: true, invalidExpireYear: !!err })
                }
            })
    }

    onCvcChange = (event) => {
        const { value } = event.target

        joi.string()
            .min(3)
            .max(3)
            .validateAsync(value).then(() => {
                this.setState({ cvc2: value, isCvc2Initialized: true, invalidCvc2: false })
            }).catch((err) => {
                if (err.details[0].message.includes('3') && err.details[0].message.includes('equal')) {
                    this.setState({ isCvc2Initialized: true, invalidCvc2: false })
                } else {
                    this.setState({ cvc2: value, isCvc2Initialized: true, invalidCvc2: !!err })
                }
            })
    }

    onSaveClick = () => {
        const {
            cardAlias,
            cardNumber,
            cardHolderName,
            expireMonth,
            expireYear,
            // cvc2
        } = this.state

        axios.post(`${process.env.REACT_APP_API_URL}/user/payment-card`, {
            card: {
                cardAlias,
                cardHolderName,
                cardNumber: cardNumber.split(' ').join(''),
                expireMonth,
                expireYear,
                // cvc2 // TODO
            }
        }).then(({ data, status }) => {
            if (status === 200) {
                VanillaToasts.create({
                    title: 'Kartınız kayıt edildi',
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })

                this.props.hideCreditCardPopup(data)
            }
        }).catch(() => {
            this.props.hideCreditCardPopup()
        })
    }

    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hideCreditCardPopup()
    }

    onCloseClick = (event) => {
        this.props.hideCreditCardPopup()
    }

    getYearSelectorValues = () => {
        const years = Array.from(new Array(20)).map((_, index) => {
            return (
                <option value={(new Date().getFullYear() + index).toString()}>
                    {
                        (new Date().getFullYear() + index).toString()
                    }
                </option>
            )
        })

        return years
    }

    render() {
        const {
            cardAlias,
            cardHolderName,
            cardNumber,
            expireMonth,
            expireYear,
            cvc2
        } = this.state

        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12' style={{ width: 2000 }}>
                    <div className='m-3 p-lg-5'>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='cardAlias' className='text-black'>Kart etiketi <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onAliasChange}
                                    type='text'
                                    className='form-control'
                                    id='cardAlias'
                                    placeholder='Kart etiketi (Kişisel, İş vb.)'
                                    name='cardAlias'
                                    value={cardAlias}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='cardHolderName' className='text-black'>Kart üzerindeki isim <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onCardHolderNameChange}
                                    type='text'
                                    className='form-control'
                                    id='cardHolderName'
                                    placeholder='Kart üzerindeki isim'
                                    name='cardHolderName'
                                    value={cardHolderName}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='cardNumber' className='text-black'>Kart No <span className='text-danger'>*</span></label>
                                <InputMask
                                    mask={'9999 9999 9999 9999'}
                                    onChange={this.onCardNumberChange}
                                    value={cardNumber}>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='cardNumber'
                                        placeholder='Kart numarası'
                                        name='cardNumber'
                                    />
                                </InputMask>
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-6'>
                                <label htmlFor='expireMonth' className='text-black'>Ay <span className='text-danger'>*</span></label>
                                <select
                                    onChange={this.onExpireMonthChange}
                                    type='text'
                                    className='form-control'
                                    id='expireMonth'
                                    placeholder='Ay'
                                    name='expireMonth'
                                    value={expireMonth}>
                                    <option value={'01'}>01</option>
                                    <option value={'02'}>02</option>
                                    <option value={'03'}>03</option>
                                    <option value={'04'}>04</option>
                                    <option value={'05'}>05</option>
                                    <option value={'06'}>06</option>
                                    <option value={'07'}>07</option>
                                    <option value={'08'}>08</option>
                                    <option value={'09'}>09</option>
                                    <option value={'10'}>10</option>
                                    <option value={'11'}>11</option>
                                    <option value={'12'}>12</option>
                                </select>
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='expireYear' className='text-black'>Yıl <span className='text-danger'>*</span></label>
                                <select
                                    onChange={this.onExpireYearChange}
                                    type='text'
                                    className='form-control'
                                    id='expireYear'
                                    placeholder='Yıl'
                                    name='expireYear'
                                    value={expireYear}>
                                    {
                                        this.getYearSelectorValues()
                                    }
                                </select>
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='cvc2' className='text-black'>CVC2 <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onCvcChange}
                                    type='text'
                                    className='form-control'
                                    id='cvc2'
                                    placeholder='CVC2'
                                    name='cvc2'
                                    value={cvc2}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-lg-12'>
                                <button
                                    className='btn btn-primary btn-lg btn-block'
                                    onClick={this.onSaveClick}
                                    disabled={
                                        this.state.invalidCardAlias || !this.state.isCardAliasInitialized
                                        || this.state.invalidCardNumber || !this.state.isCardNumberInitialized
                                        || this.state.invalidExpireYear || !this.state.isExpireYearInitialized
                                        || this.state.invalidExpireMonth || !this.state.isExpireMonthInitialized
                                        || this.state.invalidCvc2 || !this.state.isCvc2Initialized
                                    }
                                >Kartı Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </PopupWrapper>
        )
    }
}

export default NewCreditCardPopup