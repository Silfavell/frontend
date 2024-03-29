import React from 'react'

import $ from 'jquery'

import Loading from '../../components/Loading/Loading'
import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'
import {
    getCartProducts, getProfile, listCards, makeOrder
} from '../../scripts/requests'
import AddressCard from './AddressCard'
import AddressDeletePopup from './AddressDeletePopup'
import AddressPopup from './AddressPopup'
import CardDeletePopup from './CardDeletePopup'
import CreditCardPopup from './CreditCardPopup'
import EmptyAddressCard from './EmptyAddressCard'
import PaymentCard from './PaymentCard'
import PreInfo from './PreInfo'
import SalesContract from './SalesContract'

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
        showPreInfoPopup: false,

        isPreInfoChecked: false,
        isSalesContractChecked: false,

        deleteCardToken: null,
        deleteAddressId: null
    }

    componentDidMount() {
        this.setDatas()
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

    showSalesContractPopup = () => {
        this.setState({ showSalesContractPopup: true })
    }

    hideSalesContractPopup = () => {
        this.setState({ showSalesContractPopup: false })
    }

    showPreInfoPopup = () => {
        this.setState({ showPreInfoPopup: true })
    }

    hidePreInfoPopup = () => {
        this.setState({ showPreInfoPopup: false })
    }

    setDatas = async () => {
        const [cartSource, cardsSource, profileSource] = await Promise.all([getCartProducts(), listCards(), getProfile()])

        this.setState({
            products: Object.values(cartSource.data.cart ?? {}),
            cards: cardsSource.data.cardDetails ?? [],
            profile: profileSource.data,
            addresses: profileSource.data.addresses,
            fetching: false
        })
    }

    onCompletePaymentClick = async () => {
        const { status, data } = await makeOrder({
            address: this.state.addresses[this.state.selectedAddress]._id,
            card: this.state.cards[this.state.selectedCard].cardToken
        })

        if (status === 200) {
            this.props.history.push('payment-completed', { order: data.order })
        }
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
        <div id='addresses' className='mb-5 border'>
            <div className='col-md-12 p-4'>
                <p className='text-gray h5'>Adres Seçimi</p>
            </div>
            <div className='col-md-12 p-4'>
                <div className='row'>
                    {
                        this.state.addresses.map((address, index) => (
                            <AddressCard
                                index={index}
                                item={address}
                                showDeleteAddressPopup={this.showDeleteAddressPopup}
                                selected={this.state.selectedAddress === index}
                                setSelectedAddress={this.setSelectedAddress} />
                        ))
                    }
                </div>
            </div>
            <EmptyAddressCard showSaveAddressPopup={this.showSaveAddressPopup} />
        </div>
    )

    renderPaymentOptionsSection = () => (
        <div id='paymentOptions' className='mb-5 border' style={{ display: 'none' }}>
            <div className='col-md-12 p-4'>
                <p className='text-gray h6'>Kredi kartı bilgileriniz Silfavell tarafından saklanmamaktadır.</p>
                {
                    // <p className={'text-black font-weight-bold h6'}>Ödeme altyapısı MasterPass tarafından sağlanmaktadır.</p>
                }
            </div>

            <div className='col-md-12 p-4'>

                <div className='form-group row'>
                    {
                        this.state.cards.map((card, index) => (
                            <PaymentCard
                                index={index}
                                item={card}
                                showDeleteCardPopup={this.showDeleteCardPopup}
                                selected={this.state.selectedCard === index}
                                setSelectedCard={this.setSelectedCard} />
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

    onSalesContractChange = (event) => {
        this.setState({ isSalesContractChecked: event.target.checked })
    }

    onPreInfoChange = (event) => {
        this.setState({ isPreInfoChecked: event.target.checked })
    }

    render() {
        const totalPrice = this.state.products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.discountedPrice || currentValue.price) * currentValue.quantity, 0)
        const cargoPrice = totalPrice < 85 ? 15 : 0

        if (this.state.fetching) {
            return <Loading />
        }

        return (
            <>

                {
                    this.state.showSaveAddressPopup && <AddressPopup hidePopup={this.hideSaveAddressPopup} />
                }

                {
                    this.state.showDeleteAddressPopup && <AddressDeletePopup deleteAddressId={this.state.deleteAddressId} hidePopup={this.hideDeleteAddressPopup} />
                }

                {
                    this.state.showCardPopup && <CreditCardPopup hidePopup={this.hideCreditCardPopup} />
                }

                {
                    this.state.showDeleteCardPopup && <CardDeletePopup deleteCardToken={this.state.deleteCardToken} hidePopup={this.hideDeleteCardPopup} />
                }

                {
                    this.state.showSalesContractPopup && (
                        <SalesContract
                            hideSalesContractPopup={this.hideSalesContractPopup}
                            profile={this.state.profile}
                            products={this.state.products}
                            address={this.state.addresses[this.state.selectedAddress]} />
                    )
                }

                {
                    this.state.showPreInfoPopup && (
                        <PreInfo
                            hidePreInfoPopup={this.hidePreInfoPopup}
                            profile={this.state.profile}
                            products={this.state.products}
                            address={this.state.addresses[this.state.selectedAddress]} />
                    )
                }

                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='mb-5'>
                                <div className='col-md-12'>
                                    <div className='row border'>
                                        <div className='col-md-6 border-right p-3' style={{ cursor: 'pointer', borderBottom: this.state.selected === 0 ? '2px solid #EE4266' : '' }} onClick={this.onAddressOptionsClick}>
                                            <h4 className='text-secondary'>Adres Bilgileri</h4>
                                            <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} className='text-primary h5'>{this.state.addresses[this.state.selectedAddress]?.addressTitle}</p>
                                            <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} className='text-black h6'>{this.state.addresses[this.state.selectedAddress]?.openAddress}</p>
                                        </div>
                                        <div className='col-md-6 p-3' style={{ cursor: 'pointer', borderBottom: this.state.selected === 1 ? '2px solid #EE4266' : '' }} onClick={this.onPaymentOptionsClick}>
                                            <h4 className='text-secondary'>Ödeme Seçenekleri</h4>
                                            <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} className='text-primary h5'>{this.state.cards[this.state.selectedCard]?.cardAlias}</p>
                                            <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }} className='text-black h6'>{this.state.cards[this.state.selectedCard] ? `**** **** **** ${this.state.cards[this.state.selectedCard]?.lastFourDigits}` : ''}</p>
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
                                        <strong className='text-black'>{`₺${totalPrice.toFixed(2)}`}</strong>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className='text-black'>Kargo Ücreti</span>
                                    </div>
                                    <div className='col-6 text-right'>
                                        <strong className='text-black'>{`₺${cargoPrice.toFixed(2)}`}</strong>
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
                                        <span onClick={this.showPreInfoPopup} className='text-primary' style={{ cursor: 'pointer' }}>Ön Bilgilendirme Formu</span>
                                        {'\'nu kabul ediyorum.'}
                                    </label>
                                </div>
                            </div>

                            <div className='border border-top-0 px-3 py-2'>
                                <div className='form-check form-check-inline'>
                                    <input className='form-check-input' type='checkbox' checked={this.state.isSalesContractChecked} onChange={this.onSalesContractChange} style={{ width: 20, height: 20, cursor: 'pointer' }} />
                                    <label className='form-check-label  ml-2'>
                                        <span onClick={this.showSalesContractPopup} className='text-primary' style={{ cursor: 'pointer' }}>Mesafeli Satış Sözleşmesi</span>
                                        {'\'ni kabul ediyorum.'}
                                    </label>
                                </div>
                            </div>

                            <div className='row pt-3'>
                                <div className='col-md-12'>
                                    <button
                                        disabled={
                                            !this.state.isPreInfoChecked
                                                || !this.state.isSalesContractChecked
                                                || !this.state.addresses[this.state.selectedAddress]
                                                || !this.state.cards[this.state.selectedCard]
                                        }
                                        className='btn btn-primary btn-lg btn-block'
                                        onClick={this.onCompletePaymentClick}>
                                        Ödemeyi Tamamla
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const breadcrumb = [
    {
        path: null, title: 'Ödemeyi Tamamla'
    }
]

export default SiteWrapHoc(Payment, { breadcrumb })
