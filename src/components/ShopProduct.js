import React from 'react'
// import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'

import 'bootstrap/dist/css/bootstrap.min.css'

import './Product.css'

class ShopProduct extends React.Component {

    addProductToCart = () => {
        this.props.onIncreaseClick(this.props.item._id)
    }

    /*
    addToFavoriteProducts = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/user/favorite-product`, { _id: this.props.item._id }).then(({ status }) => {
            if (status === 200) {
                VanillaToasts.create({
                    title: `Ürün favorilere eklendi`,
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })
            }
        })
    }
    

    removeFromFavoriteProdutcs = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/user/favorite-product/${this.props.item._id}`).then(({ status }) => {
            if (status === 200) {
                VanillaToasts.create({
                    title: `Ürün favorilerden çıkarıldı`,
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })
            }
        })
    }
    */

    onInspectClick = () => {
        window.history.pushState({}, null, this.props.item._id)
        window.location.reload()
    }

    render() {
        const {
            img,
            name,
            price
        } = this.props.item

        return (
            <div className='col-lg-4 col-6 item-entry mb-4 product'>
                <div className='position-relative interface-container'>
                    <img
                        src={process.env.PUBLIC_URL + '/product.jpg'}
                        alt=''
                        className='w-100' />

                    <div className='interface'>
                        <div className='top col-md-12'>
                            <div className='col-md-6 d-flex align-items-center text-white add-to-favorite'>
                                {
                                    // this.props.favorite ? <IoMdHeart size={32} color={'#6610F2'} onClick={this.removeFromFavoriteProdutcs} />
                                    //     : <IoMdHeartEmpty size={32} onClick={this.addToFavoriteProducts} />
                                }
                            </div>
                        </div>

                        <div className='bottom col-md-12'>
                            <div className='col-md-6 d-flex align-items-center justify-content-center text-white inspect' onClick={this.onInspectClick}>Incele</div>
                            <div className='col-md-6 d-flex align-items-center justify-content-center text-white add-to-cart' onClick={this.addProductToCart}>Sepete Ekle</div>
                        </div>
                    </div>
                </div>

                <div className='mb-3'>
                    <div className='col-lg-12 d-flex align-items-center justify-content-center'>
                        <div className='h5 p-3 text-black font-weight-normal'>
                            {'₺' + price.toFixed(2).toString().replace('.', ',')}
                        </div>
                    </div>
                    <div className='col-lg-12 d-flex flex-row justify-content-center align-items-center' style={{ textAlign: 'center' }}>
                        <div className='h6 text-black font-weight-normal'>
                            {name}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopProduct