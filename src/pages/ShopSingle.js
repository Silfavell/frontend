/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React from 'react'

import Loading from '../components/Loading'
import SiteWrap from '../components/SiteWrap'

class ShopSingle extends React.Component {

    state = {
        product: {}
    }

    componentWillMount() {
        // axios.get(`http://178.62.245.193:3000/product/${this.props.match.params._id}`)
        axios.get(`http://178.62.245.193:3000/product/${'5ebd4417b6e6fb001239f439'}`).then((result) => {
            this.setState({ product: result.data })
        })
    }

    addProductToCart = () => {
        axios.get(`http://178.62.245.193:3000/product/${this.props.match.params._id}`).then((result) => {
            console.log(result.data)
        })
    }

    render() {
        const {
            _id,
            name,
            price,
            brand,
            image,
            category
        } = this.state.product

        if (this.state.product._id) {
            return (
                <SiteWrap divider firstImage>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='item-entry' style={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
                                    <img src={`${process.env.PUBLIC_URL}/product.jpg`} alt='Image' className='img-fluid' />
                                </div>

                            </div>
                            <div className='col-md-6'>
                                <h2 className='text-black'>{name}</h2>
                                <p className='text-primary h6'>{brand}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, vitae, explicabo? Incidunt facere, natus soluta dolores iusto! Molestiae expedita veritatis nesciunt doloremque sint asperiores fuga voluptas, distinctio, aperiam, ratione dolore.</p>
                                <p className='mb-4'>Ex numquam veritatis debitis minima quo error quam eos dolorum quidem perferendis. Quos repellat dignissimos minus, eveniet nam voluptatibus molestias omnis reiciendis perspiciatis illum hic magni iste, velit aperiam quis.</p>
                                <p><strong className='text-primary h4'>{'₺' + price.toFixed(2).toString().replace('.', ',')}</strong></p>
                                {
                                    /*
                                    <div className='mb-1 d-flex'>
                                        <label htmlFor='option-sm' className='d-flex mr-3 mb-3'>
                                            <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                                <input type='radio' id='option-sm' name='shop-sizes' />
                                            </span>
                                            <span className='d-inline-block text-black'>Small</span>
                                        </label>
                                        <label htmlFor='option-md' className='d-flex mr-3 mb-3'>
                                            <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                                <input type='radio' id='option-md' name='shop-sizes' />
                                            </span>
                                            <span className='d-inline-block text-black'>Medium</span>
                                        </label>
                                        <label htmlFor='option-lg' className='d-flex mr-3 mb-3'>
                                            <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                                <input type='radio' id='option-lg' name='shop-sizes' />
                                            </span>
                                            <span className='d-inline-block text-black'>Large</span>
                                        </label>
                                        <label htmlFor='option-xl' className='d-flex mr-3 mb-3'>
                                            <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                                <input type='radio' id='option-xl' name='shop-sizes' />
                                            </span>
                                            <span className='d-inline-block text-black'> Extra Large</span>
                                        </label>
                                    </div>
                                    */
                                }
                                <div className='mb-5'>
                                    <div className='input-group mb-3' style={{ maxWidth: 120 }}>

                                        <div className='input-group-prepend'>
                                            <button className='btn btn-outline-primary js-btn-minus' type='button'>&#45;</button>
                                        </div>

                                        <input type='text' className='form-control text-center' value='1' placeholder='' aria-label='Example text with button addon' aria-describedby='button-addon1' />

                                        <div className='input-group-append'>
                                            <button className='btn btn-outline-primary js-btn-plus' type='button'>&#43;</button>
                                        </div>

                                    </div>

                                </div>
                                <p><a href='cart.html' className='buy-now btn btn-sm height-auto px-4 py-3 btn-primary'>Add To Cart</a></p>

                            </div>
                        </div>
                    </div>
                </SiteWrap>
            )
        } else {
            return <Loading />
        }
    }
}

export default ShopSingle