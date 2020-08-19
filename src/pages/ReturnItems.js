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
                    selectedItems: [],
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

    onSelect = (event) => {
        const { selectedItems } = this.state

        if (selectedItems.includes(event.target.id)) {
            selectedItems.splice(selectedItems.indexOf(event.target.id), 1)
        } else {
            selectedItems.push(event.target.id)
        }

        this.setState({ selectedItems })
    }

    selectAll = (event) => {
        if (event.target.checked) {
            this.setState({
                selectedItems: this.state.order.products.map((product) => product._id)
            })
        } else {
            this.setState({ selectedItems: [] })
        }
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
                    <div className='form-group form-check ml-1'>
                        <div className='col-md-12'>
                            <input
                                id='select-all'
                                name='select-all'
                                type='checkbox'
                                className='form-check-input'
                                onChange={this.selectAll}
                                style={{ width: 24, height: 24 }}
                            />
                            <label
                                style={{ cursor: 'pointer', display: 'unset' }}
                                htmlFor='select-all'
                                className='form-check-label ml-4'>Tümünü Seç</label>
                        </div>
                    </div>
                    <div className='site-blocks-table'>
                        <table className='table border'>
                            <tbody>
                                {
                                    this.state?.order?.products.map((product) => (
                                        <div style={{ position: 'relative' }}>
                                            <CartItem
                                                item={product}
                                                onDecreaseClick={this.onDecreaseClick}
                                                onIncreaseClick={this.onIncreaseClick}
                                                setProductQuantity={this.setProductQuantity}
                                            />

                                            <div style={{ position: 'absolute', left: 20, top: 20, }}>
                                                <input
                                                    id={product._id}
                                                    type='checkbox'
                                                    style={{ width: 24, height: 24 }}
                                                    checked={this.state.selectedItems.includes(product._id)}
                                                    onChange={this.onSelect}
                                                />
                                            </div>
                                        </div>
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