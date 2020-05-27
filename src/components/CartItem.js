/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

class CartItem extends React.Component {

    onIncreaseClick = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/${this.props.item._id}`).then((res) => {
            alert('Ürün sepete eklendi (1)')
        })
    }

    onDecreaseClick = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/product/${this.props.item._id}`).then((res) => {
            alert('Ürün sepetten çıkarıldı (1)')
        })
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
                <td className='product-thumbnail'>
                    <img src={`${process.env.PUBLIC_URL}/product.jpg`} alt='Image' className='img-fluid' />
                </td>
                <td className='product-name'>
                    <h2 className='h5 text-black'>{name}</h2>
                </td>
                <td>{'Toplam ₺' + (price * quantity).toFixed(2).toString().replace('.', ',')}</td>
                <td>
                    <div className='input-group mb-3' style={{ maxWidth: 120 }}>
                        <div className='input-group-prepend'>
                            <button className='btn btn-outline-primary js-btn-minus' type='button' onClick={this.onDecreaseClick}>&#45;</button>
                        </div>
                        <input type='text' className='form-control text-center' value={quantity} placeholder='' aria-label='Example text with button addon' aria-describedby='button-addon1' />
                        <div className='input-group-append'>
                            <button className='btn btn-outline-primary js-btn-plus' type='button' onClick={this.onIncreaseClick}>&#43;</button>
                        </div>
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