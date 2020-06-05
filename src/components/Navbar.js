/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import { IoMdPerson, IoIosBasket, IoMdMenu, IoIosSearch, IoMdClose } from 'react-icons/io'
import Cookies from 'universal-cookie'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'
import './custom.css'

import SearchProduct from './SearchProduct'

const cookies = new Cookies()

class Navbar extends React.Component {

    state = {
        loggedIn: cookies.get('token'),
        productsLength: 0,
        categories: [],
        searchText: '',
        searchedProducts: []
    }

    UNSAFE_componentWillMount() {
        if (cookies.get('token')) {
            Promise.all([this.getCategories(), this.getCartProductsLength()]).then((vals) => {
                this.setState({ categories: vals[0], productsLength: vals[1] ?? 0 })
            }).catch((err) => {
                console.log(err.response)
            })
        } else {
            this.getCategories().then((categories) => {
                const cart = window.localStorage.getItem('cart')
                if (cart) {
                    this.setState({ categories, productsLength: JSON.parse(cart).length })
                } else {
                    this.setState({ categories, productsLength: 0 })
                }
            }).catch((err) => {
                console.log(err.response)
            })
        }
    }

    search = () => {
        const url = `${process.env.REACT_APP_API_URL}/products-filter?productIds=${[
            '5ed559e1d464530b18e37405', '5ed4ffae10bad04b78d3c758', '5ed55ad5d464530b18e3741f', '5ed55affd464530b18e37421'
        ].join(',')}&quantity=32`
        axios.get(url).then(({ data }) => {
            this.setState({ searchedProducts: data })
        })
    }

    getCartProductsLength = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/user/cart`).then(({ data }) => (
            (data && data.cart) ? Object.values(data.cart).length : 0
        ))
    )

    getCategories = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/categories`).then(({ data }) => data)
    )

    onLogoutClick = () => {
        cookies.remove('token')
        cookies.remove('user')
        this.setState({
            loggedIn: false
        })
    }

    renderPersonMenu = () => {
        if (this.state.loggedIn) {
            return (
                <ul className='dropdown' style={{ left: '-200%', zIndex: 9999 }}>
                    <li><a href='/edit-profile'>Profilimi Düzenle</a></li>
                    <li><a href='/update-password'>Şifremi değiştir</a></li>
                    <li><div onClick={this.onLogoutClick}>Çıkış Yap</div></li>
                    {
                        /*
                            <li className='has-children'>
                                <a href='#'>Sub Menu</a>
                                <ul className='dropdown'>
                                    <li><a href='#'>Menu One</a></li>
                                    <li><a href='#'>Menu Two</a></li>
                                    <li><a href='#'>Menu Three</a></li>
                                </ul>
                            </li>
                        */
                    }
                </ul>
            )
        } else {
            return (
                <ul className='dropdown'>
                    <li><a href='/sign-in'>Giriş yap</a></li>
                    <li><a href='/sign-up'>Üye Ol</a></li>
                </ul>
            )
        }
    }

    onMenuClick = () => {
        this.props.changeMobileMenuStatus(true)
    }

    onSearchTextChange = (event) => {
        this.setState({ searchText: event.target.value })
    }

    onSearchClearClick = () => {
        this.setState({
            searchText: '',
            searchedProducts: []
        })
    }

    render() {
        return (
            <>
                <div class='site-mobile-menu'>
                    <div class='site-mobile-menu-body'>
                        <ul class='site-nav-wrap'>
                            {
                                this.state.categories.map((category) => (
                                    <li className={'has-children'}>
                                        {
                                            category.subCategories.length > 0 &&
                                            <span class='arrow-collapse collapsed' data-toggle='collapse' data-target={`#collapseItem${category._id}`} />
                                        }
                                        <a href={`/shop?categoryId=${category._id}`}>{category.name}</a>
                                        <ul className='collapse' id={`collapseItem${category._id}`}>
                                            {
                                                category.subCategories.map((subCategory) => (
                                                    <li>
                                                        <a href={`/shop?categoryId=${category._id}&subCategoryId=${subCategory._id}`}>{subCategory.name}</a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className={`site-navbar bg-white py-2 ${!this.props.firstImage ? 'custom-border-bottom' : ''}`}>

                    <div className='container-fluid'>
                        <div className='align-items-center justify-content-between d-flex direction-row'>
                            <div className='logo flex-grow-1 d-flex align-items-center justify-content-center'>
                                <a href='/' className='js-logo-clone'>
                                    <img src={process.env.PUBLIC_URL + '/logo.png'} style={{ height: 80 }} />
                                </a>
                            </div>
                            <div style={{ position: 'relative', flexGrow: 2 }}>
                                <div class='input-group' style={{ border: '1px solid #E83E8C' }}>
                                    <input
                                        type='text'
                                        class='form-control border-0'
                                        placeholder='Search'
                                        onChange={this.onSearchTextChange}
                                        value={this.state.searchText} />

                                    <div class='input-group-append'>
                                        <button class='btn' type='button'>
                                            {
                                                (this.state.searchText.length > 0 && this.state.searchedProducts.length > 0) && (
                                                    <IoMdClose color={'#8C92A0'} size={26} onClick={this.onSearchClearClick} />
                                                )
                                            }
                                            <IoIosSearch color={'#8C92A0'} size={26} onClick={this.search} />
                                        </button>
                                    </div>
                                </div>
                                <div className={`search-results ${this.state.searchedProducts.length > 0 ? 'active-search' : ''}`}>
                                    <div style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                                        <div className='col-md-12'>
                                            <div className='row'>
                                                {
                                                    this.state.searchedProducts.map((product) => (
                                                        <SearchProduct item={product} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='icons d-flex align-items-center justify-content-center flex-grow-1'>
                                <div className='site-navigation icon-dropdown'>
                                    <div className='site-menu'>
                                        <li className='has-children'>
                                            <IoMdPerson size={26} />
                                            {
                                                this.renderPersonMenu()
                                            }
                                        </li>
                                        <li>
                                            <a href='/cart' className='icons-btn d-inline-block bag'>
                                                <IoIosBasket color={'#8C92A0'} size={26} />
                                                <span className='number'>{this.state.productsLength}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#' className='site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none'>
                                                <IoMdMenu color={'#8C92A0'} size={26} onClick={this.onMenuClick} />
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container-fluid'>
                        <div className='align-items-center justify-content-between'>
                            <div className='main-nav d-none d-lg-block'>
                                <nav className='site-navigation text-right text-md-center' role='navigation'>
                                    <ul className='site-menu js-clone-nav d-none d-lg-block'>
                                        {
                                            this.state.categories.map((category) => (
                                                <li className={'has-children'}>
                                                    <a href={`/shop?categoryId=${category._id}`}>{category.name}</a>
                                                    <ul className='dropdown'>
                                                        {
                                                            category.subCategories.map((subCategory) => (
                                                                <li>
                                                                    <a href={`/shop?categoryId=${category._id}&subCategoryId=${subCategory._id}`}>{subCategory.name}</a>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Navbar