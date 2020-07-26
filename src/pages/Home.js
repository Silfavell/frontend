/* eslint-disable react/style-prop-object */
import React from 'react'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import '../style/css/style.css'
import '../style/css/googleMukta.css'

import SiteWrap from '../components/SiteWrap'
import Carousel from '../components/Carousel'
import Tabs from '../components/Home/Tabs'

class Home extends React.Component {

    state = {
        visitedProducts: []
    }

    fetchProducts = (productIds) => {
        const url = `${process.env.REACT_APP_API_URL}/products-filter?productIds=${productIds}&quantity=32`
        return axios.get(url).then((result) => result?.data || [])
    }

    UNSAFE_componentWillMount() {
        if (window.localStorage.visitedProducts) {
            const visitedProductIds = JSON.parse(window.localStorage.getItem('visitedProducts')).join(',')

            this.fetchProducts(visitedProductIds).then((visitedProducts) => {
                this.setState({ visitedProducts })
            })
        }
    }

    renderHomeContent = ({ onIncreaseClick }) => {
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
                        this.state.visitedProducts.length > 0 && (
                            <>
                                <div className='col-md-12 p-4' />
                                <div className='col-md-12 p-4'>
                                    <h2 className='h3 mb-3 text-black d-flex align-items-center justify-content-start'>En Son Gezdiklerin</h2>
                                </div>

                                <Carousel
                                    products={this.state.visitedProducts}
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