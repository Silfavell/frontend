/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class CartItem extends React.Component {

    onIncreaseClick = () => {
        this.props.onIncreaseClick(this.props.item._id)
    }

    onDecreaseClick = () => {
        this.props.onDecreaseClick(this.props.item._id)
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
                            onChange={() => { }}
                            disabled
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