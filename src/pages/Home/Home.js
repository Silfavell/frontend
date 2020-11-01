/* eslint-disable react/style-prop-object */
import React from 'react'
import { Redirect } from "react-router-dom";

import { fetchShop } from '../../scripts/requests'

import SiteWrap from '../../components/SiteWrap/SiteWrap'
import Carousel from '../../components/Carousel/Carousel'
import Tabs from './Tabs'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

class Home extends React.Component {
    state = {
        shop: {},
        redirect: null
    }

    fetchShop = async (visitedProductIds) => {
        const { data } = await fetchShop(visitedProductIds)

        return data || {}
    }

    async componentDidMount() {
        if (window.localStorage.visitedProducts) {
            const visitedProductIds = JSON.parse(window.localStorage.getItem('visitedProducts')).map((id) => `productIds=${id}`).join('&')
            const shop = await this.fetchShop(visitedProductIds)

            this.setState({ shop })
        }
    }

    renderHomeContent = ({ onIncreaseClick }) => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='container'>
                <div className='row'>

                    <div className='col-md-12 p-4'>
                        <h2 className='h3 mb-3 text-black d-flex align-items-center justify-content-start'>En Çok Satanlar</h2>
                    </div>

                    <Tabs
                        onIncreaseClick={onIncreaseClick}
                    />

                    {
                        (this.state.shop.products && this.state.shop.products.length > 0) && (
                            <>
                                <div className='col-md-12 p-4' />
                                <div className='col-md-12 p-4'>
                                    <h2 className='h3 mb-3 text-black d-flex align-items-center justify-content-start'>En Son Gezdiklerin</h2>
                                </div>

                                <Carousel
                                    products={this.state.shop.products}
                                    onIncreaseClick={onIncreaseClick}
                                />
                            </>
                        )
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <SiteWrap firstImage>
                <this.renderHomeContent />
            </SiteWrap>
        )
    }
}

export default Home