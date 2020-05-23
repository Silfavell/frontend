/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import '../style/css/googleMukta.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

function Navbar() {
    return (
        <div className='site-navbar bg-white py-2'>

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
                        <a href='/cart' className='icons-btn d-inline-block bag'>
                            <span className='icon-shopping-bag'></span>
                            <span className='number'>2</span>
                        </a>
                        <a href='#' className='site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none'><span className='icon-menu'></span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar