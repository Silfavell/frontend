/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import SiteWrap from '../components/SiteWrap'
import Loading from '../components/Loading'
import OrderItem from '../components/OrderItem'
import ProfileColumn from '../components/ProfileColumn'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

const cookies = new Cookies()

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
        if (cookies.get('token')) {
            this.fetchOrders().then((orders) => {
                this.setState({
                    orders,
                    fetching: false
                })
            })
        } else {
            this.props.history.push('/sign-in')
        }
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
                            <ProfileColumn />
                            <div className='col-md-9 order-1'>
                                {
                                    this.state.orders.map((order) => (
                                        <OrderItem key={order._id} item={order} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </SiteWrap>
            )
        }
    }
}

export default PreviousOrders