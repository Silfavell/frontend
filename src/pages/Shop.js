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
        page: 0,
        fetching: true
    }

    onCategoryClick = (categoryId) => {
        this.setState({ fetching: true })
        axios.get(`${process.env.REACT_APP_API_URL}/products-by-range?categoryId=${categoryId}&start=${this.state.page * 10}&quantity=10`).then(({ data }) => {
            this.setState({ products: data, fetching: false })
        })
    }

    onPageClick = (page) => {
        this.setState({ page })
    }

    UNSAFE_componentWillMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/categories`).then(({ data }) => {
            this.setState({ categories: data })

            axios.get(`${process.env.REACT_APP_API_URL}/products-by-range?categoryId=${data[0]._id}&start=0&quantity=10`).then(({ data }) => {
                this.setState({ products: data, fetching: false })
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
                <SiteWrap divider firstImage>
                    <div class='container'>
                        <div class='row mb-5'>
                            <div class='col-md-9 order-1'>
                                <div class='row align'>
                                    <div class='col-md-12 mb-5'>
                                        <div class='float-md-left'><h2 class='text-black h5'>Shop All</h2></div>
                                        <div class='d-flex'>
                                            <div class='dropdown mr-1 ml-md-auto'>
                                                <button type='button' class='btn btn-white btn-sm dropdown-toggle px-4' id='dropdownMenuOffset' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                                    Latest
                                                    </button>
                                                <div class='dropdown-menu' aria-labelledby='dropdownMenuOffset'>
                                                    <a class='dropdown-item' href='#'>Men</a>
                                                    <a class='dropdown-item' href='#'>Women</a>
                                                    <a class='dropdown-item' href='#'>Children</a>
                                                </div>
                                            </div>
                                            <div class='btn-group'>
                                                <button type='button' class='btn btn-white btn-sm dropdown-toggle px-4' id='dropdownMenuReference' data-toggle='dropdown'>Reference</button>
                                                <div class='dropdown-menu' aria-labelledby='dropdownMenuReference'>
                                                    <a class='dropdown-item' href='#'>Relevance</a>
                                                    <a class='dropdown-item' href='#'>Name, A to Z</a>
                                                    <a class='dropdown-item' href='#'>Name, Z to A</a>
                                                    <div class='dropdown-divider'></div>
                                                    <a class='dropdown-item' href='#'>Price, low to high</a>
                                                    <a class='dropdown-item' href='#'>Price, high to low</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='row mb-5'>
                                    {
                                        this.state.products.map((product) => (
                                            <ShopProduct item={JSON.parse(product)} />
                                        ))
                                    }
                                </div>
                                <div class='row'>
                                    <div class='col-md-12 text-center'>
                                        <div class='site-block-27'>
                                            <ul>
                                                <li style={{ marginLeft: 5, cursor: 'pointer' }}><span>&lt;</span></li>
                                                {
                                                    // pages
                                                    [1, 2, 3, 4, 5].map((page) => (
                                                        <li
                                                            style={{ marginLeft: 5, cursor: 'pointer' }}
                                                            class={page === this.state.page ? 'active' : ''}
                                                            onClick={() => this.onPageClick(page)}
                                                        >

                                                            <span>{page}</span>

                                                        </li>
                                                    ))
                                                }
                                                <li style={{ marginLeft: 5, cursor: 'pointer' }}><span>&gt;</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class='col-md-3 order-2 mb-5 mb-md-0'>
                                <div class='border p-4 rounded mb-4'>
                                    <h3 class='mb-3 h6 text-uppercase text-black d-block'>Categories</h3>
                                    <ul class='list-unstyled mb-0'>
                                        {
                                            this.state.categories.map((category) => (
                                                <li class='mb-1'>
                                                    <span class='d-flex text-primary' style={{ cursor: 'pointer' }} onClick={() => this.onCategoryClick(category._id)}>
                                                        <span>{category.name}</span> <span class='text-black ml-auto'>(2,220)</span>
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>

                                <div class='border p-4 rounded mb-4'>
                                    <div class='mb-4'>
                                        <h3 class='mb-3 h6 text-uppercase text-black d-block'>Filter by Price</h3>
                                        <div id='slider-range' class='border-primary'></div>
                                        <input type='text' name='text' id='amount' class='form-control border-0 pl-0 bg-white' disabled='' />
                                    </div>

                                    <div class='mb-4'>
                                        <h3 class='mb-3 h6 text-uppercase text-black d-block'>Size</h3>
                                        <label for='s_sm' class='d-flex'>
                                            <input type='checkbox' id='s_sm' class='mr-2 mt-1' /> <span class='text-black'>Small (2,319)</span>
                                        </label>
                                        <label for='s_md' class='d-flex'>
                                            <input type='checkbox' id='s_md' class='mr-2 mt-1' /> <span class='text-black'>Medium (1,282)</span>
                                        </label>
                                        <label for='s_lg' class='d-flex'>
                                            <input type='checkbox' id='s_lg' class='mr-2 mt-1' /> <span class='text-black'>Large (1,392)</span>
                                        </label>
                                    </div>

                                    <div class='mb-4'>
                                        <h3 class='mb-3 h6 text-uppercase text-black d-block'>Color</h3>
                                        <a href='#' class='d-flex color-item align-items-center' >
                                            <span class='bg-danger color d-inline-block rounded-circle mr-2'></span> <span class='text-black'>Red (2,429)</span>
                                        </a>
                                        <a href='#' class='d-flex color-item align-items-center' >
                                            <span class='bg-success color d-inline-block rounded-circle mr-2'></span> <span class='text-black'>Green (2,298)</span>
                                        </a>
                                        <a href='#' class='d-flex color-item align-items-center' >
                                            <span class='bg-info color d-inline-block rounded-circle mr-2'></span> <span class='text-black'>Blue (1,075)</span>
                                        </a>
                                        <a href='#' class='d-flex color-item align-items-center' >
                                            <span class='bg-primary color d-inline-block rounded-circle mr-2'></span> <span class='text-black'>Purple (1,075)</span>
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