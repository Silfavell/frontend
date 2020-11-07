import React from 'react'

import OrderItem from '../../components/OrderItem/OrderItem'
import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'

class PaymentCompleted extends React.PureComponent {
    render() {
        return (
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
        )
    }
}

export default SiteWrapHoc(PaymentCompleted)
