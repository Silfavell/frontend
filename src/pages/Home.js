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
                <div className="site-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 class="h3 mb-3 text-black">
                                    Best Seller
                                </h2>
                            </div>
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