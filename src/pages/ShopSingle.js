import axios from 'axios'
import React from 'react'
import joi from '@hapi/joi'
import { Helmet } from 'react-helmet'

import Loading from '../components/Loading'
import SiteWrap from '../components/SiteWrap'
import ProductImages from '../components/ProductImages'
import Tabs from '../components/ShopSingle/Tabs'
import Accordion from '../components/ShopSingle/Accordion'
import Carousel from '../components/Carousel'

import './ShopSingle.css'

class ShopSingle extends React.Component {

    state = {
        product: {},
        relatedProducts: [],
        quantity: 1,
        categoryName: '',
        subCategoryName: '',
        categorySlug: '',
        subCategorySlug: ''
    }

    fetchAndSetProduct = (productSlug) => {
        return axios.get(`${process.env.REACT_APP_API_URL}/product/${productSlug}`).then(({ data }) => data)
    }

    fetchRelatedProducts = (productSlug) => {
        return axios.get(`${process.env.REACT_APP_API_URL}/related-products/${productSlug}`).then(({ data }) => data)
    }

    componentWillMount() {
        Promise.all([this.fetchAndSetProduct(this.props.match.params._id), this.fetchRelatedProducts(this.props.match.params._id)]).then((vals) => {
            this.setState({ product: vals[0], relatedProducts: vals[1] }, () => {
                const visitedProducts = window.localStorage.getItem('visitedProducts')
                if (visitedProducts) {
                    const visitedProductsAsArray = JSON.parse(visitedProducts)
                    if (visitedProductsAsArray.indexOf(vals[0]._id) !== -1) {
                        visitedProductsAsArray.splice(visitedProductsAsArray.indexOf(vals[0]._id), 1)
                    }
                    visitedProductsAsArray.push(vals[0]._id)
                    window.localStorage.setItem('visitedProducts', JSON.stringify(visitedProductsAsArray))
                } else {
                    window.localStorage.setItem('visitedProducts', JSON.stringify([vals[0]._id]))
                }
            })
        }).catch((err) => {
            console.log(err)
            this.props.history.push('/not-found')
        })
    }

    onColorClick = (productSlug) => {
        this.fetchAndSetProduct(productSlug).then((product) => {
            this.setState({ product })
        })
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

    getImages = (image, imageCount) => {
        return Array.from(new Array(imageCount)).map((_, index) => (
            `${process.env.REACT_APP_API_URL}/assets/products/${image}-${index}.webp`
        ))
    }

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

    renderContent = ({ categories, onIncreaseClick }) => {
        const {
            _id,
            imageCount,
            categoryId,
            subCategoryId,
            name,
            details,
            specifications,
            comments,
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
            this.setState({
                categoryName: category.name,
                subCategoryName: subCategory.name,
                categorySlug: category.slug,
                subCategorySlug: subCategory.slug
            })
        }

        return (
            <div className='container'>
                <Helmet>
                    <title>{`${name} | Silfavell`}</title>
                    <meta name='description' content={details} data-react-helmet='true' />
                </Helmet>
                <div className='row'>
                    <div className='col-md-6 pb-5 px-5'>
                        <ProductImages images={this.getImages(image, imageCount)} />
                    </div>
                    <div className='col-md-6 pb-4'>
                        <h2 className='text-black'>{name}</h2>
                        <a
                            href={`/shop/${this.state.categorySlug}/${this.state.subCategorySlug}?brands=${this.state.product.brand}`}
                            className='text-primary h5'
                            style={{ cursor: 'pointer' }}>{brand}</a>
                        {
                            (color && group.length > 1) && (
                                <p className='my-4'>
                                    <p className='text-secondary h5 mb-4'>{`Renk: ${color.name}`}</p>

                                    <div className='row' style={{ paddingLeft: 10, paddingRight: 10 }}>
                                        {
                                            group.map((groupColor) => (
                                                <div
                                                    onClick={() => { this.onColorClick(groupColor.slug) }}
                                                    className={`mr-2 ${groupColor._id === _id ? 'border' : ''}`} style={{ padding: '.3rem', height: 36, width: 36, borderRadius: '50%', cursor: 'pointer' }}>
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
                <div className='mt-5' id='shop-single-tabs'>
                    <Tabs
                        productId={_id}
                        details={details}
                        comments={comments}
                        specifications={specifications}
                    />
                </div>

                <div className='mt-5' id='shop-single-accordion'>
                    <Accordion
                        productId={_id}
                        details={details}
                        comments={comments}
                        specifications={specifications}
                    />
                </div>

                {
                    (this.state.relatedProducts && this.state.relatedProducts.length > 0) && (
                        <>
                            <div className='col-md-12 p-4' />
                            <div className='col-md-12 px-2'>
                                <h2 className='h4 my-3 text-black d-flex align-items-center justify-content-start'>İlgizi Çekebilecek Diğer Ürünler</h2>
                            </div>

                            <Carousel
                                shopSingle
                                products={this.state.relatedProducts}
                                onIncreaseClick={onIncreaseClick}
                            />
                        </>
                    )
                }
            </div>
        )
    }

    render() {
        const {
            categoryName,
            subCategoryName,
            categorySlug,
            subCategorySlug
        } = this.state

        const divider = [
            { path: `/shop/${categorySlug}`, title: categoryName },
            { path: `/shop/${categorySlug}/${subCategorySlug}`, title: subCategoryName },
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