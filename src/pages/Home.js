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

class Home extends React.Component {

    state = {
        visitedProducts: [],
        bestSeller: []
    }

    fetchProducts = (productIds) => {
        const url = `${process.env.REACT_APP_API_URL}/products-filter?productIds=${productIds}&quantity=32`
        return axios.get(url).then(({ data }) => data)
    }

    UNSAFE_componentWillMount() {
        if (window.localStorage.visitedProducts) {
            const visitedProductIds = JSON.parse(window.localStorage.getItem('visitedProducts')).join(',')

            this.fetchProducts(visitedProductIds).then((visitedProducts) => {
                this.setState({ visitedProducts })
            })
        }

        this.fetchProducts(['5ed559e1d464530b18e37405', '5ed4ffae10bad04b78d3c758'].join(',')).then((bestSeller) => { // TODO
            this.setState({ bestSeller })
        })
    }

    renderHomeContent = ({ onIncreaseClick }) => {
        return (
            <div className='container'>
                <div className='row'>

                    <div className='col-md-12 p-4'>
                        <h2 className='h1 mb-3 text-black d-flex align-items-center justify-content-center'>
                            Best Seller
                        </h2>
                    </div>
                    <div className='col-md-12 p-4' />

                    <Carousel
                        products={this.state.bestSeller}
                        onIncreaseClick={onIncreaseClick}
                    />

                    {
                        this.state.visitedProducts.length > 0 && (
                            <>
                                <div className='col-md-12 p-4' />
                                <div className='col-md-12  p-4'>
                                    <h2 className='h1 mb-3 text-black d-flex align-items-center justify-content-center'>
                                        En Son Gezdiklerin
                                        </h2>
                                </div>
                                <div className='col-md-12 p-4' />

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