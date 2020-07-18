/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React from 'react'
import joi from '@hapi/joi'

import Loading from '../components/Loading'
import SiteWrap from '../components/SiteWrap'


class ShopSingle extends React.Component {

    state = {
        product: {},
        quantity: 1
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

    increaseQuantity = () => {
        this.setState({ quantity: this.state.quantity + 1 })
    }

    decreaseQuantity = () => {
        this.setState({ quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1 })
    }

    onQuantityChange = (event) => {
        const { value } = event.target

        joi.number()
            .min(1)
            .validateAsync(value).then(() => {
                this.setState({ quantity: parseInt(value) })
            })
    }

    onAddToCartClick = (onIncreaseClick) => {
        onIncreaseClick(this.state.product._id, this.state.quantity)
        this.setState({ quantity: 1 })
    }

    renderContent = ({ onIncreaseClick }) => {
        const {
            name,
            price,
            brand,
            image
        } = this.state.product

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${image}-0.webp`

        return (
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

                                <div className='input-group-prepend' onClick={this.decreaseQuantity}>
                                    <button className='btn btn-outline-primary js-btn-minus' type='button'>&#45;</button>
                                </div>

                                <input
                                    type='text'
                                    className='form-control text-center'
                                    value={this.state.quantity}
                                    onChange={this.onQuantityChange} />

                                <div className='input-group-append' onClick={this.increaseQuantity}>
                                    <button className='btn btn-outline-primary js-btn-plus' type='button'>&#43;</button>
                                </div>

                            </div>

                        </div>
                        <p
                            onClick={() => this.onAddToCartClick(onIncreaseClick)}
                            className='buy-now btn btn-sm height-auto px-4 py-3 btn-primary'>Sepete Ekle</p>

                    </div>
                </div>
            </div>
        )
    }

    render() {
        const divider = [
            { path: '/shop', title: 'Ürünler' },
            { path: null, title: this.state.product.name }
        ]

        if (this.state.product._id) {
            return (
                <SiteWrap divider={divider}>
                    <this.renderContent />
                </SiteWrap>
            )
        } else {
            return <Loading />
        }
    }
}

export default ShopSingle