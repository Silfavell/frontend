/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

import SiteWrap from '../components/SiteWrap'
import ShopProduct from '../components/ShopProduct'
import Loading from '../components/Loading'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'
import './Shop.css'

const maximumProductLengthInOnePage = 6 * 3
const maximumPageCount = 5

const cookies = new Cookies()

class Shop extends React.Component {

    state = {
        categories: [],
        products: [],
        productsLength: 0,
        fetching: true
    }


    fetchProducts = () => {
        const url = `${process.env.REACT_APP_API_URL}/products-filter${this.props.location.search}&quantity=${maximumProductLengthInOnePage}`

        return axios.get(url).then(({ data }) => data)
    }

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

    getStartingIndex = () => {
        const foundFilter = this.props.location.search.split('&').find((currentFilter, index) => {
            currentFilter = currentFilter.split('%20').join(' ')
            if (currentFilter.includes('start')) {
                return true
            }
            return false
        })

        return foundFilter ? parseInt(foundFilter.split('=')[1]) : 0
    }

    onPageGtClick = () => {
        const startingIndex = this.getStartingIndex()
        const startingIndexOfPage = startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount))

        if ((this.state.productsLength - startingIndexOfPage) > maximumProductLengthInOnePage * maximumPageCount) {
            this.props.history.push(
                this.onFilterLinkClick(
                    this.props.location,
                    'start',
                    startingIndex +
                    (maximumProductLengthInOnePage * maximumPageCount) -
                    ((startingIndex + maximumProductLengthInOnePage * maximumPageCount) % (maximumProductLengthInOnePage * maximumPageCount)))
            )
        } else {
            this.props.history.push(
                this.onFilterLinkClick(
                    this.props.location,
                    'start',
                    this.state.productsLength % maximumProductLengthInOnePage === 0 ? this.state.productsLength - maximumProductLengthInOnePage : this.state.productsLength - 1)
            )
        }
    }

    onPageLtClick = () => {
        const startingIndex = this.getStartingIndex()
        const startingIndexOfPage = startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount))

        if (startingIndexOfPage >= maximumProductLengthInOnePage * maximumPageCount) {
            this.props.history.push(
                this.onFilterLinkClick(
                    this.props.location,
                    'start',
                    startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount) + maximumProductLengthInOnePage)))
        } else {
            this.props.history.push(this.onFilterLinkClick(this.props.location, 'start', 0))
        }
    }

    getPageText = (index) => {
        return (index + 1) + (Math.floor((this.getStartingIndex() + 1) / (maximumProductLengthInOnePage * maximumPageCount))) * maximumPageCount
    }

    isPageActive = (index) => {
        const startingIndex = this.getStartingIndex()

        return (
            index + (Math.floor((startingIndex + 1) / (maximumProductLengthInOnePage * maximumPageCount))) * maximumPageCount
            ===
            Math.floor((startingIndex - (startingIndex % maximumProductLengthInOnePage)) / maximumProductLengthInOnePage)
        )
    }

    getPageList = () => {
        const startingIndex = this.getStartingIndex()
        const startingIndexOfPage = startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount))

        return new Array(
            Math.ceil((this.state.productsLength - startingIndexOfPage) / maximumProductLengthInOnePage) >= maximumPageCount ?
                maximumPageCount :
                Math.ceil((this.state.productsLength - startingIndexOfPage) / maximumProductLengthInOnePage)
        )
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

    renderShopContent = ({ onIncreaseClick, currentCategory, subCategory }) => {
        const favoriteProducts = localStorage.getItem('favoriteProducts') ? JSON.parse(localStorage.getItem('favoriteProducts')) : []
        const loggedIn = cookies.get('token')

        return (
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
                                    <ShopProduct
                                        key={product._id}
                                        item={product}
                                        onIncreaseClick={onIncreaseClick}
                                        loggedIn={loggedIn}
                                        favorite={favoriteProducts.includes(product._id)}
                                    />
                                ))
                            }
                        </div>
                        <div className='row'>
                            <div className='col-md-12 text-center'>
                                <div className='site-block-27'>
                                    <ul>
                                        <li style={{ marginLeft: 5, cursor: 'pointer' }} onClick={this.onPageLtClick}><span>&lt;</span></li>
                                        {
                                            // pages
                                            Array.from(this.getPageList()).map((_, index) => (
                                                <li
                                                    key={'page' + index}
                                                    style={{ marginLeft: 5, cursor: 'pointer' }}
                                                    className={this.isPageActive(index) ? 'active' : ''}
                                                >
                                                    <Link
                                                        className='text-black'
                                                        to={(location) => (
                                                            this.onFilterLinkClick(location, 'start', (this.getPageText(index) - 1) * maximumProductLengthInOnePage)
                                                        )}>
                                                        {this.getPageText(index)}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                        <li style={{ marginLeft: 5, cursor: 'pointer' }} onClick={this.onPageGtClick}><span>&gt;</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 order mb-5 mb-md-0'>

                        <div className='border p-4 rounded mb-4 related-categories'>
                            <h3 className='mb-3 h6 text-capitalize text-black d-block'>İlgili Kategoriler</h3>
                            <ul className='list-unstyled mb-0'>
                                {
                                    currentCategory?.subCategories.map((category) => (
                                        <li className='mb-1' key={category._id}>
                                            <a className='d-flex text-primary'
                                                href={`/shop?categoryId=${this.state.products[0]?.categoryId}&subCategoryId=${category._id}`}>{category.name}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className='border p-4 rounded mb-4 brands'>
                            <div className='mb-4'>
                                <h3 className='mb-3 h6 text-capitalize text-black d-block'>Markalar</h3>
                                {
                                    (subCategory?.brands ?? currentCategory?.brands).map((brand, index) => (
                                        <label
                                            key={brand._id}
                                            htmlFor={brand._id}
                                            className='d-flex align-items-center justify-content-start'
                                            style={{ cursor: 'pointer' }}>
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
        )
    }

    render() {
        const currentCategory = this.state.categories.find(category => category._id === this.state.products[0]?.categoryId)
        const subCategory = this.props.location.search.includes('subCategoryId') ? currentCategory?.subCategories.find((subCategory) => subCategory._id === this.state.products[0].subCategoryId) : null

        let divider = []

        if (subCategory) {
            divider = [
                {
                    path: `shop?categoryId=${currentCategory?._id}`,
                    title: currentCategory?.name
                },
                {
                    path: null,
                    title: subCategory.name
                }
            ]
        } else {
            divider = [
                {
                    path: null,
                    title: currentCategory?.name
                }
            ]
        }


        if (this.state.fetching || !currentCategory) {
            return (
                <Loading />
            )
        } else {
            return (
                <SiteWrap divider={divider}>
                    <this.renderShopContent currentCategory={currentCategory} subCategory={subCategory} />
                </SiteWrap>
            )
        }
    }
}

export default Shop