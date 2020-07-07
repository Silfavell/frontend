/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import joi from '@hapi/joi'

class CartItem extends React.Component {

    state = {
        quantity: this.props.item.quantity
    }

    onIncreaseClick = () => {
        this.props.onIncreaseClick(this.props.item._id, 1)
    }

    onDecreaseClick = () => {
        this.props.onDecreaseClick(this.props.item._id, 1)
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
                <td className='product-thumbnail' style={{ minWidth: 200 }}>
                    <img
                        style={{ paddingTop: 24, paddingBottom: 24 }}
                        src={url}
                        alt=''
                        onError={(event) => {
                            event.target.src = process.env.PUBLIC_URL + '/empty-image.webp'
                        }}
                        className='img-fluid' />
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

                </td>
                <td className='direction-row mx-3'>
                    <div style={discountedPrice ? { textDecoration: 'line-through', fontSize: 18 } : {}}>
                        {'₺' + (price * quantity).toFixed(2).toString().replace('.', ',')}
                    </div>
                    {
                        discountedPrice && (
                            <div style={{ fontSize: 18 }}>
                                {'₺' + (discountedPrice * quantity).toFixed(2).toString().replace('.', ',')}
                            </div>
                        )
                    }
                </td>
                {
                    // <td><a href='#' className='btn btn-primary height-auto btn-sm'>X</a></td>
                }
            </tr>
        )
    }
}

export default CartItem