import React from 'react'
import $ from 'jquery'

import Header from './Header/Header'
import Footer from './Footer'
import Breadcrumb from './Breadcrumb'
import FirstImage from './FirstImage'

import {
    onIncreaseClick,
    onDecreaseClick,
    setProductQuantity,
    getInitialDatas
} from './scripts'

const SiteWrapHoc = (WrappedComponent, { firstImage, breadcrumb } = {}) => {
    return class extends React.Component {
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

        onIncreaseClick = async (productId, quantity = 1, dontShowToast) => {
            const products = await onIncreaseClick(productId, quantity, dontShowToast, this.state.products)

            this.setState({ products })
        }

        onDecreaseClick = async (productId, quantity = 1, dontShowToast) => {
            const products = await onDecreaseClick(productId, quantity, dontShowToast, this.state.products)

            this.setState({ products })
        }

        setProductQuantity = async (productId, quantity = 1) => {
            const products = await setProductQuantity(productId, quantity, this.state.products)

            this.setState({ products })
        }

        async componentDidMount() {
            const initialDatas = await getInitialDatas()

            this.setState(initialDatas)
        }

        render() {
            return (
                <div
                    className={`site-wrap ${this.state.isMobileMenuOpen ? 'offcanvas-menu' : ''}`}
                    onClick={this.onOutsideMenuClick}>

                    <Header
                        categories={this.state.categories}
                        products={this.state.products}
                        firstImage={firstImage}
                        changeMobileMenuStatus={this.changeMobileMenuStatus}
                        setProductQuantity={this.setProductQuantity}
                    />

                    {
                        firstImage && <FirstImage />
                    }

                    {
                        breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />
                    }

                    <div className='site-section'>
                        <WrappedComponent
                            categories={this.state.categories}
                            products={this.state.products}
                            onIncreaseClick={this.onIncreaseClick}
                            onDecreaseClick={this.onDecreaseClick}
                            setProductQuantity={this.setProductQuantity}
                            history={this.props.history}
                        />
                    </div>

                    <Footer />
                </div>
            )
        }
    }
}

export default SiteWrapHoc