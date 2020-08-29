import React from 'react'
import axios from 'axios'

import SiteWrap from '../components/SiteWrap'
import OrderItem from '../components/OrderItem'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'
import OrderStatus from '../models/OrderStatus'

class ReturnItemsCompleted extends React.Component {

    constructor(props) {
        super(props)

        this.getOrder().then((order) => {
            if (order) {
                if (order.status === OrderStatus.RETURNED) {
                    this.setState({
                        order,
                        status: true
                    })
                } else {
                    this.props.history.push('/previous-orders')
                }
            } else {
                this.setState({
                    status: false
                })
            }
        })
    }

    getOrder = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/user/order/${this.props.match.params._id}`).then(({ status, data }) => {
            if (status === 200) {
                return data
            }

            return false
        }).catch(() => {
            return false
        })
    )

    render() {
        return (
            <SiteWrap>
                <div className='container'>
                    <div className='col-md-12'>
                        <div
                            className='col-md-12 d-flex align-items-center justify-content-center flex-column border'
                            style={{ backgroundColor: 'rgba(81, 198, 37, 0.1)' }}>
                            <h5
                                className='p-3 pb-0'
                                style={{ color: '#51C625' }}>
                                Aşağıdaki ürün(ler) için sipariş iade talebiniz alınmıştır.
                            </h5>
                            <p className='text-black'>Ürününüz kargo aracılığıyla depomuza ulaştıktan sonra iade işleminiz tamamlanmak üzere işleme konulacaktır.</p>
                        </div>
                    </div>
                    <div className='col-md-12 order-1 py-4' style={{ overflowX: 'auto' }}>
                        {
                            this.state?.order && (
                                <OrderItem item={this.state?.order} returnItemsCompleted />
                            )
                        }
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default ReturnItemsCompleted