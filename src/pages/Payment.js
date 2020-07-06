import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import VanillaToasts from 'vanillatoasts'
import Cookies from 'universal-cookie'

import SiteWrap from '../components/SiteWrap'
import Loading from '../components/Loading'
import EmptyAddressCard from '../components/EmptyAddressCard'
import AddressCard from '../components/AddressCard'
import PaymentCard from '../components/PaymentCard'

import AddressPopup from '../components/AddressPopup'
import CreditCardPopup from '../components/CreditCardPopup'
import CardDeletePopup from '../components/CardDeletePopup'
import AddressDeletePopup from '../components/AddressDeletePopup'

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
        showDeleteAddressPopup: false,
        showDeleteCardPopup: false,
        showCardPopup: false,
        deleteCardToken: null,
        deleteAddressId: null
    }

    setSelectedCard = (selectedCard) => {
        this.setState({ selectedCard })
    }

    setSelectedAddress = (selectedAddress) => {
        this.setState({ selectedAddress })
    }

    showCardPopup = () => {
        this.setState({ showCardPopup: true })
    }

    hideCreditCardPopup = (creditCard) => {
        if (creditCard) this.state.cards.push(creditCard)
        this.setState({ showCardPopup: false, cards: this.state.cards })
    }

    showSaveAddressPopup = () => {
        this.setState({ showSaveAddressPopup: true })
    }

    hideSaveAddressPopup = (addresses) => {
        this.setState({ showSaveAddressPopup: false, addresses: addresses || this.state.addresses })
    }

    showDeleteAddressPopup = (deleteAddressId) => {
        this.setState({ showDeleteAddressPopup: true, deleteAddressId })
    }

    hideDeleteAddressPopup = (addresses) => {
        this.setState({ showDeleteAddressPopup: false, addresses: addresses ?? [] })
    }

    showDeleteCardPopup = (deleteCardToken) => {
        this.setState({ showDeleteCardPopup: true, deleteCardToken })
    }

    hideDeleteCardPopup = (cardToken) => {
        if (cardToken) {
            const selectedCard = this.state.cards.find((card) => card.cardToken === cardToken)
            const selectedCardIndex = this.state.cards.indexOf(selectedCard)
            this.state.cards.splice(selectedCardIndex, 1)
        }

        this.setState({ showDeleteCardPopup: false, cards: this.state.cards })
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
        })
    )

    UNSAFE_componentWillMount() {
        if (cookies.get('token')) {
            this.setDatas()
        } else {
            VanillaToasts.create({
                title: `Devam etmeden önce giriş yapmalısınız.`,
                positionClass: 'topRight',
                type: 'error',
                timeout: 5 * 1000
            })

            this.props.history.push('/sign-in')
        }
    }

    onCompletePaymentClick = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/user/order`, {
            address: this.state.addresses[this.state.selectedAddress]._id,
            card: this.state.cards[this.state.selectedCard].cardToken
        }).then(({ status, data }) => {
            if (status === 200) {
                this.props.history.push('payment-completed', { order: data.order })
            }
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

    renderAddressesSection = () => (
        <div id={'addresses'} className='row mb-5 border'>
            <div className='col-md-12 p-4'>
                <h3 className={'text-secondary'}>Adres Seçimi</h3>
            </div>
            <div className='col-md-12 p-4'>
                <div className='row'>
                    {
                        this.state.addresses.map((address, index) => (
                            <AddressCard
                                index={index}
                                item={address}
                                showDeleteAddressPopup={this.showDeleteAddressPopup}
                                selected={this.state.selectedAddress === index} setSelectedAddress={this.setSelectedAddress} />
                        ))
                    }
                    <EmptyAddressCard showSaveAddressPopup={this.showSaveAddressPopup} />
                </div>
            </div>
        </div>
    )

    renderPaymentOptionsSection = () => {
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
                                    showDeleteCardPopup={this.showDeleteCardPopup}
                                    selected={this.state.selectedCard === index} setSelectedCard={this.setSelectedCard}
                                />
                            ))
                        }
                    </div>

                    <div className='form-group row'>
                        <div className='ml-auto'>
                            <button className='btn btn-primary btn-lg btn-block' onClick={this.showCardPopup}>Yeni Bir Kredi Kartı Bilgisi Girerek Öde.</button>
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
                    <>

                        {
                            this.state.showSaveAddressPopup && <AddressPopup hideSaveAddressPopup={this.hideSaveAddressPopup} />
                        }

                        {
                            this.state.showDeleteAddressPopup && <AddressDeletePopup deleteAddressId={this.state.deleteAddressId} hideDeleteAddressPopup={this.hideDeleteAddressPopup} />
                        }

                        {
                            this.state.showCardPopup && <CreditCardPopup hideCreditCardPopup={this.hideCreditCardPopup} />
                        }

                        {
                            this.state.showDeleteCardPopup && <CardDeletePopup deleteCardToken={this.state.deleteCardToken} hideDeleteCardPopup={this.hideDeleteCardPopup} />
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
                                                    <p className={'text-primary h5'}>{this.state.cards[this.state.selectedCard]?.cardAlias}</p>
                                                    <p className={'text-black h6'}>{this.state.cards[this.state.selectedCard] ? '**** **** **** ' + this.state.cards[this.state.selectedCard]?.lastFourDigits : ''}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        this.renderPaymentOptionsSection()
                                    }
                                    {
                                        this.renderAddressesSection()
                                    }
                                </div>
                                <div className='col-md-3'>
                                    <div className='col-md-12 border p-4'>
                                        <div className='row'>
                                            <div className='col-md-12 text-left mb-5'>
                                                <h3 className='text-black h4 text-uppercase'>Sepet tutarı</h3>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <span className='text-black'>Toplam</span>
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
                    </>
                </SiteWrap>
            )
        }
    }
}

export default Payment