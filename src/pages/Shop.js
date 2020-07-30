/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
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
        shop: {},
        productsLength: 0,
        fetching: true
    }


    filterShop = () => {
        const url = `${
            process.env.REACT_APP_API_URL}/filter-shop${
            this.props.location.pathname.replace('/shop', '')}${
            this.props.location.search}${
            this.props.location.search.startsWith('?') ? '&' : '?'}quantity=${
            maximumProductLengthInOnePage}`

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
            Promise.all([this.filterShop(), this.getProductsLength()]).then((vals) => {
                this.setState({ shop: vals[0], productsLength: vals[1], fetching: false })
            })
        })
    }

    onFilterLinkClick = (filter, filterValue, multiple) => {
        const { location } = this.props

        if (location.search.includes(filter)) {
            const search = location.search.split('&').map((currentFilter, index) => {
                currentFilter = currentFilter.split('%20').join(' ')
                if (currentFilter.includes(filter)) {
                    if (multiple) {
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

            if (multiple) {
                if (search.endsWith(`${filter}=`) || search.includes(`${filter}&`)) {
                    return `${location.pathname}${search.replace(`&${filter}=`, '').replace(`?${filter}=`, '')}`
                }
            }

            return `${location.pathname}${search}`
        } else {
            if (location.search.startsWith('?')) {
                return `${location.pathname}${location.search}&${filter}=${filterValue}`
            } else {
                return `${location.pathname}${location.search}?${filter}=${filterValue}`
            }
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

        if ((this.state.shop.productsLength - startingIndexOfPage) > maximumProductLengthInOnePage * maximumPageCount) {
            return this.onFilterLinkClick(
                'start',
                startingIndex +
                (maximumProductLengthInOnePage * maximumPageCount) -
                ((startingIndex + maximumProductLengthInOnePage * maximumPageCount) % (maximumProductLengthInOnePage * maximumPageCount)))
        } else {
            return this.onFilterLinkClick(
                'start',
                this.state.shop.productsLength % maximumProductLengthInOnePage === 0 ? this.state.shop.productsLength - maximumProductLengthInOnePage : this.state.shop.productsLength - 1)
        }
    }

    onPageLtClick = () => {
        const startingIndex = this.getStartingIndex()
        const startingIndexOfPage = startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount))

        if (startingIndexOfPage >= maximumProductLengthInOnePage * maximumPageCount) {
            return this.onFilterLinkClick(
                'start',
                startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount) + maximumProductLengthInOnePage))
        } else {
            return this.onFilterLinkClick('start', 0)
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
            Math.ceil((this.state.shop.productsLength - startingIndexOfPage) / maximumProductLengthInOnePage) >= maximumPageCount ?
                maximumPageCount :
                Math.ceil((this.state.shop.productsLength - startingIndexOfPage) / maximumProductLengthInOnePage)
        )
    }

    UNSAFE_componentWillMount() {
        Promise.all([this.getCategories(), this.getProductsLength(), this.filterShop()]).then((vals) => {
            this.setState({
                categories: vals[0],
                productsLength: vals[1],
                shop: vals[2],
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
                            <div className='col-md-12 mb-4'>
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
                                            <a className='dropdown-item' style={{ cursor: 'pointer' }} href={this.onFilterLinkClick('sortType', 3)}>En Düşük Fiyat</a>

                                            <a className='dropdown-item' style={{ cursor: 'pointer' }} href={this.onFilterLinkClick('sortType', 4)}>En Yüksek Fiyat</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-5'>
                            {
                                this.state.shop.products.map((product) => (
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
                                        <li>
                                            <a href={this.onPageLtClick()} style={{ marginLeft: 5, cursor: 'pointer', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <IoIosArrowBack color={'#707070'} />
                                            </a>
                                        </li>
                                        {
                                            // pages
                                            Array.from(this.getPageList()).map((_, index) => (
                                                <li
                                                    key={'page' + index}
                                                    style={{ marginLeft: 5, cursor: 'pointer' }}
                                                    className={this.isPageActive(index) ? 'active' : ''}
                                                >
                                                    <a
                                                        className='text-black'
                                                        href={this.onFilterLinkClick('start', (this.getPageText(index) - 1) * maximumProductLengthInOnePage)}>
                                                        {this.getPageText(index)}
                                                    </a>
                                                </li>
                                            ))
                                        }
                                        <li>
                                            <a href={this.onPageGtClick()} style={{ marginLeft: 5, cursor: 'pointer', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <IoIosArrowForward color={'#707070'} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 order mb-5 mb-md-0'>

                        {
                            /*
                                <div className='border p-4 rounded mb-4 related-categories'>
                                    <h3 className='h6 text-capitalize text-black d-block'>İlgili Kategoriler</h3>
                                    <ul className='list-unstyled mb-0'>
                                        {
                                            currentCategory?.subCategories.map((subCategory) => (
                                                <li className='mb-1' key={subCategory._id}>
                                                    <a className='d-flex text-primary'
                                                        href={`/shop/${currentCategory.slug}/${subCategory.slug}`}>{subCategory.name}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            */
                        }

                        <div className='card mb-3'>
                            <div className='card-header p-0 bg-white' id={`heading${'brands'}`}>
                                <h5 className='mb-0'>
                                    <button
                                        className='btn btn-link w-100 mx-3'
                                        style={{ textAlign: 'left', color: 'black', textDecoration: 'none' }}
                                        data-toggle='collapse'
                                        data-target={`#collapse${'brands'}`}
                                        aria-expanded='true'
                                        aria-controls={`collapse${'brands'}`}>
                                        {'Markalar'}
                                    </button>
                                </h5>
                            </div>

                            <div id={`collapse${'brands'}`} className={'collapse show'} aria-labelledby={`heading${'brands'}`}>
                                <div className='card-body'>
                                    {
                                        (subCategory?.brands ?? currentCategory?.brands).map((brand, index) => (
                                            <a
                                                className='d-flex align-items-center justify-content-start'
                                                href={this.onFilterLinkClick('brands', brand.name, true)}
                                                key={brand._id}
                                                htmlFor={brand._id}
                                                style={{ cursor: 'pointer' }}>
                                                <input
                                                    type='checkbox'
                                                    id={brand._id}
                                                    brand={brand.name}
                                                    className='mr-2 mt-1'
                                                    style={{ cursor: 'pointer', width: 18, height: 18, pointerEvents: 'none' }}
                                                    checked={this.props.location.search.split('%20').join(' ').includes(brand.name)} />
                                                <span className='text-black'>
                                                    {`${brand.name} (${brand.productQuantity})`}
                                                </span>
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {
                            this.state.shop.specifications.map((specification, index) => (
                                <div className='card mb-3'>
                                    <div className='card-header p-0 bg-white' id={`heading${index}`}>
                                        <h5 className='mb-0'>
                                            <button
                                                className='btn btn-link w-100 mx-3'
                                                style={{ textAlign: 'left', color: 'black', textDecoration: 'none' }}
                                                data-toggle='collapse'
                                                data-target={`#collapse${index}`}
                                                aria-expanded='false'
                                                aria-controls={`collapse${index}`}>
                                                {specification.name}
                                            </button>
                                        </h5>
                                    </div>

                                    <div
                                        id={`collapse${index}`}
                                        className={`collapse ${this.props.location.search.includes(specification.slug) ? 'show' : ''}`}
                                        aria-labelledby={`heading${index}`}>
                                        <div className='card-body'>
                                            {
                                                specification.values.map((specificationValue, index) => (
                                                    <a
                                                        className='d-flex align-items-center justify-content-start'
                                                        href={this.onFilterLinkClick(specification.slug, specificationValue.value, true)}
                                                        key={specificationValue.slug}
                                                        htmlFor={specificationValue.slug}
                                                        style={{ cursor: 'pointer' }}>
                                                        <input
                                                            type='checkbox'
                                                            id={specificationValue.slug}
                                                            className='mr-2 mt-1'
                                                            style={{ cursor: 'pointer', width: 18, height: 18, pointerEvents: 'none' }}
                                                            checked={this.props.location.search.split('%20').join(' ').includes(specificationValue.value)}
                                                        />
                                                        <span className='text-black'>
                                                            {`${specificationValue.value} (${specificationValue.count})`}
                                                        </span>
                                                    </a>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const currentCategory = this.state.categories.find(category => category._id === this.state.shop.products[0]?.categoryId)
        const subCategory = [...this.props.location.pathname].filter(letter => letter === '/').length > 2 ? currentCategory?.subCategories.find((subCategory) => subCategory._id === this.state.shop.products[0].subCategoryId) : null

        let divider = []

        if (subCategory) {
            divider = [
                {
                    path: `shop/${currentCategory?.slug}`,
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