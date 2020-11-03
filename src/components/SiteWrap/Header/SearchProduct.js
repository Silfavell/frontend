import React from 'react'

class SearchProduct extends React.PureComponent {
    render() {
        const {
            name,
            price,
            slug
        } = this.props.item

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${slug}_300x300.webp`

        return (
            <a
                href={`/${slug}/p`}
                className='col-md-4 p-2'
                style={{ cursor: 'pointer' }}
            >

                <div className='px-4 py-2 border h-100'>
                    <img
                        src={url}
                        alt=''
                        className='w-100 mb-3 py-3' />

                    <div className='col-md-12 d-flex align-items-center justify-content-center'>
                        <div className='h5 text-black font-weight-normal'>
                            {`₺${price.toFixed(2).toString().replace('.', ',')}`}
                        </div>
                    </div>

                    <div className='col-md-12 d-flex flex-row justify-content-center align-items-center p-0' style={{ textAlign: 'center' }}>
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
