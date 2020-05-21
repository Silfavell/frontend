/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Divider from '../components/Divider'

class ShopSingle extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <Divider />
                <div class='site-section'>
                    <div class='container'>
                        <div class='row'>
                            <div class='col-md-6'>
                                <div class='item-entry'>
                                    <img src='http://silfavell.com/img/product/4.jpg' alt='Image' class='img-fluid' />
                                </div>

                            </div>
                            <div class='col-md-6'>
                                <h2 class='text-black'>Gray Shoe</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, vitae, explicabo? Incidunt facere, natus soluta dolores iusto! Molestiae expedita veritatis nesciunt doloremque sint asperiores fuga voluptas, distinctio, aperiam, ratione dolore.</p>
                                <p class='mb-4'>Ex numquam veritatis debitis minima quo error quam eos dolorum quidem perferendis. Quos repellat dignissimos minus, eveniet nam voluptatibus molestias omnis reiciendis perspiciatis illum hic magni iste, velit aperiam quis.</p>
                                <p><strong class='text-primary h4'>{'₺' + (50.5).toFixed(2).toString().replace('.', ',')}</strong></p>
                                <div class='mb-1 d-flex'>
                                    <label for='option-sm' class='d-flex mr-3 mb-3'>
                                        <span class='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                            <input type='radio' id='option-sm' name='shop-sizes' />
                                        </span>
                                        <span class='d-inline-block text-black'>Small</span>
                                    </label>
                                    <label for='option-md' class='d-flex mr-3 mb-3'>
                                        <span class='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                            <input type='radio' id='option-md' name='shop-sizes' />
                                        </span>
                                        <span class='d-inline-block text-black'>Medium</span>
                                    </label>
                                    <label for='option-lg' class='d-flex mr-3 mb-3'>
                                        <span class='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                            <input type='radio' id='option-lg' name='shop-sizes' />
                                        </span>
                                        <span class='d-inline-block text-black'>Large</span>
                                    </label>
                                    <label for='option-xl' class='d-flex mr-3 mb-3'>
                                        <span class='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                            <input type='radio' id='option-xl' name='shop-sizes' />
                                        </span>
                                        <span class='d-inline-block text-black'> Extra Large</span>
                                    </label>
                                </div>
                                <div class='mb-5'>
                                    <div class='input-group mb-3' style={{ maxWidth: 120 }}>

                                        <div class='input-group-prepend'>
                                            <button class='btn btn-outline-primary js-btn-minus' type='button'>&#45;</button>
                                        </div>

                                        <input type='text' class='form-control text-center' value='1' placeholder='' aria-label='Example text with button addon' aria-describedby='button-addon1' />

                                        <div class='input-group-append'>
                                            <button class='btn btn-outline-primary js-btn-plus' type='button'>&#43;</button>
                                        </div>

                                    </div>

                                </div>
                                <p><a href='cart.html' class='buy-now btn btn-sm height-auto px-4 py-3 btn-primary'>Add To Cart</a></p>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default ShopSingle