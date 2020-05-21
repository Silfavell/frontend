import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import prod1 from '../style/images/prod_1.png'

class Product extends React.Component {
    render() {
        const {
            img,
            name,
            price
        } = this.props.item

        return (
            <div className='col-md-3 ml-auto d-relative'>
                <img
                    src='http://silfavell.com/img/product/4.jpg'
                    alt=''
                    className='w-100' />

                <div class='mb-3'>
                    <div className='col-md-12  d-flex align-items-center justify-content-center'>
                        <div class='h4 p-2 text-black font-weight-normal'>
                            {'₺' + price.toFixed(2).toString().replace('.', ',')}
                        </div>
                    </div>
                    <div className='col-md-12 d-flex flex-row justify-content-center align-items-center' style={{ textAlign: 'center' }}>
                        <div class='p-2 text-black font-weight-normal'>
                            {name}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product