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
        visitedProducts: []
    }

    fetchProducts = () => {
        const url = `${process.env.REACT_APP_API_URL}/products-filter?productIds=${JSON.parse(window.localStorage.visitedProducts).join(',')}&quantity=32`
        return axios.get(url).then(({ data }) => data)
    }

    UNSAFE_componentWillMount() {
        if (window.localStorage.visitedProducts) {
            this.fetchProducts().then((visitedProducts) => {
                this.setState({ visitedProducts })
            })
        }
    }

    render() {
        return (
            <SiteWrap firstImage>
                <div className='container'>
                    <div className='row'>

                        <div className='col-md-12 p-4'>
                            <h2 className='h1 mb-3 text-black d-flex align-items-center justify-content-center'>
                                Best Seller
                            </h2>
                        </div>
                        <div className='col-md-12 p-4' />

                        <Carousel products={[]} />

                        <div className='col-md-12 p-4' />
                        <div className='col-md-12  p-4'>
                            <h2 className='h1 mb-3 text-black d-flex align-items-center justify-content-center'>
                                En Son Gezdiklerin
                            </h2>
                        </div>
                        <div className='col-md-12 p-4' />

                        <Carousel products={this.state.visitedProducts} />
                    </div>
                </div>
            </SiteWrap>
        )
    }
}

export default Home