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
            returnable
        } = this.props.item

        if (returnable && status) {
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
            returnItems, // TODO IF TRUE map returnItems instead of products line 98
            returnable
        } = this.props.item

        return (
            <div className='container border mb-3 pt-3'>
                <div className='col-md-12'>
                    {
                        !this.props.returnItems && (
                            <div className='d-flex align-items-center justify-content-between p1'>
                                <p style={{ fontSize: 18 }}>Sipariş Tarihi:</p>
                                <p style={{ fontSize: 18 }}>
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
                        )
                    }

                    <div className='d-flex align-items-center justify-content-between p1'>
                        <p style={{ fontSize: 18 }}>{this.props.returnItems ? 'Ödenecek Tutar:' : 'Ödenen Tutar:'}</p>
                        <p style={{ fontSize: 18 }} className='text-black font-weight-normal'>{`₺${paidPrice.toFixed(2).replace('.', ',')}`}</p>
                    </div>

                    {
                        !this.props.returnItems && (
                            <div className='d-flex align-items-center justify-content-between p1'>
                                <p style={{ fontSize: 18 }}>Sipariş Durumu:</p>
                                <p style={{ fontSize: 18 }} className='text-black font-weight-normal'>{this.getOrderStatus(status)}</p>
                            </div>
                        )
                    }
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
                    (status && !returnable) && (
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
                                                    <CartItem item={{ ...product, quantity: returnItems.find((item) => item._id === product._id).quantity }} returnOrderItem />
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )
                }

                <div className='col-md-12 pb-3'>
                    <div
                        className='col-md-12 d-flex align-items-center justify-content-center flex-column'
                        style={{ border: '1px solid #ee4266' }}>
                        <h6 className='px-5 py-3 text-black' style={{ textAlign: 'center' }}>
                            {
                                `Iade etmek için seçtiğiniz ürünleri 7 iş günü içinde kargoya vermeniz gerekmektedir. <KOD> kodu ile ürününüzü ÜCRETSIZ olarak gönderebilirsiniz. Gönderim kodunuz mail adresinize gönderilmiştir.`
                            }
                        </h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderItem