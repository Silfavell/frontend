import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'

import 'bootstrap/dist/css/bootstrap.min.css'

import './Product.css'

class Product extends React.Component {

    addProductToCart = () => {
        this.props.onIncreaseClick(this.props.item._id)
    }

    onInspectClick = () => {
        window.history.pushState({}, null, '/product/' + this.props.item._id)
        window.location.reload()
    }

    render() {
        const {
            name,
            price,
            image
        } = this.props.item

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${image}-0.webp`

        return (
            <div className='col-md-12 ml-auto d-relative product' >
                <div className='border product-border'>
                    <div className='position-relative interface-container'>
                        <img
                            src={url}
                            alt=''
                            onError={(e) => {
                                e.target.src = process.env.PUBLIC_URL + '/empty-image.webp'
                            }}
                            className='w-100 py-5' />

                        <div className='interface'>
                            <div className='top col-md-12'>
                                <div className='col-md-6 d-flex align-items-center text-white add-to-favorite'>
                                    <IoMdHeartEmpty size={24} />
                                </div>
                            </div>

                            <div className='bottom col-md-12'>
                                <div className='col-md-6 d-flex align-items-center justify-content-center text-white inspect' onClick={this.onInspectClick}>Incele</div>
                                <div className='col-md-6 d-flex align-items-center justify-content-center text-white add-to-cart' onClick={this.addProductToCart}>Sepete Ekle</div>
                            </div>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <div className='col-md-12 d-flex align-items-center justify-content-center'>
                            <div className='h5 p-3 text-black font-weight-normal'>
                                {'₺' + price.toFixed(2).toString().replace('.', ',')}
                            </div>
                        </div>
                        <div className='col-md-12 d-flex flex-row justify-content-center align-items-center p-0' style={{ textAlign: 'center' }}>
                            <div className='h6 text-black font-weight-normal px-4' style={{ wordWrap: 'break-word', height: 50 }}>
                                {name.substr(0, 60)}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Product