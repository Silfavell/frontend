/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import { IoMdPerson, IoIosBasket, IoMdMenu } from 'react-icons/io'
import Cookies from 'universal-cookie'

import { search } from '../../../scripts/requests'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import Navbar from './Navbar'
import NavCartItem from './NavCartItem'
import PersonMenu from './PersonMenu'
import SearchBarBottom from './SearchBarBottom'
import SearchBarTop from './SearchBarTop'

import './Header.css'

const cookies = new Cookies()

class Header extends React.Component {
    state = {
        loggedIn: cookies.get('token'),
        searchText: '',
        searchedProducts: []
    }

    onSearchClick = async () => {
        const { status, data } = await search(this.state.searchText)

        if (status === 200) {
            this.setState({ searchedProducts: data.map((product) => product._source) })
        }
    }

    onSearchBackgroundClick = () => {
        this.onSearchClearClick()
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

    onLogoutClick = () => {
        cookies.remove('token', { path: '/' })
        cookies.remove('user', { path: '/' })
        localStorage.removeItem('_id')
        localStorage.removeItem('alias')
        localStorage.removeItem('favoriteProducts')
        window.location.reload()
    }

    // for mobile
    onPersonClick = () => {
        window.history.pushState({}, null, '/edit-profile')
        window.location.reload()
    }

    // for mobile
    onBagClick = () => {
        window.history.pushState({}, null, '/cart')
        window.location.reload()
    }

    onMenuClick = () => {
        this.props.changeMobileMenuStatus(true)
    }

    render() {
        return (
            <>
                <MobileMenu categories={this.props.categories} />

                <div className={`site-navbar bg-white py-2 ${!this.props.firstImage ? 'custom-border-bottom' : ''}`}>
                    <div className='container-fluid'>
                        <div className='align-items-center justify-content-between d-flex direction-row'>
                            <Logo />

                            <SearchBarTop
                                onSearchClick={this.onSearchClick}
                                onSearchBackgroundClick={this.onSearchBackgroundClick}
                                onSearchTextChange={this.onSearchTextChange}
                                onSearchClearClick={this.onSearchClearClick}
                                searchText={this.state.searchText}
                                searchedProducts={this.state.searchedProducts} />

                            <div className='icons d-flex align-items-center justify-content-center flex-grow-1'>
                                <div className='site-navigation icon-dropdown'>
                                    <div className='site-menu'>
                                        <li className='has-children person-menu'>
                                            <IoMdPerson size={26} onClick={this.onPersonClick} />
                                            <PersonMenu loggedIn={this.state.loggedIn} />
                                        </li>
                                        <li>
                                            <span className='icons-btn d-inline-block bag'>
                                                <IoIosBasket color='#8C92A0' size={26} onClick={this.onBagClick} />
                                                <span className='number' onClick={this.onBagClick}>{this.props.products.length}</span>
                                                {
                                                    this.props.products.length > 0
                                                    && (
                                                        <div className='cart'>
                                                            {
                                                                this.props.products.map((product) => (
                                                                    <NavCartItem
                                                                        setProductQuantity={this.props.setProductQuantity}
                                                                        key={product._id}
                                                                        item={product} />
                                                                ))
                                                            }

                                                            <div className='cart-btn-container'>
                                                                <a className='col-12 p-2 px-4 cart-btn cart-btn-first' href='/cart'>Sepete Git</a>
                                                                <a className='col-12 p-2 px-4 cart-btn' href='/payment'>Satın Al</a>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </span>
                                        </li>
                                        <li>
                                            <a href='#' className='site-menu-toggle js-menu-toggle d-inline-block d-lg-none'>
                                                <IoMdMenu color='#8C92A0' size={26} onClick={this.onMenuClick} />
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='container-fluid'>
                        <div className='align-items-center justify-content-between bottom-search'>
                            <SearchBarBottom
                                onSearchClick={this.onSearchClick}
                                onSearchBackgroundClick={this.onSearchBackgroundClick}
                                onSearchTextChange={this.onSearchTextChange}
                                onSearchClearClick={this.onSearchClearClick}
                                searchText={this.state.searchText}
                                searchedProducts={this.state.searchedProducts} />
                            <Navbar
                                categories={this.props.categories} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Header
