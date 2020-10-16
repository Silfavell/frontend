import React from 'react'

import SiteWrap from '../../components/SiteWrap/SiteWrap'

import OrderItem from '../../components/OrderItem/OrderItem'

class PaymentCompleted extends React.Component {
    render() {
        return (
            <SiteWrap>
                <div className='container'>
                    <div className='w-100'>
                        <div
                            className='col-md-12 d-flex align-items-center justify-content-center border'
                            style={{ backgroundColor: 'rgba(81, 198, 37, 0.1)' }}>
                            <h5
                                className='p-3 mb-0'
                                style={{ color: '#51C625' }}>
                                Siparişiniz alınmıştır.
                            </h5>
                        </div>
                    </div>
                    <div className='w-100 order-1 py-4' style={{ overflowX: 'auto' }}>
                        <OrderItem item={this.props.location.state.order} />
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default PaymentCompleted