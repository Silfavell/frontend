import React from 'react'
import axios from 'axios'
import { IoMdHeartEmpty } from 'react-icons/io'
import 'bootstrap/dist/css/bootstrap.min.css'

import './Product.css'

class Product extends React.Component {

    onAddToCasketClick = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/${this.props.item._id}`).then((res) => {
            alert('Ürün sepete eklendi')
        })
    }

    render() {
        const {
            img,
            name,
            price
        } = this.props.item

        return (
            <div className='col-md-12 ml-auto d-relative product'>
                <div className='position-relative interface-container'>
                    <img
                        src={img}
                        alt=''
                        className='w-100' />

                    <div className='interface'>
                        <div className='top col-md-12'>
                            <div className='col-md-6 d-flex align-items-center text-white add-to-favorite'>
                                <IoMdHeartEmpty size={24} />
                            </div>
                        </div>

                        <div className='bottom col-md-12'>
                            <a href={'/123'} className='col-md-6 d-flex align-items-center justify-content-center text-white inspect'>Incele</a>
                            <div className='col-md-6 d-flex align-items-center justify-content-center text-white add-to-cart' onClick={this.onAddToCasketClick}>Sepete Ekle</div>
                        </div>
                    </div>
                </div>

                <div className='mb-3'>
                    <div className='col-md-12 d-flex align-items-center justify-content-center'>
                        <div className='h5 p-3 text-black font-weight-normal'>
                            {'₺' + price.toFixed(2).toString().replace('.', ',')}
                        </div>
                    </div>
                    <div className='col-md-12 d-flex flex-row justify-content-center align-items-center' style={{ textAlign: 'center' }}>
                        <div className='h6 text-black font-weight-normal'>
                            {name}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product