/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React from 'react'
import Cookies from 'universal-cookie'
import VanillaToasts from 'vanillatoasts'

import Loading from '../components/Loading'
import SiteWrap from '../components/SiteWrap'

const cookies = new Cookies()

class ShopSingle extends React.Component {

    state = {
        product: {}
    }

    componentWillMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/product/${this.props.match.params._id}`).then(({ data: product }) => {
            this.setState({ product }, () => {
                const visitedProducts = window.localStorage.getItem('visitedProducts')
                if (visitedProducts) {
                    const visitedProductsAsArray = JSON.parse(visitedProducts)
                    if (visitedProductsAsArray.indexOf(product._id) !== -1) {
                        visitedProductsAsArray.splice(visitedProductsAsArray.indexOf(product._id), 1)
                    }
                    visitedProductsAsArray.push(product._id)
                    window.localStorage.setItem('visitedProducts', JSON.stringify(visitedProductsAsArray))
                } else {
                    window.localStorage.setItem('visitedProducts', JSON.stringify([product._id]))
                }
            })
        }).catch((err) => {
            this.props.history.push('/not-found')
        })
    }

    addProductToCart = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/add-product/${this.props.match.params._id}`).then(({ status, data }) => {
            if (status === 200) {
                if (!cookies.get('token')) {
                    const cart = window.localStorage.getItem('cart')

                    if (cart) {
                        const cartAsArray = JSON.parse(cart)
                        const foundProduct = cartAsArray.find((cartProduct) => cartProduct._id === data._id)
                        if (foundProduct) {
                            cartAsArray[cartAsArray.indexOf(foundProduct)].quantity++
                        } else {
                            cartAsArray.push({ _id: data._id, quantity: 1 })
                        }
                        window.localStorage.setItem('cart', JSON.stringify(cartAsArray))
                    } else {
                        window.localStorage.setItem('cart', JSON.stringify([{ _id: data._id, quantity: 1 }]))
                    }
                }

                VanillaToasts.create({
                    title: `Ürünü sepete eklendi.`,
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })
            }
        })
    }

    render() {
        const {
            _id,
            name,
            price,
            brand,
            image
        } = this.state.product

        const divider = [
            { path: '/shop', title: 'shop' },
            { path: null, title: name }
        ]

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${image}-0.webp`

        if (_id) {
            return (
                <SiteWrap divider={divider}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div style={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
                                    <img
                                        src={url}
                                        alt=''
                                        onError={(event) => {
                                            event.target.src = process.env.PUBLIC_URL + '/empty-image.webp'
                                        }}
                                        className='img-fluid'
                                    />
                                </div>

                            </div>
                            <div className='col-md-6'>
                                <h2 className='text-black'>{name}</h2>
                                <p className='text-primary h5'>{brand}</p>
                                <p className='mb-4'>
                                    • Keçi sütlü formülü ve yoğun proteinli yapısı ile dudaklarıınız MATTE LIPS ile daha nemli bir görünüme kavuşacaktır. <br />
                                    • Dudaklarınızda uzun süreli ,doğal mat etki sağlar. Kremsi yapısı ile örtücülüğü mükemmeldir. <br />
                                    • Keçi sütü ve E Vitamini dudaklarınız gün boyu nemlendirilecektir. <br />
                                    • Paraben içermez. <br />
                                    • Dermatolojik olarak test edilmiştir. <br />
                                    • Gün boyu güzelliğinizle büyülerken cildiniz beslensin!
                                </p>
                                <p><strong className='text-primary h4'>{'₺' + price.toFixed(2).toString().replace('.', ',')}</strong></p>
                                {
                                    /*
                                    <div className='mb-1 d-flex'>
                                        <label htmlFor='option-sm' className='d-flex mr-3 mb-3'>
                                            <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                                <input type='radio' id='option-sm' name='shop-sizes' />
                                            </span>
                                            <span className='d-inline-block text-black'>Small</span>
                                        </label>
                                        <label htmlFor='option-md' className='d-flex mr-3 mb-3'>
                                            <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                                <input type='radio' id='option-md' name='shop-sizes' />
                                            </span>
                                            <span className='d-inline-block text-black'>Medium</span>
                                        </label>
                                        <label htmlFor='option-lg' className='d-flex mr-3 mb-3'>
                                            <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                                <input type='radio' id='option-lg' name='shop-sizes' />
                                            </span>
                                            <span className='d-inline-block text-black'>Large</span>
                                        </label>
                                        <label htmlFor='option-xl' className='d-flex mr-3 mb-3'>
                                            <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                                <input type='radio' id='option-xl' name='shop-sizes' />
                                            </span>
                                            <span className='d-inline-block text-black'> Extra Large</span>
                                        </label>
                                    </div>
                                    */
                                }
                                <div className='mb-5'>
                                    <div className='input-group mb-3' style={{ maxWidth: 120 }}>

                                        <div className='input-group-prepend'>
                                            <button className='btn btn-outline-primary js-btn-minus' type='button'>&#45;</button>
                                        </div>

                                        <input type='text' className='form-control text-center' value='1' placeholder='' aria-label='Example text with button addon' aria-describedby='button-addon1' />

                                        <div className='input-group-append'>
                                            <button className='btn btn-outline-primary js-btn-plus' type='button'>&#43;</button>
                                        </div>

                                    </div>

                                </div>
                                <p onClick={this.addProductToCart} className='buy-now btn btn-sm height-auto px-4 py-3 btn-primary'>Add To Cart</p>

                            </div>
                        </div>
                    </div>
                </SiteWrap>
            )
        } else {
            return <Loading />
        }
    }
}

export default ShopSingle