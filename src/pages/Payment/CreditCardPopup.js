import React from 'react'
import VanillaToasts from 'vanillatoasts'
import joi from '@hapi/joi'
import NumberFormat from 'react-number-format'
import VanillaToasts from 'vanillatoasts'

import PopupWrapper from '../../components/PopupWrapper/PopupWrapper'

import { addCard } from '../../scripts/requests'

class NewCreditCardPopup extends React.Component {
    state = {
        cardAlias: '',
        cardHolderName: '',
        cardNumber: '',
        expireYear: '',
        expireMonth: '',

        invalidCardAlias: false,
        invalidCardHolderName: false,
        invalidCardNumber: false,
        invalidExpireYear: false,
        invalidExpireMonth: false,

        isCardAliasInitialized: false,
        isCardHolderNameInitialized: false,
        isCardNumberInitialized: false,
        isExpireYearInitialized: false,
        isExpireMonthInitialized: false,
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

    onSaveClick = async () => {
        const {
            cardAlias,
            cardNumber,
            cardHolderName,
            expireMonth,
            expireYear
        } = this.state

        if (new Date().getFullYear().toString() === expireYear && new Date().getMonth() + 1 > parseInt(expireMonth)) {
            VanillaToasts.create({
                title: 'Lütfen ileri bir tarih seçiniz',
                positionClass: 'topRight',
                type: 'error',
                timeout: 5 * 1000
            })
        } else {
            try {
                const { data, status } = await addCard({
                    card: {
                        cardAlias,
                        cardHolderName,
                        cardNumber: cardNumber.split(' ').join(''),
                        expireMonth,
                        expireYear
                    }
                })

                if (status === 200) {
                    VanillaToasts.create({
                        title: 'Kartınız kayıt edildi',
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
                    })

                    this.props.hidePopup(data)
                }
            } catch (error) {
                this.props.hidePopup()
            }
        }
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
            expireYear
        } = this.state

        return (
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
                            <label htmlFor='cardNumber' className='text-black'>
                                Kart No
                                <span className='text-danger'>*</span>
                            </label>
                            <NumberFormat
                                type='text'
                                className='form-control'
                                placeholder='Kart numarası'
                                onChange={this.onCardNumberChange}
                                name='cardNumber'
                                autoComplete='tel'
                                id='cardNumber'
                                format='#### #### #### ####'
                                mask='_'
                                value={cardNumber} />
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
                                <option disabled unselectable value={''}>Lütfen Ay Seçiniz</option>
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
                                <option disabled unselectable value={''}>Lütfen Yıl Seçiniz</option>
                                {
                                    this.getYearSelectorValues()
                                }
                            </select>
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
                                }
                            >Kartı Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PopupWrapper(NewCreditCardPopup)