/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import { IoMdPerson, IoIosBasket, IoMdMenu } from 'react-icons/io'
import Cookies from 'universal-cookie'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

const cookies = new Cookies()

class Navbar extends React.Component {

    state = {
        loggedIn: cookies.get('token'),
        productsLength: 0,
        categories: []
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
                <ul className='dropdown'>
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


                            {
                                /*
                                <li class='has-children active'><span class='arrow-collapse collapsed' data-toggle='collapse' data-target='#collapseItem0' />
                                <a href='index.html'>Home</a>
                                <ul class='collapse' id='collapseItem0'>
                                    <li><a href='#'>Menu One</a></li>
                                    <li><a href='#'>Menu Two</a></li>
                                    <li><a href='#'>Menu Three</a></li>
                                    <li class='has-children'>
                                        <span class='arrow-collapse collapsed' data-toggle='collapse' data-target='#collapseItem1' />
                                        <a href='#'>Sub Menu</a>
                                        <ul class='collapse' id='collapseItem1'>
                                            <li><a href='#'>Menu One</a></li>
                                            <li><a href='#'>Menu Two</a></li>
                                            <li><a href='#'>Menu Three</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li><a href='shop.html'>Shop</a></li>
                            <li><a href='#'>Catalogue</a></li>
                            <li><a href='#'>New Arrivals</a></li>
                            <li><a href='contact.html'>Contact</a></li>
                            */
                            }

                        </ul>
                    </div>
                </div>

                <div className={`site-navbar bg-white py-2 ${!this.props.firstImage ? 'custom-border-bottom' : ''}`}>

                    <div className='container-fluid'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='logo flex-grow-1 d-flex align-items-center justify-content-center'>
                                <a href='/' className='js-logo-clone'>
                                    <img src={process.env.PUBLIC_URL + '/logo.png'} style={{ height: 80 }} />
                                </a>
                            </div>
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
                            <div className='icons flex-grow-1 d-flex align-items-center justify-content-center '>
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
                                                <IoIosBasket size={26} />
                                                <span className='number'>{this.state.productsLength}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#' className='site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none'>
                                                <IoMdMenu size={26} onClick={this.onMenuClick} />
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Navbar