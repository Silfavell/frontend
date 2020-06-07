/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'

import SiteWrap from '../components/SiteWrap'
import ShopProduct from '../components/ShopProduct'
import Loading from '../components/Loading'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'
import OrderItem from '../components/OrderItem'

class PreviousOrders extends React.Component {

    state = {
        orders: [],
        fetching: true
    }

    fetchOrders = () => {
        const url = `${process.env.REACT_APP_API_URL}/user/orders`

        return axios.get(url).then(({ data }) => data)
    }

    UNSAFE_componentWillMount() {
        this.fetchOrders().then((orders) => {
            this.setState({
                orders,
                fetching: false
            })
        })
    }

    render() {
        const divider = [
            {
                path: null,
                title: 'Siparişlerim'
            }
        ]

        if (this.state.fetching) {
            return (
                <Loading />
            )
        } else {
            return (
                <SiteWrap divider={divider}>
                    <div className='container'>
                        <div className='row mb-5'>
                            <div className="col-md-3 border mb-3">
                            </div>
                            <div className='col-md-9 order-1'>
                                <div className='row'>
                                    {
                                        this.state.orders.map((order) => (
                                            <OrderItem key={order._id} item={order} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </SiteWrap>
            )
        }
    }
}

export default PreviousOrders