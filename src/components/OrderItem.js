/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import CartItem from './CartItem'

class OrderItem extends React.Component {
    render() {
        const {
            products,
            date
        } = this.props.item

        const totalPrice = products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * currentValue.quantity, 0).toFixed(2)

        return (
            <div className='container border mx-3 mb-3'>
                <div className="col-md-12">
                    <div className='d-flex align-items-center justify-content-between py-1 px-2'>
                        <p>Sipariş Tarihi:</p>
                        <p>
                            {
                                new Date(date).toLocaleDateString('tr-TR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                        </p>
                    </div>
                    <div className='d-flex align-items-center justify-content-between py-1 px-2'>
                        <p>Ödenen Tutar:</p>
                        <strong className='text-black'>{`₺${totalPrice}`}</strong>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='site-blocks-table'>
                        <table className='table border'>
                            <tbody>
                                {
                                    products.map((product) => (
                                        <CartItem item={product} order />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderItem