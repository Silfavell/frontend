/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { IoMdPerson, IoIosBasket, IoMdMenu, IoIosSearch, IoMdClose, IoIosArrowDown } from 'react-icons/io'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'
import './custom.css'

import SearchProduct from './SearchProduct'
import NavCartItem from './NavCartItem'

const cookies = new Cookies()

class Navbar extends React.Component {

    state = {
        loggedIn: cookies.get('token'),
        searchText: '',
        searchedProducts: []
    }

    onSearchClick = () => {
        const url = `${process.env.REACT_APP_API_URL}/search-product?name=${this.state.searchText}`

        axios.get(url).then(({ status, data }) => {
            if (status === 200) {
                this.setState({ searchedProducts: data.map((product) => product._source) })
            }
        })
    }

    onLogoutClick = () => {
        cookies.remove('token')
        cookies.remove('user')
        localStorage.removeItem('favoriteProducts')

        this.setState({ loggedIn: false }, () => {
            window.history.pushState({}, null, '/')
            window.location.reload()
        })
    }

    renderPersonMenu = () => {
        if (this.state.loggedIn) {
            return (
                <ul className='dropdown-test'>
                    <li><a href='/edit-profile'>Profilimi Düzenle</a></li>
                    <li><a href='/favorite-products'>Favorilerim</a></li>
                    <li><a href='/previous-orders'>Siparişlerim</a></li>
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
                <ul className='dropdown-test'>
                    <li><a href='/sign-in'>Giriş yap</a></li>
                    <li><a href='/sign-up'>Üye Ol</a></li>
                </ul>
            )
        }
    }

    onSearchBackgroundClick = () => {
        this.onSearchClearClick()
    }

    renderSearchBarTop = () => (
        <div className='search-top'>
            <div className='input-group' style={{ border: '1px solid #E83E8C', zIndex: 11 }}>
                <input
                    type='text'
                    className='form-control border-0'
                    placeholder='Ara'
                    onChange={this.onSearchTextChange}
                    value={this.state.searchText} />

                <div className='input-group-append bg-white'>
                    <button className='btn' type='button'>
                        {
                            (this.state.searchText.length > 0 && this.state.searchedProducts.length > 0) && (
                                <IoMdClose color={'#8C92A0'} size={26} onClick={this.onSearchClearClick} />
                            )
                        }
                        <IoIosSearch color={'#8C92A0'} size={26} onClick={this.onSearchClick} />
                    </button>
                </div>
            </div>

            <div className={`background ${this.state.searchedProducts.length > 0 ? 'visible' : ''}`} onClick={this.onSearchBackgroundClick} />

            <div className={`search-results ${this.state.searchedProducts.length > 0 ? 'active-search' : ''}`}>
                <div style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
                    <div className='col-md-12'>
                        <div className='row'>
                            {
                                this.state.searchedProducts.slice(0, 6).map((product) => (
                                    <SearchProduct item={product} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    renderSearchBarBottom = () => (
        <div className='search-bottom'>
            <div className='input-group' style={{ border: '1px solid #E83E8C', zIndex: 11 }}>
                <input
                    type='text'
                    className='form-control border-0'
                    style={{ backgroundColor: 'white', zIndex: 11 }}
                    placeholder='Ara'
                    onChange={this.onSearchTextChange}
                    value={this.state.searchText} />

                <div className={`background ${this.state.searchedProducts.length > 0 ? 'visible' : ''}`} onClick={this.onSearchBackgroundClick} />

                <div className='input-group-append' style={{ backgroundColor: 'white', zIndex: 11 }}>
                    <button className='btn' type='button'>
                        {
                            (this.state.searchText.length > 0 && this.state.searchedProducts.length > 0) && (
                                <IoMdClose color={'#8C92A0'} size={26} onClick={this.onSearchClearClick} />
                            )
                        }
                        <IoIosSearch color={'#8C92A0'} size={26} onClick={this.onSearchClick} />
                    </button>
                </div>
            </div>

            <div className={`search-results ${this.state.searchedProducts.length > 0 ? 'active-search' : ''}`}>
                <div style={{ backgroundColor: 'white', paddingTop: 10 }}>
                    <div className='col-md-12'>
                        <div className='row'>
                            {
                                this.state.searchedProducts.map((product) => (
                                    <a href={`/${product.slug}/p`} className='col-md-12 border-bottom p-3' style={{ cursor: 'pointer' }}>
                                        {product.name}
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

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
                <div className='site-mobile-menu'>
                    <div className='site-mobile-menu-body'>
                        <ul className='site-nav-wrap'>
                            {
                                this.props.categories.map((category) => (
                                    <li className={'has-children'} key={category._id}>
                                        {
                                            category.subCategories.length > 0 &&
                                            <IoIosArrowDown size={18} className='arrow-collapse collapsed' data-toggle='collapse' data-target={`#collapseItem${category._id}`} />
                                        }
                                        <a href={`/shop/${category.slug}`}>{category.name}</a>
                                        <ul className='collapse' id={`collapseItem${category._id}`}>
                                            {
                                                category.subCategories.map((subCategory) => (
                                                    <li key={subCategory._id}>
                                                        <a href={`/shop/${category.slug}/${subCategory.slug}`}>{subCategory.name}</a>
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
                            {
                                this.renderSearchBarTop()
                            }

                            <div className='icons d-flex align-items-center justify-content-center flex-grow-1'>
                                <div className='site-navigation icon-dropdown'>
                                    <div className='site-menu'>
                                        <li className='has-children person-menu'>
                                            <IoMdPerson size={26} />
                                            {
                                                this.renderPersonMenu()
                                            }
                                        </li>
                                        <li>
                                            <span style={{ padding: 10 }} className='icons-btn d-inline-block bag'>
                                                <IoIosBasket color={'#8C92A0'} size={26} />
                                                <span className='number'>{this.props.products.length}</span>
                                                {
                                                    this.props.products.length > 0 &&
                                                    (
                                                        <div className='cart'>
                                                            {
                                                                this.props.products.map((product) => (
                                                                    <NavCartItem
                                                                        setProductQuantity={this.props.setProductQuantity}
                                                                        key={product._id}
                                                                        item={product} />
                                                                ))
                                                            }

                                                            <a className='w-100 p-2 px-4' href='/cart' style={{ fontSize: '1.1rem', fontWeight: '400' }}>
                                                                Sepete Git
                                                            </a>
                                                        </div>
                                                    )
                                                }
                                            </span>
                                        </li>
                                        <li>
                                            <a href='#' className='site-menu-toggle js-menu-toggle d-inline-block d-lg-none'>
                                                <IoMdMenu color={'#8C92A0'} size={26} onClick={this.onMenuClick} />
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container-fluid'>
                        <div className='align-items-center justify-content-between bottom-search'>
                            {
                                this.renderSearchBarBottom()
                            }
                            <div className='main-nav d-none d-lg-block'>
                                <nav className='site-navigation text-right text-md-center' role='navigation'>
                                    <ul className='site-menu js-clone-nav d-none d-lg-block'>
                                        {
                                            this.props.categories.map((category) => (
                                                <li className={'has-children'} key={category._id}>
                                                    <a href={`/shop/${category.slug}`}>{category.name}</a>
                                                    <ul className='dropdown'>
                                                        {
                                                            category.subCategories.map((subCategory) => (
                                                                <li className={subCategory.types.length > 0 ? 'has-children' : ''} key={subCategory._id}>
                                                                    <a href={`/shop/${category.slug}/${subCategory.slug}`}>{subCategory.name}</a>
                                                                    {
                                                                        subCategory.types.length > 0 && (
                                                                            <ul className='dropdown'>
                                                                                {
                                                                                    subCategory.types.map((type) => (
                                                                                        <li>
                                                                                            <a key={type._id} href={`/shop/${category.slug}/${subCategory.slug}?type=${type.name}`}>{type.name}</a>
                                                                                        </li>
                                                                                    ))
                                                                                }
                                                                            </ul>
                                                                        )
                                                                    }
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