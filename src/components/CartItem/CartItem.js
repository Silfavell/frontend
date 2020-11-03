import React from 'react'

import joi from '@hapi/joi'
import { IoIosClose } from 'react-icons/io'
import './CartItem.css'

class CartItem extends React.Component {
    state = {
        quantity: (this.props.returnItem ?? this.props.returnOrderItem)?.quantity ?? this.props.item.quantity
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
                this.setState({ quantity: parseInt(value, 2) })
            })
    }

    removeProduct = (event) => {
        event.stopPropagation()
        event.preventDefault()

        this.props.setProductQuantity(this.props.item._id, 0)
    }

    render() {
        const {
            name,
            slug,
            price,
            discountedPrice,
            paidPrice
        } = this.props.item

        const {
            returnItem,
            returnOrderItem,
            order
        } = this.props

        const {
            quantity
        } = this.state

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${slug}_300x300.webp`

        return (
            <tr style={{ position: 'relative' }}>
                {
                    !(order || returnOrderItem) && (
                        <div
                            style={{
                                position: 'absolute', bottom: 0, right: 0, padding: 6, zIndex: 2, cursor: 'pointer'
                            }}
                            onClick={this.removeProduct}
                        >
                            <IoIosClose size={24} color='black' />
                        </div>
                    )
                }

                <td className='product-thumbnail img-container'>
                    <img
                        src={url}
                        alt=''
                        className='img-fluid img' />
                </td>
                <td className='right-td'>
                    <div>
                        {
                            (returnItem || returnOrderItem) && <h5 className='pr-3 font-weight-normal' style={{ whiteSpace: 'nowrap' }}>İade edilecek ürün:</h5>
                        }

                        <div className='product-name'>
                            <h5 className='text-black'>{name}</h5>
                        </div>
                    </div>

                    <div>
                        {
                            (returnItem || returnOrderItem) && <h5 className='pr-3 font-weight-normal' style={{ whiteSpace: 'nowrap' }}>İade edilecek adet:</h5>
                        }

                        <div className='input-group quantity-container'>
                            {
                                !(order || returnOrderItem) && (
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
                                disabled={order || returnOrderItem}
                                onBlur={this.onFocusOut}
                                placeholder='' />
                            {
                                !(order || returnOrderItem) && (
                                    <div className='input-group-append'>
                                        <button className='btn btn-outline-primary js-btn-plus' type='button' onClick={this.onIncreaseClick}>&#43;</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div>
                        {
                            (returnItem || returnOrderItem) && <h5 className='pr-3 font-weight-normal' style={{ whiteSpace: 'nowrap' }}>İade edilecek tutar:</h5>
                        }

                        {
                            (returnItem || returnOrderItem) ? (
                                <div className='direction-row'>
                                    <h5 className='font-weight-normal' style={{ fontSize: 20 }}>
                                        {`₺${(paidPrice * quantity).toFixed(2).toString().replace('.', ',')}`}
                                    </h5>
                                </div>
                            ) : (
                                <div className='direction-row mx-3'>
                                    <h5 className='font-weight-normal' style={discountedPrice ? { textDecoration: 'line-through', fontSize: 20, color: 'grey' } : { fontSize: 20 }}>
                                        {`₺${(price * quantity).toFixed(2).toString().replace('.', ',')}`}
                                    </h5>
                                    {
                                        discountedPrice && (
                                            <h5 className='font-weight-normal ml-3' style={{ fontSize: 20 }}>
                                                {`₺${(discountedPrice * quantity).toFixed(2).toString().replace('.', ',')}`}
                                            </h5>
                                        )
                                    }
                                </div>
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
