import React from 'react'
import Cookies from 'universal-cookie'
import VanillaToasts from 'vanillatoasts'
import $ from 'jquery'

import {
    fetchOfflineCartProducts,
    getCartProducts,
    getCategories,
    increaseProductQuantity,
    decreaseProductQuantity,
    setProductQuantity,
    listFavorites
} from '../../scripts/requests'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Divider from '../Divider/Divider'
import FirstImage from '../FirstImage/FirstImage'

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

    setCartToStorageOnIncrease = (productId, quantity) => {
        const cart = window.localStorage.getItem('cart')

        if (cart) {
            const cartAsArray = JSON.parse(cart)
            const foundProduct = cartAsArray.find((cartProduct) => cartProduct._id === productId)

            if (foundProduct) {
                cartAsArray[cartAsArray.indexOf(foundProduct)].quantity = quantity

                if (cartAsArray[cartAsArray.indexOf(foundProduct)].quantity < 1) {
                    cartAsArray.splice(cartAsArray.indexOf(foundProduct), 1)
                }
            } else {
                cartAsArray.push({ _id: productId, quantity })
            }

            window.localStorage.setItem('cart', JSON.stringify(cartAsArray))
        } else {
            window.localStorage.setItem('cart', JSON.stringify([{ _id: productId, quantity }]))
        }
    }

    setCartToStorageOnDecrease = (productId, quantity) => {
        const cart = window.localStorage.getItem('cart')

        const cartAsArray = JSON.parse(cart)
        const foundProduct = cartAsArray.find((cartProduct) => cartProduct._id === productId)
        cartAsArray[cartAsArray.indexOf(foundProduct)].quantity -= quantity

        if (cartAsArray[cartAsArray.indexOf(foundProduct)].quantity < 1) {
            cartAsArray.splice(cartAsArray.indexOf(foundProduct), 1)
        }

        window.localStorage.setItem('cart', JSON.stringify(cartAsArray))
    }

    onIncreaseClick = async (productId, quantity = 1, dontShowToast) => {
        const { status, data } = await increaseProductQuantity(productId, quantity)

        if (status === 200) {
            const foundProduct = this.state.products.find(product => product._id === productId)

            if (foundProduct) {
                const indexOfFoundProduct = this.state.products.indexOf(foundProduct)
                // eslint-disable-next-line
                this.state.products[indexOfFoundProduct] = { ...data, quantity: foundProduct.quantity + quantity }

                this.setState({ products: this.state.products })

                if (!cookies.get('token')) {
                    this.setCartToStorageOnIncrease(productId, foundProduct.quantity + quantity)
                }
            } else {
                this.state.products.push({ ...data, quantity })
                this.setState({ products: this.state.products })

                if (!cookies.get('token')) {
                    this.setCartToStorageOnIncrease(productId, quantity)
                }
            }

            if (!dontShowToast) {
                VanillaToasts.create({
                    title: `Ürün sepete eklendi`,
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })
            }
        }
    }

    onDecreaseClick = async (productId, quantity = 1, dontShowToast) => {
        const { status, data } = await decreaseProductQuantity(productId, quantity)

        if (status === 200) {
            const foundProduct = this.state.products.find(product => product._id === productId)

            if (foundProduct.quantity - quantity > 0) {
                const indexOfFoundProduct = this.state.products.indexOf(foundProduct)
                // eslint-disable-next-line
                this.state.products[indexOfFoundProduct] = { ...data, quantity: foundProduct.quantity - quantity }

                this.setState({ products: this.state.products }, () => {
                    if (!dontShowToast) {
                        VanillaToasts.create({
                            title: `Ürün sepetten çıkarıldı`,
                            positionClass: 'topRight',
                            type: 'success',
                            timeout: 3 * 1000
                        })
                    }
                })
            } else {
                const indexOfFoundProduct = this.state.products.indexOf(foundProduct)
                this.state.products.splice(indexOfFoundProduct, 1)

                this.setState({ products: this.state.products }, () => {
                    if (!dontShowToast) {
                        VanillaToasts.create({
                            title: `Ürün sepetten çıkarıldı`,
                            positionClass: 'topRight',
                            type: 'success',
                            timeout: 3 * 1000
                        })
                    }
                })
            }

            if (!cookies.get('token')) {
                this.setCartToStorageOnDecrease(productId, quantity)
            }
        }
    }

    setProductQuantity = async (productId, quantity = 1) => {
        const { status, data } = await setProductQuantity(productId, quantity)

        if (status === 200) {
            const foundProduct = this.state.products.find(product => product._id === productId)
            const indexOfFoundProduct = this.state.products.indexOf(foundProduct)

            if (data.quantity) {
                // eslint-disable-next-line
                this.state.products[indexOfFoundProduct] = { ...data, quantity }
                this.setState({ products: this.state.products })
            } else {
                this.state.products.splice(indexOfFoundProduct, 1)

                this.setState({ products: this.state.products }, () => {
                    VanillaToasts.create({
                        title: `Ürün sepetten çıkarıldı`,
                        positionClass: 'topRight',
                        type: 'success',
                        timeout: 3 * 1000
                    })
                })
            }

            if (!cookies.get('token')) {
                this.setCartToStorageOnIncrease(productId, quantity)
            }
        }
    }

    getCartProducts = async () => {
        const { data } = await getCartProducts()

        return data?.cart ? Object.values(data.cart) : []
    }

    getFavoriteProducts = async () => {
        const { data } = await listFavorites()

        return data.favoriteProducts
    }

    getCategories = async () => {
        const { data } = await getCategories()

        return data
    }

    async componentDidMount() {
        if (cookies.get('token')) {
            const [categories, products, favoriteProducts] = await Promise.all([this.getCategories(), this.getCartProducts(), this.getFavoriteProducts()])

            this.setState({ categories, products }, () => {
                localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts))
            })
        } else {
            const categories = await this.getCategories()
            const cart = window.localStorage.getItem('cart')

            if (cart) {
                const cartAsArray = JSON.parse(cart)
                if (cartAsArray.length > 0) {
                    const { data } = await fetchOfflineCartProducts()

                    this.setState({
                        categories,
                        products: data.products.map((product, index) => Object.assign(product, { quantity: cartAsArray[index].quantity }))
                    })
                }
            } else {
                this.setState({ categories, products: [] })
            }
        }

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
                    setProductQuantity={this.setProductQuantity}
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
                                onDecreaseClick: this.onDecreaseClick,
                                setProductQuantity: this.setProductQuantity
                            })
                        ))
                    }
                </div>

                <Footer />
            </div>
        )
    }
}

export default SiteWrap