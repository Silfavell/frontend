import React from 'react'
import axios from 'axios'

import SiteWrap from '../components/SiteWrap'
import CartItem from '../components/CartItem'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

class ReturnItems extends React.Component {
    constructor(props) {
        super(props)

        this.getOrder().then((order) => {
            if (order) {
                this.setState({
                    order,
                    status: true
                })
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

    onDecreaseClick = () => {
        console.log('1')
    }

    onIncreaseClick = () => {
        console.log('2')
    }

    setProductQuantity = () => {
        console.log('3')
    }

    render() {
        const divider = [
            {
                path: '/previous-order',
                title: 'Siparişlerim'
            },
            {
                path: null,
                title: 'İade'
            }
        ]

        return (
            <SiteWrap divider={divider}>
                <div className="container">
                    <div className='site-blocks-table'>
                        <table className='table border'>
                            <tbody>
                                {
                                    this.state?.order?.products.map((product) => (
                                        <CartItem
                                            item={product}
                                            onDecreaseClick={this.onDecreaseClick}
                                            onIncreaseClick={this.onIncreaseClick}
                                            setProductQuantity={this.setProductQuantity}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default ReturnItems