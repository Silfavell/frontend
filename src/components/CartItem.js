/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import VanillaToasts from 'vanillatoasts'

import 'bootstrap/dist/css/bootstrap.min.css'

const cookies = new Cookies()

class CartItem extends React.Component {

    onIncreaseClick = () => {
        if (cookies.get('token')) {
            axios.get(`${process.env.REACT_APP_API_URL}/product/${this.props.item._id}`).then((res) => {
                VanillaToasts.create({
                    title: `Ürünü sepete eklendi`,
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })
            }).catch((err) => {
                VanillaToasts.create({
                    title: err.response.data.error,
                    positionClass: 'topRight',
                    type: 'error',
                    timeout: 3 * 1000
                })
            })
        } else {
            const cart = window.localStorage.getItem('cart')

            if (cart) {
                const cartAsArray = JSON.parse(cart)
                const foundProduct = cartAsArray.find((cartProduct) => cartProduct._id === this.props.item._id)
                if (foundProduct) {
                    cartAsArray[cartAsArray.indexOf(foundProduct)].quantity++
                } else {
                    cartAsArray.push({ _id: this.props.item._id, quantity: 1 })
                }
                window.localStorage.setItem('cart', JSON.stringify(cartAsArray))
            } else {
                window.localStorage.setItem('cart', JSON.stringify([{ _id: this.props.item._id, quantity: 1 }]))
            }

            VanillaToasts.create({
                title: `Ürünü sepete eklendi`,
                positionClass: 'topRight',
                type: 'success',
                timeout: 3 * 1000
            })
        }
    }

    onDecreaseClick = () => {
        if (cookies.get('token')) {
            axios.delete(`${process.env.REACT_APP_API_URL}/product/${this.props.item._id}`).then((res) => {
                VanillaToasts.create({
                    title: `Ürünü sepetten çıkarıldı`,
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })
            }).catch((err) => {
                VanillaToasts.create({
                    title: err.response.data.error,
                    positionClass: 'topRight',
                    type: 'error',
                    timeout: 3 * 1000
                })
            })
        } else {
            const cart = window.localStorage.getItem('cart')

            if (cart) {
                const cartAsArray = JSON.parse(cart)
                const foundProduct = cartAsArray.find((cartProduct) => cartProduct._id === this.props.item._id)
                if (foundProduct) {
                    cartAsArray[cartAsArray.indexOf(foundProduct)].quantity--

                    if (cartAsArray[cartAsArray.indexOf(foundProduct)].quantity === 0)
                        cartAsArray.splice(cartAsArray.indexOf(foundProduct), 1)

                    VanillaToasts.create({
                        title: `Ürün sepetten çıkarıldı`,
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
                    })
                } else {
                    VanillaToasts.create({
                        title: `Ürünü sepette bulunamadı`,
                        positionClass: 'topRight',
                        type: 'error',
                        timeout: 3 * 1000
                    })
                }
                window.localStorage.setItem('cart', JSON.stringify(cartAsArray))
            } else {
                VanillaToasts.create({
                    title: `Ürünü sepette bulunamadı`,
                    positionClass: 'topRight',
                    type: 'error',
                    timeout: 3 * 1000
                })
            }
        }
    }

    render() {
        const {
            img,
            name,
            price,
            quantity
        } = this.props.item

        return (
            <tr>
                <td className='product-thumbnail' style={{ minWidth: 200 }}>
                    <img src={`${process.env.PUBLIC_URL}/product.jpg`} alt='Image' className='img-fluid' />
                </td>
                <td className='product-name'>
                    <h2 className='h5 text-black'>{name}</h2>
                </td>
                <td style={{ minWidth: 200 }}>
                    <div className='input-group'>
                        {
                            !this.props.order && (
                                <div className='input-group-prepend'>
                                    <button className='btn btn-outline-primary js-btn-minus' type='button' onClick={this.onDecreaseClick}>&#45;</button>
                                </div>
                            )
                        }

                        <input
                            type='text'
                            className='form-control text-center'
                            value={quantity}
                            placeholder=''
                            aria-label='Example text with button addon'
                            aria-describedby='button-addon1'
                        />
                        {
                            !this.props.order && (
                                <div className='input-group-append'>
                                    <button className='btn btn-outline-primary js-btn-plus' type='button' onClick={this.onIncreaseClick}>&#43;</button>
                                </div>
                            )
                        }
                    </div>

                </td>
                <td>{'₺' + price.toFixed(2).toString().replace('.', ',')}</td>
                {
                    // <td><a href='#' className='btn btn-primary height-auto btn-sm'>X</a></td>
                }
            </tr>
        )
    }
}

export default CartItem