/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

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

    renderFooter = () => {
        const {
            status,
            trackingNumber,
            _id,
            returnItems
        } = this.props.item

        if (!(returnItems.length > 0) && status) {
            return (
                <a href={`/return-items/${_id}`}
                    className='d-flex align-items-center justify-content-between border-top py-3 text-black'>
                    <span className='font-weight-bold' style={{ color: '#EE4266' }}>İade Talebinde Bulun</span>
                    <IoIosArrowForward size={24} />
                </a>
            )
        } else if (status) {
            return (
                <a href={`http://kargotakip.araskargo.com.tr/mainpage.aspx?code=${trackingNumber}`}
                    className='d-flex align-items-center justify-content-between border-top py-3 text-black'>
                    <span className='font-weight-bold' style={{ color: '#EE4266' }}>Kargo Takip</span>
                    <IoIosArrowForward size={24} />
                </a>
            )
        }

        return null
    }

    render() {
        const {
            products,
            date,
            status,
            paidPrice,
            returnItems
        } = this.props.item

        return (
            <div className='container border mb-3 pt-3'>
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
                <div className='col-md-12'>
                    {
                        this.renderFooter()
                    }
                </div>
                {
                    returnItems.length > 0 && (
                        <>
                            <div className='col-md-12'>
                                <p>İade Edilen Ürünler:</p>
                            </div>
                            <div className='col-md-12'>
                                <div className='site-blocks-table'>
                                    <table className='table border'>
                                        <tbody>
                                            {
                                                products.filter((product) => returnItems.find((item) => item._id === product._id)).map((product) => (
                                                    <CartItem item={{ ...product, quantity: returnItems.find((item) => item._id === product._id).quantity }} order />
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
}

export default OrderItem