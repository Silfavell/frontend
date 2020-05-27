/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'
import { IoIosAdd } from 'react-icons/io'

import SiteWrap from '../components/SiteWrap'
import EmptyAddressCart from '../components/EmptyAddressCart'
import AddressCart from '../components/AddressCart'

class Payment extends React.Component {

    state = {
        products: []
    }

    UNSAFE_componentWillMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/user/cart`).then(({ data }) => {
            if (data) {
                this.setState({ products: Object.values(data) })
            }
        })
    }

    onCompletePaymentClick = () => {
        console.log('complete payment')
    }

    render() {
        const totalPrice = this.state.products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * currentValue.quantity, 0).toFixed(2)

        return (
            <SiteWrap divider>
                <div class='container'>
                    <div class='row mb-5'>
                        <div class='col-md-12'>
                            <div className='border'></div>
                        </div>
                    </div>

                    <div class='row mb-5 border'>
                        <div class='col-md-12 p-4   '>
                            <h2 className={'text-secondary'}>Adres Seçimi</h2>
                        </div>
                        <div class='col-md-12 p-4'>
                            <div className='row'>
                                <AddressCart />
                                <AddressCart />
                                <EmptyAddressCart />
                            </div>
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col-md-6'>
                            <div class='row mb-5'>
                                <div class='col-md-6 mb-3 mb-md-0'>
                                    <button class='btn btn-primary btn-sm btn-block'>Update Cart</button>
                                </div>
                                <div class='col-md-6'>
                                    <a href='/shop'>
                                        <button class='btn btn-outline-primary btn-sm btn-block'>Continue Shopping</button>
                                    </a>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <label class='text-black h4' for='coupon'>Coupon</label>
                                    <p>Enter your coupon code if you have one.</p>
                                </div>
                                <div class='col-md-8 mb-3 mb-md-0'>
                                    <input type='text' class='form-control py-3' id='coupon' placeholder='Coupon Code' />
                                </div>
                                <div class='col-md-4'>
                                    <button class='btn btn-primary btn-sm px-4'>Apply Coupon</button>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-6 pl-5'>
                            <div class='row justify-content-end'>
                                <div class='col-md-7'>
                                    <div class='row'>
                                        <div class='col-md-12 text-right border-bottom mb-5'>
                                            <h3 class='text-black h4 text-uppercase'>Cart Totals</h3>
                                        </div>
                                    </div>
                                    <div class='row mb-5'>
                                        <div class='col-md-6'>
                                            <span class='text-black'>Total</span>
                                        </div>
                                        <div class='col-md-6 text-right'>
                                            <strong class='text-black'>{`₺${totalPrice}`}</strong>
                                        </div>
                                    </div>

                                    <div class='row'>
                                        <div class='col-md-12'>
                                            <button class='btn btn-primary btn-lg btn-block' onClick={this.onCompletePaymentClick}>Ödemeye Geç</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SiteWrap >
        )
    }
}

export default Payment