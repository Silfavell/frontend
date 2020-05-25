/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { IoMdPerson, IoIosBasket } from 'react-icons/io'
import Cookies from 'universal-cookie'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

const cookies = new Cookies()

class Navbar extends React.Component {

    renderPersonMenu = () => {
        if (cookies.get('token')) {
            return (
                <ul className='dropdown'>
                    <li><a href='#'>Menu One</a></li>
                    <li><a href='#'>Menu Two</a></li>
                    <li><a href='/edit-profile'>Profilimi düzenle</a></li>
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

    render() {
        return (
            <div className={`site-navbar bg-white py-2 ${!this.props.firstImage ? 'custom-border-bottom' : ''}`}>

                <div className='container'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='logo'>
                            <a href='/' className='js-logo-clone'>
                                <img src={process.env.PUBLIC_URL + '/logo.png'} style={{ height: 80 }} />
                            </a>
                        </div>
                        <div className='main-nav d-none d-lg-block'>
                            <nav className='site-navigation text-right text-md-center' role='navigation'>
                                <ul className='site-menu js-clone-nav d-none d-lg-block'>

                                    <li><a href='/'>Home</a></li>

                                    <li className='has-children'>
                                        <a href='/shop'>Shop</a>
                                        <ul className='dropdown'>
                                            <li><a href='#'>Menu One</a></li>
                                            <li><a href='#'>Menu Two</a></li>
                                            <li><a href='#'>Menu Three</a></li>
                                            <li className='has-children'>
                                                <a href='#'>Sub Menu</a>
                                                <ul className='dropdown'>
                                                    <li><a href='#'>Menu One</a></li>
                                                    <li><a href='#'>Menu Two</a></li>
                                                    <li><a href='#'>Menu Three</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>

                                    <li><a href='#'>Catalogue</a></li>
                                    <li><a href='#'>New Arrivals</a></li>
                                    <li className='active'><a href='#'>Contact (footera taşındı)</a></li>

                                </ul>
                            </nav>
                        </div>
                        <div className='icons'>
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
                                            <span className='number'>2</span>
                                        </a>
                                    </li>
                                </div>
                            </div>
                            <a href='#' className='site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none'><span className='icon-menu'></span></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar