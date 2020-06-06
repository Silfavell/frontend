import React from 'react'

class NavCartItem extends React.Component {
    render() {
        const {
            name,
            price,
            quantity
        } = this.props.item

        return (
            <div className='item col-md-12 p-2'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img
                            src={process.env.PUBLIC_URL + '/product.jpg'}
                            alt=''
                            className='w-100' />
                    </div>
                    <div className='col-md-8 d-flex align-items-center justify-content-center'>
                        <div className='row'>
                            <div className='col-md-12' style={{ textAlign: 'center' }}>
                                <div className='h6 text-black font-weight-normal'>
                                    {name}
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className='h6 p-3 text-black font-weight-normal'>
                                    {'₺' + price.toFixed(2).toString().replace('.', ',')}
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className='h6 text-black font-weight-normal'>
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