/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

import SiteWrap from '../components/SiteWrap'
import CartItem from '../components/CartItem'

const cartItem = {
    img: process.env.PUBLIC_URL + '/product.jpg',
    name: 'Top Up T - Shirt',
    price: 72.35,
    quantity: 2
}

class Cart extends React.Component {
    render() {
        return (
            <SiteWrap divider>
                <div class='container'>
                    <div class='row mb-5'>
                        <div class='col-md-12'>
                            <div class='site-blocks-table'>
                                <table class='table border'>
                                    <tbody>
                                        <CartItem item={cartItem} />
                                        <CartItem item={cartItem} />
                                    </tbody>
                                </table>
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
                                    <div class='row mb-3'>
                                        <div class='col-md-6'>
                                            <span class='text-black'>Subtotal</span>
                                        </div>
                                        <div class='col-md-6 text-right'>
                                            <strong class='text-black'>$230.00</strong>
                                        </div>
                                    </div>
                                    <div class='row mb-5'>
                                        <div class='col-md-6'>
                                            <span class='text-black'>Total</span>
                                        </div>
                                        <div class='col-md-6 text-right'>
                                            <strong class='text-black'>$230.00</strong>
                                        </div>
                                    </div>

                                    <div class='row'>
                                        <div class='col-md-12'>
                                            <button class='btn btn-primary btn-lg btn-block' onclick='window.location=checkout.html'>Proceed To Checkout</button>
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

export default Cart