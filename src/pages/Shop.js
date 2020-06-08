/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'

import SiteWrap from '../components/SiteWrap'
import ShopProduct from '../components/ShopProduct'
import Loading from '../components/Loading'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'
import { Link } from 'react-router-dom'

class Shop extends React.Component {

    state = {
        categories: [],
        products: [],
        productsLength: 0,
        fetching: true
    }

    siteRef = React.createRef()

    fetchProducts = () => {
        const url = `${process.env.REACT_APP_API_URL}/products-filter${this.props.location.search}&quantity=18`

        return axios.get(url).then(({ data }) => data)
    }

    scrollToTop = () => window.scrollTo({ behavior: 'smooth', top: this.siteRef?.current?.offsetTop })

    getProductsLength = () => {
        const url = `${process.env.REACT_APP_API_URL}/products-length${this.props.location.search}`

        return axios.get(url).then(({ data: productsLength }) => productsLength)
    }

    getCategories = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/categories`).then(({ data }) => data)
    )

    refresh = () => {
        this.setState({ fetching: true }, () => {
            Promise.all([this.fetchProducts(), this.getProductsLength()]).then((vals) => {
                this.setState({ products: vals[0], productsLength: vals[1], fetching: false })
                this.scrollToTop()
            })
        })
    }

    onFilterLinkClick = (location, filter, filterValue, isBrand) => {
        if (location.search.includes(filter)) {
            const search = location.search.split('&').map((currentFilter, index) => {
                currentFilter = currentFilter.split('%20').join(' ')
                if (currentFilter.includes(filter)) {
                    if (isBrand) {
                        if (currentFilter.includes(filterValue)) {
                            return currentFilter.split(`,${filterValue}`).join('').split(`${filterValue}`).join('')
                        } else {
                            return `${currentFilter},${filterValue}`
                        }
                    }
                    return `${filter}=${filterValue}`
                } else {
                    return currentFilter
                }
            }).join('&')

            if (search.endsWith('brands=') || search.includes('brands=&')) {
                return `${location.pathname}${search.replace('&brands=', '')}`
            }
            return `${location.pathname}${search}`
        } else {
            return `${location.pathname}${location.search}&${filter}=${filterValue}`
        }
    }

    UNSAFE_componentWillMount() {
        Promise.all([this.getCategories(), this.getProductsLength(), this.fetchProducts()]).then((vals) => {
            this.setState({
                categories: vals[0],
                productsLength: vals[1],
                products: vals[2],
                fetching: false
            })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.refresh()
        }
    }

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
                                            <div className='btn-group mr-1 ml-md-auto'>
                                                <button type='button' className='btn btn-white btn-sm dropdown-toggle px-4' id='dropdownMenuReference' data-toggle='dropdown'>Sırala</button>
                                                <div className='dropdown-menu' aria-labelledby='dropdownMenuReference'>
                                                    {
                                                        /*
                                                            <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => this.onSortTypeClick(0)}>Akıllı Sıralama</span>
                                                            <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => this.onSortTypeClick(1)}>Çok Satanlar</span>
                                                            <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => this.onSortTypeClick(2)}>En Yeniler</span>
                                                            <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => this.onSortTypeClick(5)}>En Yüksek Puan</span>
                                                            <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => this.onSortTypeClick(6)}>En Çok Yorumlanan</span>
                                                            <div className='dropdown-divider' />
                                                        */
                                                    }
                                                    <Link className='dropdown-item' style={{ cursor: 'pointer' }} to={(location) => (
                                                        this.onFilterLinkClick(location, 'sortType', 3)
                                                    )}>En Düşük Fiyat</Link>

                                                    <Link className='dropdown-item' style={{ cursor: 'pointer' }} to={(location) => (
                                                        this.onFilterLinkClick(location, 'sortType', 4)
                                                    )}>En Yüksek Fiyat</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-5'>
                                    {
                                        this.state.products.map((product) => (
                                            <ShopProduct key={product._id} item={product} />
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
                                                        >
                                                            <Link
                                                                className='text-black'
                                                                to={(location) => (
                                                                    this.onFilterLinkClick(location, 'start', index * 18)
                                                                )}>
                                                                {index + 1}
                                                            </Link>
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
                                            (subCategory?.brands ?? currentCategory?.brands).map((brand, index) => (
                                                <label htmlFor={brand._id} className='d-flex align-items-center justify-content-start' style={{ cursor: 'pointer' }}>
                                                    <input
                                                        type='checkbox'
                                                        id={brand._id}
                                                        brand={brand.name}
                                                        className='mr-2 mt-1'
                                                        style={{ cursor: 'pointer' }}
                                                        onChange={this.onBrandSelectionChange}
                                                        checked={this.props.location.search.split('%20').join(' ').includes(brand.name)} />
                                                    <Link
                                                        className='text-black'
                                                        to={(location) => (
                                                            this.onFilterLinkClick(location, 'brands', brand.name, true)
                                                        )}>
                                                        {`${brand.name} (${brand.productQuantity})`}
                                                    </Link>
                                                </label>
                                            ))
                                        }
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