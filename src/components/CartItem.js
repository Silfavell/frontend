/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import joi from '@hapi/joi'

import './CartItem.css'

class CartItem extends React.Component {

    state = {
        quantity: this.props.item.quantity
    }

    onIncreaseClick = () => {
        const dontShowToast = true
        this.props.onIncreaseClick(this.props.item._id, 1, dontShowToast)
    }

    onDecreaseClick = () => {
        const dontShowToast = true
        this.props.onDecreaseClick(this.props.item._id, 1, dontShowToast)
    }

    onFocusOut = () => {
        this.props.setProductQuantity(this.props.item._id, this.state.quantity)
    }

    onQuantityChange = (event) => {
        const { value } = event.target

        joi.number()
            .min(1)
            .validateAsync(value).then(() => {
                this.setState({ quantity: parseInt(value) })
            })
    }

    render() {
        const {
            image,
            name,
            price,
            discountedPrice
        } = this.props.item

        const {
            quantity
        } = this.state

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${image}-0.webp`

        return (
            <tr>
                <td className='product-thumbnail img-container'>
                    <img
                        src={url}
                        alt=''
                        onError={(event) => {
                            event.target.src = process.env.PUBLIC_URL + '/empty-image.webp'
                        }}
                        className='img-fluid img' />
                </td>
                <td className='right-td'>
                    <div className="product-name">
                        <h5 className='text-black'>{name}</h5>

                    </div>

                    <div className='input-group quantity-container'>
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
                            onChange={this.onQuantityChange}
                            disabled={this.props.order}
                            onBlur={this.onFocusOut}
                            placeholder=''
                        />
                        {
                            !this.props.order && (
                                <div className='input-group-append'>
                                    <button className='btn btn-outline-primary js-btn-plus' type='button' onClick={this.onIncreaseClick}>&#43;</button>
                                </div>
                            )
                        }
                    </div>

                    <div className='direction-row mx-3'>
                        <strong style={discountedPrice ? { textDecoration: 'line-through', fontSize: 20, color: 'grey' } : { fontSize: 20 }}>
                            {'₺' + (price * quantity).toFixed(2).toString().replace('.', ',')}
                        </strong>
                        {
                            discountedPrice && (
                                <strong className='ml-3' style={{ fontSize: 20 }}>
                                    {'₺' + (discountedPrice * quantity).toFixed(2).toString().replace('.', ',')}
                                </strong>
                            )
                        }
                    </div>
                </td>
                {
                    // <td><a href='#' className='btn btn-primary height-auto btn-sm'>X</a></td>
                }
            </tr>
        )
    }
}

export default CartItem