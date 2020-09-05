import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import VanillaToasts from 'vanillatoasts'
import Cookies from 'universal-cookie'

import SiteWrap from '../components/SiteWrap'
import Loading from '../components/Loading'
import EmptyAddressCard from '../components/Payment/EmptyAddressCard'
import AddressCard from '../components/Payment/AddressCard'
import PaymentCard from '../components/Payment/PaymentCard'

import AddressPopup from '../components/Payment/AddressPopup'
import CreditCardPopup from '../components/Payment/CreditCardPopup'
import CardDeletePopup from '../components/Payment/CardDeletePopup'
import AddressDeletePopup from '../components/Payment/AddressDeletePopup'
import SalesContract from '../components/Payment/SalesContract'
import PreInfo from '../components/Payment/PreInfo'

const cookies = new Cookies()

class Payment extends React.Component {

    state = {
        fetching: true,
        selected: 0,
        products: [],
        profile: {},
        addresses: [],
        cards: [],

        selectedAddress: 0,
        selectedCard: 0,

        showSaveAddressPopup: false,
        showDeleteAddressPopup: false,
        showDeleteCardPopup: false,
        showCardPopup: false,
        showSalesContractPopup: false,
        showPreInfoPopup: true,

        isPreInfoChecked: false,
        isSalesContractChecked: false,

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
        this.setState({ showDeleteAddressPopup: false, addresses: addresses ?? this.state.addresses })
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

    getProfile = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/user/profile`).then(({ status, data }) => data)
    )

    showSalesContractPopup = () => {
        this.setState({ showSalesContractPopup: true })
    }

    hideSalesContractPopup = (addresses) => {
        this.setState({ showSalesContractPopup: false })
    }

    showPreInfoPopup = () => {
        this.setState({ showPreInfoPopup: true })
    }

    hidePreInfoPopup = () => {
        this.setState({ showPreInfoPopup: false })
    }

    setDatas = () => (
        Promise.all([this.getCart(), this.getPaymentCards(), this.getProfile()]).then((results) => {
            this.setState({
                products: Object.values(results[0]?.cart ?? {}),
                cards: results[1] ?? [],
                profile: results[2],
                addresses: results[2]?.addresses ?? [],
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
        this.setState({ selected: 0 })
    }

    onPaymentOptionsClick = () => {
        $('#addresses').hide()
        $('#paymentOptions').fadeIn('slow')
        this.setState({ selected: 1 })
    }

    renderAddressesSection = () => (
        <div id={'addresses'} className='mb-5 border'>
            <div className='col-md-12 p-4'>
                <p className={'text-gray h5'}>Adres Seçimi</p>
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
                </div>
            </div>
            <EmptyAddressCard showSaveAddressPopup={this.showSaveAddressPopup} />
        </div>
    )

    renderPaymentOptionsSection = () => {
        return (
            <div id={'paymentOptions'} className='mb-5 border' style={{ display: 'none' }}>
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
                            <button className='btn btn-primary btn-lg btn-block' onClick={this.showCardPopup}>Yeni bir kart ekle</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onSalesContractChange = (event) => {
        this.setState({ isSalesContractChecked: event.target.checked })
    }

    onPreInfoChange = (event) => {
        this.setState({ isPreInfoChecked: event.target.checked })
    }

    render() {
        const totalPrice = this.state.products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.discountedPrice || currentValue.price) * currentValue.quantity, 0).toFixed(2)
        const cargoPrice = (15).toFixed(2)

        const divider = [
            {
                path: null, title: 'Ödemeyi Tamamla'
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

                        {
                            this.state.showSalesContractPopup && (
                                <SalesContract
                                    hideSalesContractPopup={this.hideSalesContractPopup}
                                    profile={this.state.profile}
                                    products={this.state.products}
                                    address={this.state.addresses[this.state.selectedAddress]}
                                />
                            )
                        }

                        {
                            this.state.showPreInfoPopup && (
                                <PreInfo
                                    hidePreInfoPopup={this.hidePreInfoPopup}
                                    profile={this.state.profile}
                                    products={this.state.products}
                                    address={this.state.addresses[this.state.selectedAddress]}
                                />
                            )
                        }

                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <div className='mb-5'>
                                        <div className='col-md-12'>
                                            <div className='row border'>
                                                <div className='col-md-6 border-right p-3' style={{ cursor: 'pointer', borderBottom: this.state.selected === 0 ? '2px solid #EE4266' : '' }} onClick={this.onAddressOptionsClick}>
                                                    <h4 className={'text-secondary'}>Adres Bilgileri</h4>
                                                    <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} className={'text-primary h5'}>{this.state.addresses[this.state.selectedAddress]?.addressTitle}</p>
                                                    <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} className={'text-black h6'}>{this.state.addresses[this.state.selectedAddress]?.openAddress}</p>
                                                </div>
                                                <div className='col-md-6 p-3' style={{ cursor: 'pointer', borderBottom: this.state.selected === 1 ? '2px solid #EE4266' : '' }} onClick={this.onPaymentOptionsClick}>
                                                    <h4 className={'text-secondary'}>Ödeme Seçenekleri</h4>
                                                    <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} className={'text-primary h5'}>{this.state.cards[this.state.selectedCard]?.cardAlias}</p>
                                                    <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} className={'text-black h6'}>{this.state.cards[this.state.selectedCard] ? '**** **** **** ' + this.state.cards[this.state.selectedCard]?.lastFourDigits : ''}</p>
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
                                <div className='col-md-4'>
                                    <div className='col-md-12 border p-4'>
                                        <div className='row'>
                                            <div className='col-md-12 text-left mb-5'>
                                                <h3 className='text-black h4 text-uppercase'>Sepet tutarı</h3>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <span className='text-black'>Tutar</span>
                                            </div>
                                            <div className='col-6 text-right'>
                                                <strong className='text-black'>{`₺${totalPrice}`}</strong>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <span className='text-black'>Kargo Ücreti</span>
                                            </div>
                                            <div className='col-6 text-right'>
                                                <strong className='text-black'>{`₺${cargoPrice}`}</strong>
                                            </div>
                                        </div>
                                        <div className='row pt-4'>
                                            <div className='col-6'>
                                                <span className='text-black'>Toplam</span>
                                            </div>
                                            <div className='col-6 text-right'>
                                                <strong className='text-black'>{`₺${(parseFloat(totalPrice) + parseFloat(cargoPrice)).toFixed(2)}`}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='border border-top-0 px-3 py-2'>
                                        <div className='form-check form-check-inline'>
                                            <input className='form-check-input' type='checkbox' checked={this.state.isPreInfoChecked} onChange={this.onPreInfoChange} style={{ width: 20, height: 20, cursor: 'pointer' }} />
                                            <label className='form-check-label  ml-2'>
                                                <span onClick={this.showPreInfoPopup} className='text-primary' style={{ cursor: 'pointer' }}>Ön Bilgilendirme Formu</span>'nu kabul ediyorum.
                                            </label>
                                        </div>
                                    </div>

                                    <div className='border border-top-0 px-3 py-2'>
                                        <div className='form-check form-check-inline'>
                                            <input className='form-check-input' type='checkbox' checked={this.state.isSalesContractChecked} onChange={this.onSalesContractChange} style={{ width: 20, height: 20, cursor: 'pointer' }} />
                                            <label className='form-check-label  ml-2'>
                                                <span onClick={this.showSalesContractPopup} className='text-primary' style={{ cursor: 'pointer' }}>Mesafeli Satış Sözleşmesi</span>'ni kabul ediyorum.
                                             </label>
                                        </div>
                                    </div>

                                    <div className='row pt-3'>
                                        <div className='col-md-12'>
                                            <button
                                                disabled={
                                                    !this.state.isPreInfoChecked ||
                                                    !this.state.isSalesContractChecked ||
                                                    !this.state.addresses[this.state.selectedAddress] ||
                                                    !this.state.cards[this.state.selectedCard]
                                                }
                                                className='btn btn-primary btn-lg btn-block'
                                                onClick={this.onCompletePaymentClick}>Ödemeyi Tamamla</button>
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