import React from 'react'

class SearchProduct extends React.Component {
    render() {

        const {
            _id,
            name,
            price
        } = this.props.item

        return (
            <a
                href={`/${_id}`}
                className='col-md-3 p-2'
                style={{ cursor: 'pointer' }}>

                <div className='px-4 py-2 border h-100'>
                    <img
                        src={process.env.PUBLIC_URL + '/product.jpg'}
                        alt=''
                        className='w-100 mb-3' />

                    <div className='col-md-12 d-flex align-items-center justify-content-center'>
                        <div className='h5 text-black font-weight-normal'>
                            {'₺' + price.toFixed(2).toString().replace('.', ',')}
                        </div>
                    </div>

                    <div className='col-md-12 d-flex flex-row justify-content-center align-items-center' style={{ textAlign: 'center' }}>
                        <div className='h6 text-black font-weight-normal'>
                            {name}
                        </div>
                    </div>

                </div>

            </a>
        )
    }
}

export default SearchProduct