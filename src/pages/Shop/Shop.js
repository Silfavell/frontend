/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import Cookies from 'universal-cookie'
import { Helmet } from 'react-helmet'

import SiteWrap from '../../components/SiteWrap/SiteWrap'
import ShopProduct from '../../components/Product/ShopProduct'
import Loading from '../../components/Loading/Loading'
import Slider from './Slider'
import Specifications from './Specifications'

import { getCategories, makeCustomRequest } from '../../scripts/requests'
import {
    getPageText,
    isPageActive,
    maximumProductLengthInOnePage,
    onPageGtClick,
    onPageLtClick,
    onFilterLinkClick,
    getPageList
} from './scripts'

import './Shop.css'

const cookies = new Cookies()

class Shop extends React.Component {
    state = {
        categories: [],
        shop: {},
        fetching: true
    }

    filterShop = async () => {
        const url = `${process.env.REACT_APP_API_URL}/filter-shop${this.props.location.pathname.replace('/shop', '')}${this.props.location.search}${this.props.location.search.startsWith('?') ? '&' : '?'}quantity=${maximumProductLengthInOnePage}`
        const { data } = await makeCustomRequest({ url })

        return data
    }

    getCategories = async () => {
        const { data } = await getCategories()

        return data
    }

    refresh = () => {
        this.setState({ fetching: true }, async () => {
            const shop = await this.filterShop()

            this.setState({ shop, fetching: false })
        })
    }

    async componentDidMount() {
        const [categories, shop] = await Promise.all([this.getCategories(), this.filterShop()])

        this.setState({
            categories,
            shop,
            fetching: false
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
        this.props.location.search = decodeURIComponent(this.props.location.search)

        const s = new URLSearchParams(this.props.location.search)
        let type = s.get('type')
        let isFilterExists = false
        let clearFilterUrl

        if (type) {
            if (s.toString().includes('&')) {
                isFilterExists = true
                clearFilterUrl = `${this.props.location.pathname}?type=${type}`
            }
        } else {
            if (s.toString().includes('=')) {
                isFilterExists = true
                clearFilterUrl = this.props.location.pathname
            }
        }

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
                                                    <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => this.onSortTypeClick(5)}>En Yüksek Puan</span>
                                                    <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => this.onSortTypeClick(6)}>En Çok Yorumlanan</span>
                                                    <div className='dropdown-divider' />
                                                */
                                            }
                                            <a
                                                className='dropdown-item'
                                                href={onFilterLinkClick({
                                                    filter: 'sortType',
                                                    filterValue: 0,
                                                    location: this.props.location
                                                })}>Akıllı Sıralama</a>

                                            <a
                                                className='dropdown-item'
                                                href={onFilterLinkClick({
                                                    filter: 'sortType',
                                                    filterValue: 1,
                                                    location: this.props.location
                                                })}>Çok Satanlar</a>

                                            <a
                                                className='dropdown-item'
                                                href={onFilterLinkClick({
                                                    filter: 'sortType',
                                                    filterValue: 2,
                                                    location: this.props.location
                                                })}>En Yeniler</a>

                                            <a
                                                className='dropdown-item'
                                                href={onFilterLinkClick({
                                                    filter: 'sortType',
                                                    filterValue: 3,
                                                    location: this.props.location
                                                })}>En Düşük Fiyat</a>

