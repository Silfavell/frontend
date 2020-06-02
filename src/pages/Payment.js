import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import $ from 'jquery'

import SiteWrap from '../components/SiteWrap'
import Loading from '../components/Loading'
import EmptyAddressCart from '../components/EmptyAddressCart'
import AddressCart from '../components/AddressCart'
import AddressPopup from '../components/AddressPopup'
import PaymentCard from '../components/PaymentCard'

const cookies = new Cookies()

class Payment extends React.Component {

    state = {
        fetching: true,
        products: [],
        addresses: [],
        cards: [],
        selectedAddress: 0,
        selectedCard: 0,
        showSaveAddressPopup: false,
        showNewCardSection: false,

        cardAlias: 'Alias',
        cardHolderName: 'Holder',
        cardNumber: '5526080000000006',
        expireYear: '09',
        expireMonth: '2023',
        cvc2: '555'
    }

    setSelectedCard = (selectedCard) => {
        this.setState({ selectedCard })
    }

    setSelectedAddress = (selectedAddress) => {
        this.setState({ selectedAddress })
    }

    saveCard = () => {
        const {
            cardAlias,
            cardNumber,
            cardHolderName,
            expireMonth,
            expireYear,
            cvc2
        } = this.state

        axios.post(`${process.env.REACT_APP_API_URL}/user/payment-card`, {
            card: {
                cardAlias,
                cardHolderName,
                cardNumber,
                expireMonth,
                expireYear,
                // cvc2
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            alert(err.response.data.error)
        })
    }

    showNewCardSection = (event) => {
        this.setState({ showNewCardSection: event.target.checked })
    }

    showSaveAddressPopup = () => {
        this.setState({ showSaveAddressPopup: true })
    }

    hideSaveAddressPopup = () => {
        this.setState({ showSaveAddressPopup: false })
    }

    getCart = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/user/cart`).then(({ data: cart }) => cart)
    )

    getPaymentCards = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/user/list-cards`).then(({ data }) => data.cardDetails ?? [])
    )

    getAddresses = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/user/profile`).then(({ status, data: { addresses } }) => addresses)
    )

    setDatas = () => (
        Promise.all([this.getCart(), this.getPaymentCards(), this.getAddresses()]).then((results) => {
            this.setState({
                products: Object.values(results[0].cart),
                cards: results[1],
                addresses: results[2],
                fetching: false
            })
        }).catch((err) => {
            console.log((err))
        })
    )

    UNSAFE_componentWillMount() {
        this.setDatas()
    }

    onCompletePaymentClick = () => {
        console.log('complete payment')
        // this.saveCard()
        axios.post(`${process.env.REACT_APP_API_URL}/user/order`, {
            address: this.state.addresses[this.state.selectedAddress]._id,
            card: this.state.cards[this.state.selectedCard].cardToken
        }).then(({ status, data }) => {
            if (status === 200) {
                alert('Siparişiniz alınmıştır.')
                this.props.history.push('/')
            }
        }).catch((err) => {
            alert(err.response.data.error)
        })
    }

    onAddressOptionsClick = () => {
        $('#paymentOptions').hide()
        $('#addresses').fadeIn('slow')
    }

    onPaymentOptionsClick = () => {
        $('#addresses').hide()
        $('#paymentOptions').fadeIn('slow')
    }

    onAliasChange = (event) => {
        this.setState({ cardAlias: event.target.value })
    }

    onCardHolderNameChange = (event) => {
        this.setState({ cardHolderName: event.target.value })
    }

    onCardNoChange = (event) => {
        this.setState({ cardNumber: event.target.value })
    }

    onExpireMonthChange = (event) => {
        this.setState({ expireMonth: event.target.value })
    }

    onExpireYearChange = (event) => {
        this.setState({ expireYear: event.target.value })
    }

    onCvcChange = (event) => {
        this.setState({ cvc2: event.target.value })
    }

    renderAddresses = () => (
        <div id={'addresses'} className='row mb-5 border'>
            <div className='col-md-12 p-4'>
                <h3 className={'text-secondary'}>Adres Seçimi</h3>
            </div>
            <div className='col-md-12 p-4'>
                <div className='row'>
                    {
                        this.state.addresses.map((address, index) => (
                            <AddressCart
                                index={index}
                                item={address}
                                selected={this.state.selectedAddress === index} setSelectedAddress={this.setSelectedAddress} />
                        ))
                    }
                    <EmptyAddressCart showSaveAddressPopup={this.showSaveAddressPopup} />
                </div>
            </div>
        </div>
    )

    renderPaymentOptions = () => {
        const {
            cardAlias,
            cardNumber,
            cardHolderName,
            expireMonth,
            expireYear,
            cvc2
        } = this.state

        return (
            <div id={'paymentOptions'} className='row mb-5 border' style={{ display: 'none' }}>
                <div className='col-md-12 p-4'>
                    <p className={'text-gray h6'}>Kredi kartı bilgileriniz Silfavell tarafından saklanmamaktadır.</p>
                    <p className={'text-black font-weight-bold h6'}>Ödeme altyapısı MasterPass tarafından sağlanmaktadır.</p>
                </div>

                <div className='col-md-12 p-4'>

                    <div className='form-group row'>
                        {
                            this.state.cards.map((card, index) => (
                                <PaymentCard
                                    index={index}
                                    item={card}
                                    selected={this.state.selectedCard === index} setSelectedCard={this.setSelectedCard}
                                />
                            ))
                        }
                    </div>

                    <div className='form-group row'>
                        <div className='col-md-12'>
                            <input
                                onChange={this.showNewCardSection}
                                type='checkbox'
                                className='form-check-label'
                                id='dont-forget'
                                name='dont-forget'
                                placeholder=''
                                style={{ cursor: 'pointer' }} />

                            <label
                                htmlFor='dont-forget'
                                className='form-check-label ml-2 text-primary'
                                style={{ cursor: 'pointer' }}>Yeni Bir Kredi Kartı Bilgisi Girerek Öde.</label>
                        </div>
                    </div>
                </div>

                <div id={'new-card'} className='col-md-12 p-4' style={{ display: this.state.showNewCardSection ? 'unset' : 'none' }}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='row'>
                                <div className='col-md-12'>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='cardAlias' className='text-black'>Card Alias <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onAliasChange}
                                                type='text'
                                                className='form-control'
                                                id='cardAlias'
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
                                                name='cardHolderName'
                                                value={cardHolderName}
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <label htmlFor='cardNumber' className='text-black'>Kart No <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onCardNoChange}
                                                type='text'
                                                className='form-control'
                                                id='cardNumber'
                                                name='cardNumber'
                                                value={cardNumber}
                                            />
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-md-6'>
                                            <label htmlFor='expireMonth' className='text-black'>Expire Month <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onExpireMonthChange}
                                                type='text'
                                                className='form-control'
                                                id='expireMonth'
                                                name='expireMonth'
                                                value={expireMonth}
                                            />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor='expireYear' className='text-black'>Expire Year <span className='text-danger'>*</span></label>
                                            <input
                                                onChange={this.onExpireYearChange}
                                                type='text'
                                                className='form-control'
                                                id='expireYear'
                                                name='expireYear'
                                                value={expireYear}
                                            />
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
                                                name='cvc2'
                                                value={cvc2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const totalPrice = this.state.products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * currentValue.quantity, 0).toFixed(2)

        const divider = [
            {
                path: null, title: 'Payment'
            }
        ]
        if (this.state.fetching) {
            return <Loading />
        } else {
            return (
                <SiteWrap divider={divider}>
                    {
                        this.state.showSaveAddressPopup && <AddressPopup hideSaveAddressPopup={this.hideSaveAddressPopup} />
                    }
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-9'>
                                <div className='row mb-5'>
                                    <div className='col-md-12'>
                                        <div className='row border'>
                                            <div className='col-md-6 border-right p-3' style={{ cursor: 'pointer' }} onClick={this.onAddressOptionsClick}>
                                                <h3 className={'text-secondary'}>Adres Bilgileri</h3>
                                                <p className={'text-primary h5'}>{this.state.addresses[this.state.selectedAddress]?.addressTitle}</p>
                                                <p className={'text-black h6'}>{this.state.addresses[this.state.selectedAddress]?.openAddress}</p>
                                            </div>
                                            <div className='col-md-6 p-3' style={{ cursor: 'pointer' }} onClick={this.onPaymentOptionsClick}>
                                                <h3 className={'text-secondary'}>Ödeme Seçenekleri</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    this.renderPaymentOptions()
                                }
                                {
                                    this.renderAddresses()
                                }
                            </div>
                            <div className='col-md-3'>
                                <div className='col-md-12 border p-4'>
                                    <div className='row'>
                                        <div className='col-md-12 text-left mb-5'>
                                            <h3 className='text-black h4 text-uppercase'>Cart Totals</h3>
                                        </div>
                                    </div>
                                    <div className='row mb-5'>
                                        <div className='col-md-6'>
                                            <span className='text-black'>Total</span>
                                        </div>
                                        <div className='col-md-6 text-right'>
                                            <strong className='text-black'>{`₺${totalPrice}`}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className='row pt-3'>
                                    <div className='col-md-12'>
                                        <button className='btn btn-primary btn-lg btn-block' onClick={this.onCompletePaymentClick}>Ödemeye Geç</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SiteWrap>
            )
        }
    }
}

export default Payment