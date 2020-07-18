/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React from 'react'
import joi from '@hapi/joi'

import Loading from '../components/Loading'
import SiteWrap from '../components/SiteWrap'


class ShopSingle extends React.Component {

    state = {
        product: {},
        quantity: 1,
        categoryName: '',
        subCategoryName: ''
    }

    fetchAndSetProduct = (productId) => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/${productId}`).then(({ data: product }) => {
            this.setState({ product }, () => {
                const visitedProducts = window.localStorage.getItem('visitedProducts')
                if (visitedProducts) {
                    const visitedProductsAsArray = JSON.parse(visitedProducts)
                    if (visitedProductsAsArray.indexOf(product._id) !== -1) {
                        visitedProductsAsArray.splice(visitedProductsAsArray.indexOf(product._id), 1)
                    }
                    visitedProductsAsArray.push(product._id)
                    window.localStorage.setItem('visitedProducts', JSON.stringify(visitedProductsAsArray))
                } else {
                    window.localStorage.setItem('visitedProducts', JSON.stringify([product._id]))
                }
            })
        }).catch((err) => {
            this.props.history.push('/not-found')
        })
    }

    componentWillMount() {
        this.fetchAndSetProduct(this.props.match.params._id)
    }

    onColorClick = (productId) => {
        this.fetchAndSetProduct(productId)
    }

    increaseQuantity = () => {
        this.setState({ quantity: this.state.quantity + 1 })
    }

    decreaseQuantity = () => {
        this.setState({ quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1 })
    }

    onQuantityChange = (event) => {
        const { value } = event.target

        joi.number()
            .min(1)
            .validateAsync(value).then(() => {
                this.setState({ quantity: parseInt(value) })
            })
    }

    onAddToCartClick = (onIncreaseClick) => {
        onIncreaseClick(this.state.product._id, this.state.quantity)
        this.setState({ quantity: 1 })
    }

    onBrandClick = () => {
        const {
            categoryId,
            subCategoryId,
            brand
        } = this.state.product

        window.history.pushState({}, null, `/shop?categoryId=${categoryId}&subCategoryId=${subCategoryId}&brands=${brand}`)
        window.location.reload()
    }

    renderContent = ({ categories, onIncreaseClick }) => {
        const {
            categoryId,
            subCategoryId,
            name,
            price,
            discountedPrice,
            brand,
            image,
            color,
            group
        } = this.state.product

        const category = categories.find(category => category._id === categoryId)
        const subCategory = category?.subCategories.find((subCategory) => subCategory._id === subCategoryId)

        if (this.state.categoryName.length === 0 && category && subCategory) {
            console.log(category, subCategory)
            this.setState({ categoryName: category.name, subCategoryName: subCategory.name })
        }

        const url = `${process.env.REACT_APP_API_URL}/assets/products/${image}-0.webp`

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div style={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
                            <img
                                src={url}
                                alt=''
                                onError={(event) => {
                                    event.target.src = process.env.PUBLIC_URL + '/empty-image.webp'
                                }}
                                className='img-fluid'
                            />
                        </div>

                    </div>
                    <div className='col-md-6'>
                        <h2 className='text-black'>{name}</h2>
                        <p className='text-primary h5' onClick={this.onBrandClick} style={{ cursor: 'pointer' }}>{brand}</p>
                        {
                            /*
                            <p className='mb-4'>
                                • Keçi sütlü formülü ve yoğun proteinli yapısı ile dudaklarıınız MATTE LIPS ile daha nemli bir görünüme kavuşacaktır. <br />
                                • Dudaklarınızda uzun süreli ,doğal mat etki sağlar. Kremsi yapısı ile örtücülüğü mükemmeldir. <br />
                                • Keçi sütü ve E Vitamini dudaklarınız gün boyu nemlendirilecektir. <br />
                                • Paraben içermez. <br />
                                • Dermatolojik olarak test edilmiştir. <br />
                                • Gün boyu güzelliğinizle büyülerken cildiniz beslensin!
                            </p>
                            */
                        }
                        {
                            (color && group.length > 1) && (
                                <p className='my-4'>
                                    <p className='text-secondary h5 mb-4'>{`Renk: ${color.name}`}</p>

                                    <div className='d-flex direction-row'>
                                        {
                                            group.map((groupColor) => (
                                                <div
                                                    onClick={() => { this.onColorClick(groupColor._id) }}
                                                    className='border p-1 mr-2' style={{ height: 36, width: 36, borderRadius: '50%', cursor: 'pointer' }}>
                                                    <div style={{ height: '100%', width: '100%', borderRadius: '50%', backgroundColor: groupColor.color.code }} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </p>
                            )
                        }

                        <p className='my-4'>
                            <strong className='h4' style={discountedPrice ? { textDecoration: 'line-through', color: 'grey' } : { color: 'black' }}>
                                {'₺' + price.toFixed(2).toString().replace('.', ',')}
                            </strong>
                            {
                                discountedPrice && (
                                    <strong className='h4 ml-3 text-black'>{'₺' + discountedPrice.toFixed(2).toString().replace('.', ',')}</strong>
                                )
                            }
                        </p>
                        {
                            /*
                            <div className='mb-1 d-flex'>
                                <label htmlFor='option-sm' className='d-flex mr-3 mb-3'>
                                    <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                        <input type='radio' id='option-sm' name='shop-sizes' />
                                    </span>
                                    <span className='d-inline-block text-black'>Small</span>
                                </label>
                                <label htmlFor='option-md' className='d-flex mr-3 mb-3'>
                                    <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                        <input type='radio' id='option-md' name='shop-sizes' />
                                    </span>
                                    <span className='d-inline-block text-black'>Medium</span>
                                </label>
                                <label htmlFor='option-lg' className='d-flex mr-3 mb-3'>
                                    <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                        <input type='radio' id='option-lg' name='shop-sizes' />
                                    </span>
                                    <span className='d-inline-block text-black'>Large</span>
                                </label>
                                <label htmlFor='option-xl' className='d-flex mr-3 mb-3'>
                                    <span className='d-inline-block mr-2' style={{ top: -2, position: 'relative' }}>
                                        <input type='radio' id='option-xl' name='shop-sizes' />
                                    </span>
                                    <span className='d-inline-block text-black'> Extra Large</span>
                                </label>
                            </div>
                            */
                        }
                        <div className='mb-5'>
                            <div className='input-group mb-3' style={{ maxWidth: 120 }}>

                                <div className='input-group-prepend' onClick={this.decreaseQuantity}>
                                    <button className='btn btn-outline-primary js-btn-minus' type='button'>&#45;</button>
                                </div>

                                <input
                                    type='text'
                                    className='form-control text-center'
                                    value={this.state.quantity}
                                    onChange={this.onQuantityChange} />

                                <div className='input-group-append' onClick={this.increaseQuantity}>
                                    <button className='btn btn-outline-primary js-btn-plus' type='button'>&#43;</button>
                                </div>

                            </div>

                        </div>

                        <button
                            onClick={() => this.onAddToCartClick(onIncreaseClick)}
                            className='buy-now btn btn-sm height-auto px-4 py-3 btn-primary'>Sepete Ekle</button>

                    </div>
                </div>
            </div >
        )
    }

    render() {
        const {
            categoryId,
            subCategoryId
        } = this.state.product

        const divider = [
            { path: `/shop?categoryId=${categoryId}`, title: this.state.categoryName },
            { path: `/shop?categoryId=${categoryId}&subCategoryId=${subCategoryId}`, title: this.state.subCategoryName },
            { path: null, title: this.state.product.name }
        ]

        if (this.state.product._id) {
            return (
                <SiteWrap divider={divider}>
                    <this.renderContent />
                </SiteWrap>
            )
        } else {
            return <Loading />
        }
    }
}

export default ShopSingle