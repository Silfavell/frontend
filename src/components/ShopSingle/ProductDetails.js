import React from 'react'

class ProductDetails extends React.Component {

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
            <div className='my-3'>
                <div className='col-md-12'>
                    <span style={{ whiteSpace: 'break-spaces' }}>
                        {this.props.details ?? 'Ürün detayı bulunmamaktadır'}
                    </span>
                </div>

                <div className='col-md-12'>
                    <div className='border mt-5'>
                        {
                            this.renderDetailRow({ title: 'Ürün Kodu', value: '10011395', first: true })
                        }
                        {
                            this.renderDetailRow({ title: 'Renk Tonu', value: 'Yeşil' })
                        }
                        {
                            this.renderDetailRow({ title: 'Fayda/İhtiyaç', value: 'Sıkılaştırıcı' })
                        }
                        {
                            this.renderDetailRow({ title: 'Bitiş', value: 'Mat' })
                        }
                        {
                            this.renderDetailRow({ title: 'Çeşit', value: 'Tekli' })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails