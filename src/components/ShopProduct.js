import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'
import { IoMdHeartEmpty, IoMdHeart, IoMdCart } from 'react-icons/io'

import 'bootstrap/dist/css/bootstrap.min.css'

import './Product.css'

class ShopProduct extends React.Component {

    state = {
        favorite: this.props.favorite
    }

    addProductToCart = (event) => {
        event.stopPropagation()

        this.props.onIncreaseClick(this.props.item._id)
    }

    addToFavoriteProducts = (event) => {
        event.stopPropagation()

        axios.post(`${process.env.REACT_APP_API_URL}/user/favorite-product`, { _id: this.props.item._id }).then(({ status }) => {
            if (status === 200) {
                this.setState({ favorite: true }, () => {
                    VanillaToasts.create({
                        title: `Ürün favorilere eklendi`,
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
                    })
                })
            }
        })
    }


    removeFromFavoriteProdutcs = (event) => {
        event.stopPropagation()

        axios.delete(`${process.env.REACT_APP_API_URL}/user/favorite-product/${this.props.item._id}`).then(({ status }) => {
            if (status === 200) {
                this.setState({ favorite: false }, () => {
                    VanillaToasts.create({
                        title: `Ürün favorilerden çıkarıldı`,
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
                    })
                })
            }
        })
    }

    onInspectClick = () => {
        window.history.pushState({}, null, '/product/' + this.props.item.slug)
        window.location.reload()
    }

    render() {
        const {
            image,
            name,
            price,
            discountedPrice
        } = this.props.item

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${image}-0.webp`

        return (
            <div className='col-lg-4 col-sm-6 col-12 mb-4 product' onClick={this.onInspectClick}>
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
                                <div className='col-md-12 d-flex align-items-center justify-content-end text-white add-to-favorite'>
                                    {
                                        this.props.loggedIn && (
                                            this.state.favorite ?
                                                <IoMdHeart size={28} color={'black'} onClick={this.removeFromFavoriteProdutcs} />
                                                : <IoMdHeartEmpty size={28} color={'black'} onClick={this.addToFavoriteProducts} />
                                        )
                                    }
                                </div>
                            </div>

                            <div className='bottom col-md-12'>
                                <div className='col-md-12 d-flex align-items-center justify-content-end text-white add-to-cart'>
                                    <IoMdCart size={28} color={'black'} onClick={this.addProductToCart} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <div className='col-md-12 d-flex justify-content-start align-items-center p-0' style={{ textAlign: 'left' }}>
                            <div className='h5 pl-4 pr-2 py-2 text-black font-weight-normal' style={discountedPrice ? { textDecoration: 'line-through' } : {}}>
                                {'₺' + price.toFixed(2).toString().replace('.', ',')}
                            </div>

                            {
                                discountedPrice && (
                                    <div className='h5 py-2 text-black font-weight-normal'>
                                        {'₺' + discountedPrice.toFixed(2).toString().replace('.', ',')}
                                    </div>
                                )
                            }

                        </div>
                        <div className='col-md-12 d-flex flex-row justify-content-start align-items-center p-0' style={{ textAlign: 'left' }}>
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

export default ShopProduct