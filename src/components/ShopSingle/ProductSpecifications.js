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
        const {
            benefit,
            brushThickness,
            colorDetail,
            feature,
            form,
            kind
        } = this.props.specifications

        return (
            <div className='my-3'>
                <div className='col-md-12'>
                    <span style={{ whiteSpace: 'break-spaces' }}>
                        {this.props.details ?? 'Ürün detayı bulunmamaktadır'}
                    </span>
                </div>

                <div className='col-md-12'>
                    <div className='border mt-5'>
                        {
                            feature && this.renderDetailRow({ title: 'Özellik', value: feature, first: true })
                        }
                        {
                            benefit && this.renderDetailRow({ title: 'Fayda/İhtiyaç', value: benefit })
                        }
                        {
                            colorDetail && this.renderDetailRow({ title: 'Bitiş', value: colorDetail })
                        }
                        {
                            brushThickness && this.renderDetailRow({ title: 'Fırça Kalınlığı', value: brushThickness })
                        }
                        {
                            form && this.renderDetailRow({ title: 'Form', value: form })
                        }
                        {
                            kind && this.renderDetailRow({ title: 'Çeşit', value: kind })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductSpecifications