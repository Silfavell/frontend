/* eslint-disable react/style-prop-object */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FirstImage from '../components/FirstImage'

import '../style/css/style.css'
import '../style/css/googleMukta.css'

import Product from '../components/Product'
import Carousel from '../components/Carousel'

class Home extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <FirstImage />
                <div className='site-section'>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-md-12 p-4'>
                                <h2 class='h1 mb-3 text-black d-flex align-items-center justify-content-center'>
                                    Best Seller
                            </h2>
                            </div>
                            <div className='col-md-12 p-4' />

                            <Carousel />

                            <div className='col-md-12 p-4' />
                            <div className='col-md-12  p-4'>
                                <h2 class='h1 mb-3 text-black d-flex align-items-center justify-content-center'>
                                    En Son Gezdiklerin
                                </h2>
                            </div>
                            <div className='col-md-12 p-4' />

                            <Carousel />
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Home