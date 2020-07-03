import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import VanillaToasts from 'vanillatoasts'
import $ from 'jquery'

import Navbar from './Navbar'
import Footer from './Footer'
import Divider from './Divider'
import FirstImage from './FirstImage'

import '../style/css/style.css'
import 'vanillatoasts/vanillatoasts.css'

const cookies = new Cookies()

class SiteWrap extends React.Component {

    state = {
        isMobileMenuOpen: false,
        categories: [],
        products: []
    }

    changeMobileMenuStatus = (isMobileMenuOpen) => {
        this.setState({ isMobileMenuOpen })
    }

    onOutsideMenuClick = (event) => {
        if (this.state.isMobileMenuOpen && $('.site-mobile-menu').find(event.target).length === 0) {
            this.changeMobileMenuStatus(false)
        }
    }

    getCartProducts = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/user/cart`).then(({ data }) => (
            (data && data.cart) ? Object.values(data.cart) : []
        ))
    )

    fetchOfflineCartProducts = () => {
        const url = `${process.env.REACT_APP_API_URL}/products-filter?productIds=${
            JSON.parse(window.localStorage.getItem('cart')).map((cartProduct) => cartProduct._id).join(',')
            }`


        return axios.get(url).then(({ data }) => data)
    }

    getCategories = () => (
        axios.get(`${process.env.REACT_APP_API_URL}/categories`).then(({ data }) => data)
    )

    onIncreaseClick = (productId) => {
        if (cookies.get('token')) {
            axios.get(`${process.env.REACT_APP_API_URL}/add-product/${productId}`).then(({ status, data }) => {
                if (status === 200) {
                    if (data.quantity > 1) {
                        const newProducts = this.state.products.map((cartProduct) => (
                            cartProduct._id === productId ? data : cartProduct
                        ))

                        this.setState({ products: newProducts }, () => {
                            VanillaToasts.create({
                                title: `Ürün sepete eklendi`,
                                positionClass: 'topRight',
                                type: 'success',
                                timeout: 3 * 1000
                            })
                        })
                    } else {
                        this.state.products.push(data)
                        this.setState({ products: this.state.products }, () => {
                            VanillaToasts.create({
                                title: `Ürün sepete eklendi`,
                                positionClass: 'topRight',
                                type: 'success',
                                timeout: 3 * 1000
                            })
                        })
                    }
                }
            }).catch((err) => {
                VanillaToasts.create({
                    title: err?.response?.data?.error ?? 'Beklenmedik Bir Hata oluştu',
                    positionClass: 'topRight',
                    type: 'error',
                    timeout: 3 * 1000
                })
            })
        } else {
            const cart = window.localStorage.getItem('cart')

            if (cart) {
                const cartAsArray = JSON.parse(cart)
                const foundProduct = cartAsArray.find((cartProduct) => cartProduct._id === productId)
                if (foundProduct) {
                    cartAsArray[cartAsArray.indexOf(foundProduct)].quantity++
                } else {
                    cartAsArray.push({ _id: productId, quantity: 1 })
                }
                window.localStorage.setItem('cart', JSON.stringify(cartAsArray))
            } else {
                window.localStorage.setItem('cart', JSON.stringify([{ _id: productId, quantity: 1 }]))
            }

            VanillaToasts.create({
                title: `Ürün sepete eklendi`,
                positionClass: 'topRight',
                type: 'success',
                timeout: 3 * 1000
            })
        }
    }

    onDecreaseClick = (productId) => {
        if (cookies.get('token')) {
            axios.delete(`${process.env.REACT_APP_API_URL}/deduct-product/${productId}`).then(({ status, data }) => {
                if (status === 200) {
                    if (data.quantity > 0) {
                        const newProducts = this.state.products.map((cartProduct) => (
                            cartProduct._id === productId ? data : cartProduct
                        ))

                        this.setState({ products: newProducts }, () => {
                            VanillaToasts.create({
                                title: `Ürün sepetten çıkarıldı`,
                                positionClass: 'topRight',
                                type: 'success',
                                timeout: 3 * 1000
                            })
                        })
                    } else {
                        const foundedProduct = this.state.products.find((cartProduct => cartProduct._id === productId))
                        const indexOfFoundedProduct = this.state.products.indexOf(foundedProduct)
                        this.state.products.splice(indexOfFoundedProduct, 1)

                        this.setState({ products: this.state.products }, () => {
                            VanillaToasts.create({
                                title: `Ürün sepetten çıkarıldı`,
                                positionClass: 'topRight',
                                type: 'success',
                                timeout: 3 * 1000
                            })
                        })
                    }
                }
            }).catch((err) => {
                VanillaToasts.create({
                    title: err?.response?.data?.error ?? 'Beklenmedik Bir Hata oluştu',
                    positionClass: 'topRight',
                    type: 'error',
                    timeout: 3 * 1000
                })
            })
        } else {
            const cart = window.localStorage.getItem('cart')

            if (cart) {
                const cartAsArray = JSON.parse(cart)
                const foundProduct = cartAsArray.find((cartProduct) => cartProduct._id === productId)
                if (foundProduct) {
                    cartAsArray[cartAsArray.indexOf(foundProduct)].quantity--

                    if (cartAsArray[cartAsArray.indexOf(foundProduct)].quantity === 0)
                        cartAsArray.splice(cartAsArray.indexOf(foundProduct), 1)

                    VanillaToasts.create({
                        title: `Ürün sepetten çıkarıldı`,
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
                    })
                } else {
                    VanillaToasts.create({
                        title: `Ürün sepette bulunamadı`,
                        positionClass: 'topRight',
                        type: 'error',
                        timeout: 3 * 1000
                    })
                }
                window.localStorage.setItem('cart', JSON.stringify(cartAsArray))
            } else {
                VanillaToasts.create({
                    title: `Ürün sepette bulunamadı`,
                    positionClass: 'topRight',
                    type: 'error',
                    timeout: 3 * 1000
                })
            }
        }
    }

    UNSAFE_componentWillMount() {
        if (cookies.get('token')) {
            Promise.all([this.getCategories(), this.getCartProducts()]).then((vals) => {
                this.setState({ categories: vals[0], products: vals[1] })
            }).catch((err) => {
                console.log(err.response)
            })
        } else {
            this.getCategories().then((categories) => {
                const cart = window.localStorage.getItem('cart')
                if (cart) {
                    const cartAsArray = JSON.parse(cart)
                    if (cartAsArray.length > 0) {
                        this.fetchOfflineCartProducts().then((products) => {
                            this.setState({
                                categories,
                                products: products.map((product, index) => Object.assign(product, { quantity: cartAsArray[index].quantity }))
                            })
                        })
                    }
                } else {
                    this.setState({ categories, products: [] })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    componentDidUpdate() {
        setTimeout(() => {
            window.scrollTo({ behavior: 'smooth', top: 0 })
        }, 100)
    }

    render() {
        return (
            <div
                className={`site-wrap ${this.state.isMobileMenuOpen ? 'offcanvas-menu' : ''}`}
                onClick={this.onOutsideMenuClick}>

                <Navbar
                    categories={this.state.categories}
                    products={this.state.products}
                    firstImage={this.props.firstImage}
                    changeMobileMenuStatus={this.changeMobileMenuStatus}
                />

                {
                    this.props.firstImage && <FirstImage />
                }

                {
                    this.props.divider && <Divider divider={this.props.divider} />
                }

                <div className='site-section'>
                    {
                        React.Children.map(this.props.children, (child) => (
                            React.cloneElement(child, {
                                categories: this.state.categories,
                                products: this.state.products,
                                onIncreaseClick: this.onIncreaseClick,
                                onDecreaseClick: this.onDecreaseClick
                            })
                        ))
                    }
                </div>

                <Footer />

            </div >
        )
    }
}

export default SiteWrap