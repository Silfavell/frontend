/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'

import SiteWrap from '../components/SiteWrap'
import ShopProduct from '../components/ShopProduct'
import Loading from '../components/Loading'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

class Shop extends React.Component {

    state = {
        categories: [],
        products: [],
        productsLength: 0,
        categoryId: null,
        page: 0,
        fetching: true
    }

    siteRef = React.createRef()

    fetchProducts = () => {
        this.scrollToTop()
        this.setState({ fetching: true })
        const url = `${process.env.REACT_APP_API_URL}/products-filter${this.props.location.search}&start=${this.state.page * 18}&quantity=18`

        axios.get(`${url}`).then(({ data }) => {
            console.log(data)
            this.setState({ products: data, fetching: false })
        })
    }

    onPageClick = (page) => {
        this.setState({ page }, () => {
            this.fetchProducts()
        })
    }

    scrollToTop = () => window.scrollTo({ behavior: 'smooth', top: this.siteRef?.current?.offsetTop })

    UNSAFE_componentWillMount() {
        this.getCategories().then(categories => {

            this.getProductsLengthOfCategory(categories[0]._id).then((productsLength) => {

                this.setState({ categories, categoryId: categories[0]._id, productsLength }, () => {
                    this.fetchProducts()
                })

            })

        })
    }

    getProductsLengthOfCategory = (categoryId) => (
        axios.get(`${process.env.REACT_APP_API_URL}/products-length/${categoryId}`).then(({ data: productsLength }) => productsLength)
    )

    getCategories = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/categories`).then(({ data }) => data)
    )

    render() {

        const currentCategory = this.state.categories.find(category => category._id === this.state.products[0]?.categoryId)
        const subCategory = this.props.location.search.includes('subCategoryId') ? currentCategory?.subCategories.find((subCategory) => subCategory._id === this.state.products[0].subCategoryId) : null

        const divider = [
            {
                path: null,
                title: 'Shop'
            }
        ]

        if (this.state.fetching || !currentCategory) {
            return (
                <Loading />
            )
        } else {
            return (
                <SiteWrap divider={divider} siteRef={this.siteRef}>
                    <div className='container'>
                        <div className='row mb-5'>
                            <div className='col-md-9 order-1'>
                                <div className='row align'>
                                    <div className='col-md-12 mb-5'>
                                        <div className='float-md-left'><h3 className='text-gray text-uppercase'>{subCategory?.name ?? currentCategory?.name}</h3></div>
                                        <div className='d-flex'>
                                            <div className='dropdown mr-1 ml-md-auto'>
                                                <button type='button' className='btn btn-white btn-sm dropdown-toggle px-4' id='dropdownMenuOffset' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                                    Latest
                                                </button>
                                                <div className='dropdown-menu' aria-labelledby='dropdownMenuOffset'>
                                                    <a className='dropdown-item' href='#'>Men</a>
                                                    <a className='dropdown-item' href='#'>Women</a>
                                                    <a className='dropdown-item' href='#'>Children</a>
                                                </div>
                                            </div>
                                            <div className='btn-group'>
                                                <button type='button' className='btn btn-white btn-sm dropdown-toggle px-4' id='dropdownMenuReference' data-toggle='dropdown'>Reference</button>
                                                <div className='dropdown-menu' aria-labelledby='dropdownMenuReference'>
                                                    <a className='dropdown-item' href='#'>Relevance</a>
                                                    <a className='dropdown-item' href='#'>Name, A to Z</a>
                                                    <a className='dropdown-item' href='#'>Name, Z to A</a>
                                                    <div className='dropdown-divider'></div>
                                                    <a className='dropdown-item' href='#'>Price, low to high</a>
                                                    <a className='dropdown-item' href='#'>Price, high to low</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-5'>
                                    {
                                        this.state.products.map((product) => (
                                            <ShopProduct key={product._id.toString()} item={product} />
                                        ))
                                    }
                                </div>
                                <div className='row'>
                                    <div className='col-md-12 text-center'>
                                        <div className='site-block-27'>
                                            <ul>
                                                <li style={{ marginLeft: 5, cursor: 'pointer' }}><span>&lt;</span></li>
                                                {
                                                    // pages
                                                    Array.from(new Array(Math.ceil(this.state.productsLength / 18))).map((_, index) => (
                                                        <li
                                                            style={{ marginLeft: 5, cursor: 'pointer' }}
                                                            className={index === this.state.page ? 'active' : ''}
                                                            onClick={() => this.onPageClick(index)}
                                                        >

                                                            <span>{index + 1}</span>

                                                        </li>
                                                    ))
                                                }
                                                <li style={{ marginLeft: 5, cursor: 'pointer' }}><span>&gt;</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-3 order mb-5 mb-md-0'>

                                <div className='border p-4 rounded mb-4'>
                                    <h3 className='mb-3 h6 text-uppercase text-black d-block'>Related Categories</h3>
                                    <ul className='list-unstyled mb-0'>
                                        {
                                            currentCategory?.subCategories.map((category) => (
                                                <li className='mb-1'>
                                                    <a className='d-flex text-primary'
                                                        href={`/shop?categoryId=${this.state.products[0]?.categoryId}&subCategoryId=${category._id}`}>{category.name}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>

                                <div className='border p-4 rounded mb-4'>
                                    <div className='mb-4'>
                                        <h3 className='mb-3 h6 text-uppercase text-black d-block'>Brands</h3>
                                        {
                                            (subCategory?.brands ?? currentCategory?.brands).map((brand) => (
                                                <label htmlFor={brand._id} className='d-flex align-items-center justify-content-start' style={{ cursor: 'pointer' }}>
                                                    <input type='checkbox' id={brand._id} className='mr-2 mt-1' style={{ cursor: 'pointer' }} /> <span className='text-black'>{`${brand.name} (${brand.productQuantity})`}</span>
                                                </label>
                                            ))
                                        }
                                    </div>

                                    <div className='mb-4'>
                                        <h3 className='mb-3 h6 text-uppercase text-black d-block'>Color</h3>
                                        <a href='#' className='d-flex color-item align-items-center' >
                                            <span className='bg-danger color d-inline-block rounded-circle mr-2'></span> <span className='text-black'>Red (2,429)</span>
                                        </a>
                                        <a href='#' className='d-flex color-item align-items-center' >
                                            <span className='bg-success color d-inline-block rounded-circle mr-2'></span> <span className='text-black'>Green (2,298)</span>
                                        </a>
                                        <a href='#' className='d-flex color-item align-items-center' >
                                            <span className='bg-info color d-inline-block rounded-circle mr-2'></span> <span className='text-black'>Blue (1,075)</span>
                                        </a>
                                        <a href='#' className='d-flex color-item align-items-center' >
                                            <span className='bg-primary color d-inline-block rounded-circle mr-2'></span> <span className='text-black'>Purple (1,075)</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SiteWrap>
            )
        }
    }
}

export default Shop