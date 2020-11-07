import React from 'react'

import { IoIosClose } from 'react-icons/io'

class NavCartItem extends React.Component {
    removeProduct = (event) => {
        event.stopPropagation()
        event.preventDefault()

        this.props.setProductQuantity(this.props.item._id, 0)
    }

    render() {
        const {
            name,
            price,
            discountedPrice,
            quantity,
            slug
        } = this.props.item

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${slug}_300x300.webp`

        return (
            <div className='item col-md-12 p-2'>
                <div
                    style={{
                        position: 'absolute', bottom: 0, right: 0, padding: 6, zIndex: 2, cursor: 'pointer'
                    }}
                    onClick={this.removeProduct}>
                    <IoIosClose size={24} color='black' />
                </div>
                <div className='row'>
                    <div className='col-md-4 d-flex align-items-center justify-content-center'>
                        <img
                            src={url}
                            alt=''
                            className='w-100' />
                    </div>
                    <div className='col-md-8 d-flex align-items-center justify-content-center'>
                        <div className='row'>
                            <div className='col-md-12' style={{ textAlign: 'left' }}>
                                <div className='h6 text-black font-weight-normal'>
                                    {name}
                                </div>
                            </div>
                            <div className='col-md-12 d-flex direction-row'>
                                <div className='py-3 font-weight-normal' style={discountedPrice ? { textDecoration: 'line-through', color: 'grey' } : { color: 'black' }}>
                                    {`₺${price.toFixed(2).toString().replace('.', ',')}`}
                                </div>
                                {
                                    discountedPrice && (
                                        <div className='p-3 text-black font-weight-normal'>
                                            {`₺${discountedPrice.toFixed(2).toString().replace('.', ',')}`}
                                        </div>
                                    )
                                }
                            </div>
                            <div className='col-md-12'>
                                <div className='text-black font-weight-normal' style={{ textAlign: 'left' }}>
                                    {`Adet: ${quantity}`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavCartItem
