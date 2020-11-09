import React from 'react'

import VanillaToasts from 'vanillatoasts'

import CartItem from '../../components/CartItem/CartItem'
import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'
import OrderStatus from '../../models/OrderStatus'
import { getOrderById, returnItems } from '../../scripts/requests'

class ReturnItems extends React.Component {
    constructor(props) {
        super(props)

        this.getOrder().then((order) => {
            if (order) {
                if (order.status === OrderStatus.RETURNABLE) {
                    this.setState({
                        order,
                        items: order?.products?.map((product) => ({
                            _id: product._id,
                            quantity: 1,
                            selected: false
                        }))
                    })
                } else {
                    this.props.history.push('/previous-orders')
                }
            }
        })
    }

    getOrder = async () => {
        const { status, data } = await getOrderById(this.props.match.params._id)
        if (status === 200) {
            return data
        }

        return false
    }

    onDecreaseClick = (_id) => {
        const { items } = this.state

        const selectedItem = items.find((item) => item._id === _id)

        if (selectedItem.quantity - 1 >= 1) {
            selectedItem.quantity -= 1

            this.setState({ items })
        }
    }

    onIncreaseClick = (_id) => {
        const { items } = this.state
        const { products } = this.state.order

        const selectedItem = items.find((item) => item._id === _id)
        const selectedOrderItem = products.find((product) => product._id === _id)

        if (selectedItem.quantity + 1 <= selectedOrderItem.quantity) {
            selectedItem.quantity += 1

            this.setState({ items })
        }
    }

    setProductQuantity = (_id, quantity) => {
        const { items } = this.state
        const { products } = this.state.order

        const selectedItem = items.find((item) => item._id === _id)
        const selectedOrderItem = products.find((product) => product._id === _id)

        if (quantity <= selectedOrderItem.quantity) {
            selectedItem.quantity = quantity
        } else {
            selectedItem.quantity = selectedOrderItem.quantity
        }

        this.setState({ items })
    }

    onSelect = (event) => {
        const { items } = this.state

        const selectedItem = items.find((item) => item._id === event.target.id)

        selectedItem.selected = !selectedItem.selected

        this.setState({ items })
    }

    selectAll = (event) => {
        if (event.target.checked) {
            this.setState({
                items: this.state.items.map((item) => {
                    item.selected = true

                    return item
                })
            })
        } else {
            this.setState({
                items: this.state.items.map((item) => {
                    item.selected = false

                    return item
                })
            })
        }
    }

    onReturnBtnClick = async () => {
        const items = this.state.items.filter((item) => item.selected).map((item) => {
            delete item.selected

            return item
        })

        if (items.length > 0) {
            const { status } = await returnItems(this.state.order._id, items)

            if (status === 200) {
                window.history.pushState({}, null, `/return-items-completed/${this.state.order._id}`)
                window.location.reload()
            }
        } else {
            VanillaToasts.create({
                title: `Lütfen iade etmek istediğiniz ürünleri seçiniz`,
                positionClass: 'topRight',
                type: 'warning',
                timeout: 3 * 1000
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='form-group form-check' style={{ marginLeft: '.40rem' }}>
                    <div className='col-md-12'>
                        <input
                            id='select-all'
                            name='select-all'
                            type='checkbox'
                            className='form-check-input'
                            onChange={this.selectAll}
                            style={{ width: 24, height: 24 }} />
                        <label
                            style={{ cursor: 'pointer', display: 'unset' }}
                            htmlFor='select-all'
                            className='form-check-label ml-4 text-black'>
                            Tümünü Seç
                        </label>
                    </div>
                </div>
                <div className='site-blocks-table'>
                    <table className='table border'>
                        <tbody>
                            {
                                this.state?.order?.products.map((product) => {
                                    const returnItem = this.state.items.find((item) => item._id === product._id)

                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <CartItem
                                                key={`${returnItem._id}:${returnItem.quantity}`}
                                                item={product}
                                                onDecreaseClick={this.onDecreaseClick}
                                                onIncreaseClick={this.onIncreaseClick}
                                                setProductQuantity={this.setProductQuantity}
                                                returnItem={returnItem} />

                                            <div style={{ position: 'absolute', left: 20, top: 20 }}>
                                                <input
                                                    id={product._id}
                                                    type='checkbox'
                                                    style={{ width: 24, height: 24 }}
                                                    checked={returnItem.selected}
                                                    onChange={this.onSelect} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='col-md-12 d-flex justify-content-end'>
                    <button
                        className='btn btn-primary'
                        onClick={this.onReturnBtnClick}>
                        Seçili Ürünleri Iade Et
                    </button>
                </div>
            </div>
        )
    }
}

const breadcrumb = [
    {
        path: '/previous-order',
        title: 'Siparişlerim'
    },
    {
        path: null,
        title: 'İade'
    }
]

export default SiteWrapHoc(ReturnItems, { breadcrumb })
