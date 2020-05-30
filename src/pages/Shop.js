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

    fetchProducts = () => {
        this.setState({ fetching: true })
        axios.get(`${process.env.REACT_APP_API_URL}/products-by-range?categoryId=${this.state.categoryId}&start=${this.state.page * 18}&quantity=17`).then(({ data }) => {
            this.setState({ products: data, fetching: false })
        })
    }

    onCategoryClick = (categoryId) => {
        axios.get(`${process.env.REACT_APP_API_URL}/products-length/${categoryId}`).then(({ data }) => {
            this.setState({ categoryId, productsLength: data }, () => {
                this.fetchProducts()
            })
        })
    }

    onPageClick = (page) => {
        this.setState({ page }, () => {
            this.fetchProducts()
        })
    }

    UNSAFE_componentWillMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/categories`).then(({ data: categories }) => {

            axios.get(`${process.env.REACT_APP_API_URL}/products-length/${categories[0]._id}`).then(({ data: productsLength }) => {

                this.setState({ categories, categoryId: categories[0]._id, productsLength }, () => {
                    this.fetchProducts()
                })

            })

        })
    }

    render() {
        if (this.state.fetching) {
            return (
                <Loading />
            )
        } else {
            return (
                <SiteWrap divider>
                    <div className='container'>
                        <div className='row mb-5'>
                            <div className='col-md-9 order-1'>
                                <div className='row align'>
                                    <div className='col-md-12 mb-5'>
                                        <div className='float-md-left'><h3 className='text-gray text-uppercase'>{this.props.location.pathname.replace('/', '')}</h3></div>
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
                                            <ShopProduct item={JSON.parse(product)} />
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
                                    <h3 className='mb-3 h6 text-uppercase text-black d-block'>Categories</h3>
                                    <ul className='list-unstyled mb-0'>
                                        {
                                            this.state.categories.map((category) => (
                                                <li className='mb-1'>
                                                    <span className='d-flex text-primary' style={{ cursor: 'pointer' }} onClick={() => this.onCategoryClick(category._id)}>
                                                        <span>{category.name}</span>
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>

                                <div className='border p-4 rounded mb-4'>
                                    <div className='mb-4'>
                                        <h3 className='mb-3 h6 text-uppercase text-black d-block'>Filter by Price</h3>
                                        <div id='slider-range' className='border-primary'></div>
                                        <input type='text' name='text' id='amount' className='form-control border-0 pl-0 bg-white' disabled='' />
                                    </div>

                                    <div className='mb-4'>
                                        <h3 className='mb-3 h6 text-uppercase text-black d-block'>Size</h3>
                                        <label htmlFor='s_sm' className='d-flex'>
                                            <input type='checkbox' id='s_sm' className='mr-2 mt-1' /> <span className='text-black'>Small (2,319)</span>
                                        </label>
                                        <label htmlFor='s_md' className='d-flex'>
                                            <input type='checkbox' id='s_md' className='mr-2 mt-1' /> <span className='text-black'>Medium (1,282)</span>
                                        </label>
                                        <label htmlFor='s_lg' className='d-flex'>
                                            <input type='checkbox' id='s_lg' className='mr-2 mt-1' /> <span className='text-black'>Large (1,392)</span>
                                        </label>
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