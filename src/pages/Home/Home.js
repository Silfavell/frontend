import React from 'react'

import Carousel from '../../components/Carousel/Carousel'
import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'
import { fetchShop } from '../../scripts/requests'
import Tabs from './Tabs'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'

class Home extends React.Component {
    state = {
        shop: {}
    }

    async componentDidMount() {
        if (window.localStorage.visitedProducts) {
            const visitedProductIds = JSON.parse(window.localStorage.getItem('visitedProducts')).map((id) => `productIds=${id}`).join('&')
            const shop = await this.fetchShop(visitedProductIds)

            this.setState({ shop })
        }
    }

    fetchShop = async (visitedProductIds) => {
        const { data } = await fetchShop(visitedProductIds)

        return data || {}
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>

                    <div className='col-md-12 p-4'>
                        <h2 className='h3 mb-3 text-black d-flex align-items-center justify-content-start'>En Çok Satanlar</h2>
                    </div>

                    <Tabs
                        onIncreaseClick={this.props.onIncreaseClick} />

                    {
                        (this.state.shop.products && this.state.shop.products.length > 0) && (
                            <>
                                <div className='col-md-12 p-4' />
                                <div className='col-md-12 p-4'>
                                    <h2 className='h3 mb-3 text-black d-flex align-items-center justify-content-start'>En Son Gezdiklerin</h2>
                                </div>

                                <Carousel
                                    products={this.state.shop.products}
                                    onIncreaseClick={this.props.onIncreaseClick} />
                            </>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default SiteWrapHoc(Home, { firstImage: true })
