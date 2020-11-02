import React from 'react'
import VanillaToasts from 'vanillatoasts'
import { IoMdHeartEmpty, IoMdHeart, IoMdCart } from 'react-icons/io'

import { addFavorite, removeFavorite } from '../../scripts/requests'

import './Product.css'

class ShopProduct extends React.Component {
    state = {
        favorite: this.props.favorite
    }

    addProductToCart = (event) => {
        event.stopPropagation()
        event.preventDefault()

        this.props.onIncreaseClick(this.props.item._id)
    }

    addToFavoriteProducts = async (event) => {
        event.stopPropagation()
        event.preventDefault()

        const { status } = await addFavorite(this.props.item._id)

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
    }


    removeFromFavoriteProdutcs = async (event) => {
        event.stopPropagation()
        event.preventDefault()

        const { status } = removeFavorite(this.props.item._id)

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
    }

    render() {
        const {
            name,
            slug,
            price,
            discountedPrice
        } = this.props.item

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${slug}_300x300.webp`

        return (
            <a href={`/${this.props.item.slug}/p`} className='col-lg-4 col-sm-6 col-6 m-0 p-2 mb-4 product product-padding'>
                <div className='border product-border-bottom'>

                    <div className='position-relative interface-container'>
                        <img
                            src={url}
                            alt=''
                            className='w-100 py-5' />

                        <div className='interface'>
                            <div className='top col-md-12'>
                                <div className='col-md-12 d-flex align-items-center justify-content-end text-white add-to-favorite'>
                                    <div onClick={this.props.loggedIn && (this.state.favorite ? this.removeFromFavoriteProdutcs : this.addToFavoriteProducts)}>
                                        {
                                            this.props.loggedIn && (
                                                this.state.favorite ?
                                                    <IoMdHeart size={28} color={'black'} />
                                                    : <IoMdHeartEmpty size={28} color={'black'} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='bottom col-md-12'>
                                <div className='col-md-12 d-flex align-items-center justify-content-end text-white add-to-cart'>
                                    <div onClick={this.addProductToCart}>
                                        <IoMdCart size={28} color={'black'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <div className='col-md-12 d-flex justify-content-start align-items-center p-0' style={{ textAlign: 'left' }}>
                            <div className='h5 pr-2 py-2 font-weight-normal' style={
                                {
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    ...(discountedPrice ? { textDecoration: 'line-through', color: 'grey' } : { color: 'black' })
                                }
                            }>
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
                            <div className='col-md-12 h6 text-black font-weight-normal product-name' style={{ height: 60 }}>
                                {name}
                            </div>
                        </div>
                    </div>

                </div>
            </a>
        )
    }
}

export default ShopProduct