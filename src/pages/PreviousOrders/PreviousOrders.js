import React from 'react'

import Loading from '../../components/Loading/Loading'
import OrderItem from '../../components/OrderItem/OrderItem'
import ProfileColumn from '../../components/ProfileColumn/ProfileColumn'
import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'
import { getOrders } from '../../scripts/requests'

const fetchOrders = async () => {
    const { data } = await getOrders()

    return data
}

class PreviousOrders extends React.Component {
    state = {
        orders: [],
        fetching: true
    }

    async componentDidMount() {
        const orders = await fetchOrders()

        this.setState({
            orders,
            fetching: false
        })
    }

    render() {
        if (this.state.fetching) {
            return <Loading />
        }

        return (
            <div className='container'>
                <div className='row mb-5'>
                    <ProfileColumn />
                    <div className='col-md-9 order-1 my-2'>
                        <div className={`w-100 h-100 ${!(this.state.orders.length > 0) ? 'border' : ''}`} style={{ overflowX: 'auto' }}>
                            {
                                this.state.orders.length > 0 ? (
                                    <>
                                        {
                                            this.state.orders.map((order) => (
                                                <OrderItem key={order._id} item={order} />
                                            ))
                                        }
                                    </>
                                ) : (
                                    <div className='h-100 w-100 d-flex align-items-center justify-content-center p-5'>
                                        Siparişiniz bulunmamaktadır.
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const breadcrumb = [
    {
        path: null,
        title: 'Siparişlerim'
    }
]

export default SiteWrapHoc(PreviousOrders, { breadcrumb })
