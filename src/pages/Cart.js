/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import SiteWrap from '../components/SiteWrap'
import CartItem from '../components/CartItem'

const cookies = new Cookies()

class Cart extends React.Component {

    state = {
        products: []
    }

    fetchOfflineCartProducts = (products) => {
        const url = `${process.env.REACT_APP_API_URL}/products-filter?productIds=${
            products.map((cartProduct) => cartProduct._id).join(',')
            }`


        return axios.get(url).then(({ data }) => data)
    }

    UNSAFE_componentWillMount() {
        if (cookies.get('token')) {
            axios.get(`${process.env.REACT_APP_API_URL}/user/cart`).then(({ data }) => {
                if (data && data.cart) {
                    this.setState({ products: Object.values(data.cart) })
                }
            })
        } else {
            const cart = window.localStorage.getItem('cart')

            if (cart) {
                const cartAsArray = JSON.parse(cart)
                if (cartAsArray.length > 0) {
                    this.fetchOfflineCartProducts(cartAsArray).then((products) => {
                        this.setState({
                            products: products.map((product, index) => Object.assign(product, { quantity: cartAsArray[index].quantity }))
                        })
                    })
                }
            }
        }
    }

    onCheckoutClick = () => {
        this.props.history.push('/payment')
    }

    cartWithProducts = ({ products, onIncreaseClick, onDecreaseClick, setProductQuantity }) => {
        const totalPrice = products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * currentValue.quantity, 0).toFixed(2)

        return (
            <div className='container'>
                <div className='row mb-5'>
                    <div className='col-md-9'>
                        <div className='site-blocks-table'>
                            <table className='table border'>
                                <tbody>
                                    {
                                        products.map((product) => (
                                            <CartItem
                                                key={product._id + ':' + product.quantity}
                                                item={product}
                                                onIncreaseClick={onIncreaseClick}
                                                onDecreaseClick={onDecreaseClick}
                                                setProductQuantity={setProductQuantity}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
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
                                <button className='btn btn-primary btn-lg btn-block' onClick={this.onCheckoutClick}>Ödemeye Geç</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-6'>
                        {
                            //  <div className='row mb-5'>
                            //      <div className='col-md-6 mb-3 mb-md-0'>
                            //          <button className='btn btn-primary btn-sm btn-block'>Update Cart</button>
                            //      </div>
                            //      <div className='col-md-6'>
                            //          <a href='/shop'>
                            //              <button className='btn btn-outline-primary btn-sm btn-block'>Continue Shopping</button>
                            //          </a>
                            //      </div>
                            //  </div>
                        }
                        <div className='row'>
                            <div className='col-md-12'>
                                <label className='text-black h4' htmlFor='coupon'>Kupon</label>
                                <p>Indirim kodunuz varsa giriniz</p>
                            </div>
                            <div className='col-md-8 mb-3 mb-md-0'>
                                <input type='text' className='form-control py-3' id='coupon' placeholder='Indirim kuponu' />
                            </div>
                            <div className='col-md-4'>
                                <button className='btn btn-primary btn-sm px-4'>Kuponu kullan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    cartWithoutProducts = () => (
        <div className='container d-flex align-items-center justify-content-center flex-column' style={{ height: 300 }}>
            <h2 className={'text-black'}>Sepetiniz Boş</h2>
            <p className={'text-black'} style={{ fontSize: 18, marginTop: 32 }}>Favori ürünlerinize veya size özel önerilerimize göz atarak alışverişe başlayabilirsiniz.</p>
        </div>
    )

    render() {
        const divider = [
            {
                path: null,
                title: 'Sepetim'
            }
        ]

        return (
            <SiteWrap divider={divider}>
                {
                    this.state.products.length > 0 ? <this.cartWithProducts /> : <this.cartWithoutProducts />
                }
            </SiteWrap>
        )
    }
}

export default Cart