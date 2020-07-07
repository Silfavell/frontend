/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import CartItem from './CartItem'

class OrderItem extends React.Component {

    getOrderStatus = (status) => {
        switch (status) {
            case true: return 'Onaylandı'
            case false: return 'Iptal Edildi'
            default: return 'Onay Bekliyor'
        }
    }

    render() {
        const {
            products,
            date,
            status,
            paidPrice
        } = this.props.item


        return (
            <div className='container border mb-3'>
                <div className='col-md-12'>
                    <div className='d-flex align-items-center justify-content-between p1'>
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
                    <div className='d-flex align-items-center justify-content-between p1'>
                        <p>Ödenen Tutar:</p>
                        <strong className='text-black'>{`₺${paidPrice.toFixed(2).replace('.', ',')}`}</strong>
                    </div>
                    <div className='d-flex align-items-center justify-content-between p1'>
                        <p>Sipariş Durumu:</p>
                        <strong className='text-black'>{this.getOrderStatus(status)}</strong>
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