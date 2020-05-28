/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'

import SiteWrap from '../components/SiteWrap'
import CartItem from '../components/CartItem'

class Cart extends React.Component {

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

    onCheckoutClick = () => {
        this.props.history.push('/payment')
    }

    cartWithProducts = (totalPrice) => (
        <div className='container'>
            <div className='row mb-5'>
                <div className='col-md-12'>
                    <div className='site-blocks-table'>
                        <table className='table border'>
                            <tbody>
                                {
                                    this.state.products.map((product) => (
                                        <CartItem item={product} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <div className='row mb-5'>
                        <div className='col-md-6 mb-3 mb-md-0'>
                            <button className='btn btn-primary btn-sm btn-block'>Update Cart</button>
                        </div>
                        <div className='col-md-6'>
                            <a href='/shop'>
                                <button className='btn btn-outline-primary btn-sm btn-block'>Continue Shopping</button>
                            </a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='text-black h4' htmlFor='coupon'>Coupon</label>
                            <p>Enter your coupon code if you have one.</p>
                        </div>
                        <div className='col-md-8 mb-3 mb-md-0'>
                            <input type='text' className='form-control py-3' id='coupon' placeholder='Coupon Code' />
                        </div>
                        <div className='col-md-4'>
                            <button className='btn btn-primary btn-sm px-4'>Apply Coupon</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 pl-5'>
                    <div className='row justify-content-end'>
                        <div className='col-md-7'>
                            <div className='row'>
                                <div className='col-md-12 text-right border-bottom mb-5'>
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

                            <div className='row'>
                                <div className='col-md-12'>
                                    <button className='btn btn-primary btn-lg btn-block' onClick={this.onCheckoutClick}>Proceed To Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    cartWithoutProducts = () => (
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 d-flex align-items-center justify-content-center flex-column">
                        <h3 className={'text-black'}>Sepetiniz Boş</h3>
                        <p className={'text-black'}>Favori ürünlerinize veya size özel önerilerimize göz atarak alışverişe başlayabilirsiniz.</p>
                    </div>
                </div>
            </div>
        </div>
    )

    render() {
        const totalPrice = this.state.products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * currentValue.quantity, 0).toFixed(2)

        return (
            <SiteWrap divider>
                {
                    this.state.products.length > 0 ?
                        this.cartWithProducts(totalPrice) : this.cartWithoutProducts()
                }
            </SiteWrap>
        )
    }
}

export default Cart