import React from 'react'

class ProductSpecifications extends React.Component {

    renderDetailRow = ({ title, value, first }) => (
        <div className={`col-md-12 ${!first ? 'border-top' : ''}`}>
            <div className='row'>
                <div className='col-3 py-2 bg-light'>{title}</div>
                <div className='border-left col-9 py-2'>
                    <strong className='text-black'>{value}</strong>
                </div>
            </div>
        </div>
    )

    render() {
        return (
            <div className='p-4'>
                <div className='col-md-12'>
                    <p style={{ whiteSpace: 'break-spaces', fontSize: 17 }}>
                        {this.props.details ?? 'Ürün detayı bulunmamaktadır.'}
                    </p>
                </div>

                {
                    this.props.specifications.length > 0 && (
                        <div className='col-md-12'>
                            <div className='border mt-5'>
                                {
                                    this.props.specifications.map((specification, index) => (
                                        this.renderDetailRow({ title: specification.name, value: specification.value, first: index === 0 })
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default ProductSpecifications