                                            <a
                                                className='dropdown-item'
                                                href={onFilterLinkClick({
                                                    filter: 'sortType',
                                                    filterValue: 4,
                                                    location: this.props.location
                                                })}>En Yüksek Fiyat</a>
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
                                            <a
                                                href={onPageLtClick({ location: this.props.location })}
                                                style={{ marginLeft: 5, cursor: 'pointer', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <IoIosArrowBack color={'#707070'} />
                                            </a>
                                        </li>
                                        {
                                            // pages
                                            Array.from(getPageList({ shop: this.state.shop, location: this.props.location })).map((_, index) => (
                                                <li
                                                    key={'page' + index}
                                                    style={{ marginLeft: 5, cursor: 'pointer' }}
                                                    className={isPageActive({ index, location: this.props.location }) ? 'active' : ''}
                                                >
                                                    <a
                                                        className='text-black'
                                                        href={
                                                            onFilterLinkClick({
                                                                filter: 'start',
                                                                filterValue: (getPageText({
                                                                    index,
                                                                    location: this.props.location
                                                                }) - 1) * maximumProductLengthInOnePage,
                                                                keep: true,
                                                                location: this.props.location
                                                            })
                                                        }>
                                                        {getPageText({
                                                            index,
                                                            location: this.props.location
                                                        })}
                                                    </a>
                                                </li>
                                            ))
                                        }
                                        <li>
                                            <a
                                                href={onPageGtClick({
                                                    shop: this.state.shop,
                                                    location: this.props.location
                                                })}
                                                style={{ marginLeft: 5, cursor: 'pointer', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                        {
                            isFilterExists && (
                                <a href={clearFilterUrl} className='mb-3 d-flex align-items-end justify-content-end p-2 border' style={{ borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0' }}>
                                    Filtreleri Temizle
                                </a>
                            )
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
                                        this.state.shop.brands.map((brand, index) => (
                                            <a
                                                className='d-flex align-items-center justify-content-start'
                                                href={onFilterLinkClick({
                                                    filter: 'brands',
                                                    filterValue: brand.name,
                                                    multiple: true,
                                                    location: this.props.location
                                                })}
                                                key={brand._id}
                                                htmlFor={brand._id}
                                                style={{ cursor: 'pointer' }}>

                                                <input
                                                    type='checkbox'
                                                    id={brand._id}
                                                    brand={brand.name}
                                                    className='mr-2 mt-1'
                                                    style={{ cursor: 'pointer', width: 18, height: 18, pointerEvents: 'none' }}
                                                    checked={this.props.location.search.includes(`brands=${brand.name.split(' ').join('+')}`)} />

                                                <span className='text-black'>
                                                    {`${brand.name} (${brand.count})`}
                                                </span>
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <Specifications
                            location={this.props.location}
                            shop={this.state.shop}
                        />

                        {
                            this.state.shop.maxPrice !== this.state.shop.minPrice && (
                                <Slider
                                    max={this.state.shop.maxPrice}
                                    min={this.state.shop.minPrice}
                                    location={this.props.location}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    nonProducts = () => (
        <div className='container d-flex align-items-center justify-content-center flex-column' style={{ height: 300 }}>
            <h2 className={'text-black'} style={{ textAlign: 'center' }}>Ürün bulunmamaktadır</h2>
            <p className={'text-black'} style={{ fontSize: 18, marginTop: 32, textAlign: 'center' }}>Seçtiğiniz filtrelere uygun ürün bulunmamaktadır</p>
        </div>
    )

    render() {
        const currentCategory = this.state.categories.find(category => category._id === this.state.shop._id)
        const subCategory = [...this.props.location.pathname].filter(letter => letter === '/').length > 2 ? currentCategory?.subCategories.find((subCategory) => subCategory._id === this.state.shop.subCategoryId) : null

        let divider = []

        if (subCategory) {
            divider = [
                {
                    path: `/shop/${currentCategory?.slug}`,
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

        if (this.state.fetching) {
            return (
                <Loading />
            )
        } else if (!this.state.fetching && !currentCategory) {
            return (
                <SiteWrap>
                    <this.nonProducts />
                </SiteWrap>
            )
        } else {
            return (
                <SiteWrap divider={divider}>
                    <Helmet>
                        <title>{`${(subCategory ?? currentCategory)?.name} | Silfavell`}</title>
                        <meta name='description' content={`${(subCategory ?? currentCategory)?.name}`} data-react-helmet='true' />
                    </Helmet>
                    <this.renderShopContent />
                </SiteWrap>
            )
        }
    }
}

export default Shop