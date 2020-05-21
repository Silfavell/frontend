import React from 'react'
import { IoMdHeartEmpty, IoIosEye } from "react-icons/io"
import 'bootstrap/dist/css/bootstrap.min.css'

import './Product.css'

class Product extends React.Component {
    render() {
        const {
            img,
            name,
            price
        } = this.props.item

        return (
            <div className='col-md-3 ml-auto d-relative product'>
                <div className='position-relative interface-container'>
                    <img
                        src='http://silfavell.com/img/product/4.jpg'
                        alt=''
                        className='w-100' />

                    <div className='interface'>
                        <div className="top col-md-12">
                            <div className="col-md-6 d-flex align-items-center text-white add-to-favorite">
                                <IoMdHeartEmpty size={24} />
                            </div>
                        </div>

                        <div className="bottom col-md-12">
                            <div className="col-md-6 d-flex align-items-center justify-content-center text-white inspect">Incele</div>
                            <div className="col-md-6 d-flex align-items-center justify-content-center text-white add-to-cart">Sepete Ekle</div>
                        </div>
                    </div>
                </div>

                <div class='mb-3'>
                    <div className='col-md-12 d-flex align-items-center justify-content-center'>
                        <div class='h5 p-3 text-black font-weight-normal'>
                            {'₺' + price.toFixed(2).toString().replace('.', ',')}
                        </div>
                    </div>
                    <div className='col-md-12 d-flex flex-row justify-content-center align-items-center' style={{ textAlign: 'center' }}>
                        <div class='h6 text-black font-weight-normal'>
                            {name}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product