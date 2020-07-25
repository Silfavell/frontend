import React from 'react'

class NavCartItem extends React.Component {
    render() {
        const {
            name,
            price,
            discountedPrice,
            quantity,
            image
        } = this.props.item

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${image}-0.webp`

        return (
            <div className='item col-md-12 p-2'>
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
                                <div className='py-3 font-weight-normal' style={discountedPrice ? { textDecoration: 'line-through', color: 'grey' } : {}}>
                                    {'₺' + price.toFixed(2).toString().replace('.', ',')}
                                </div>
                                {
                                    discountedPrice && (
                                        <div className='p-3 text-black font-weight-normal'>
                                            {'₺' + discountedPrice.toFixed(2).toString().replace('.', ',')}
                                        </div>
                                    )
                                }
                            </div>
                            <div className='col-md-12'>
                                <div className='text-black font-weight-normal' style={{ textAlign: 'left' }}>
                                    {'Adet: ' + quantity}
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