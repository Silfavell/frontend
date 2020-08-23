import React from 'react'

import SiteWrap from '../components/SiteWrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'
import OrderItem from '../components/OrderItem'

class PaymentCompleted extends React.Component {
    render() {
        return (
            <SiteWrap>
                <div className='container'>
                    <div className='col-md-12'>
                        <div
                            className='col-md-12 d-flex align-items-center justify-content-center border'
                            style={{ backgroundColor: 'rgba(81, 198, 37, 0.1)' }}>
                            <h5
                                className='p-3'
                                style={{ color: '#51C625' }}>
                                Siparişiniz alınmıştır.
                            </h5>
                        </div>
                    </div>
                    <div className='col-md-12 order-1 py-4'>
                        <OrderItem item={this.props.location.state.order} />
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default PaymentCompleted