/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class CartItem extends React.Component {
    render() {
        const {
            img,
            name,
            price,
            quantity
        } = this.props.item
        
        return (
            <tr>
                <td class='product-thumbnail'>
                    <img src={`${process.env.PUBLIC_URL}/product.jpg`} alt='Image' class='img-fluid' />
                </td>
                <td class='product-name'>
                    <h2 class='h5 text-black'>{name}</h2>
                </td>
                <td>{'Toplam ₺' + (price * quantity).toFixed(2).toString().replace('.', ',')}</td>
                <td>
                    <div class='input-group mb-3' style={{ maxWidth: 120 }}>
                        <div class='input-group-prepend'>
                            <button class='btn btn-outline-primary js-btn-minus' type='button'>&#43;</button>
                        </div>
                        <input type='text' class='form-control text-center' value={quantity} placeholder='' aria-label='Example text with button addon' aria-describedby='button-addon1' />
                        <div class='input-group-append'>
                            <button class='btn btn-outline-primary js-btn-plus' type='button'>&#45;</button>
                        </div>
                    </div>

                </td>
                <td>{'₺' + price.toFixed(2).toString().replace('.', ',')}</td>
                <td><a href='#' class='btn btn-primary height-auto btn-sm'>X</a></td>
            </tr>
        )
    }
}

export default CartItem