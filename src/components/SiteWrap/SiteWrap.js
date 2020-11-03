import React from 'react'

import $ from 'jquery'

import Breadcrumb from './Breadcrumb/Breadcrumb'
import { dynamicBreadcrumb } from './dynamic-breadcrumb'
import FirstImage from './FirstImage/FirstImage'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import {
    onIncreaseClick,
    onDecreaseClick,
    setProductQuantity,
    getInitialDatas
} from './scripts'

const SiteWrapHoc = (WrappedComponent, { firstImage, breadcrumb, page } = {}) => class extends React.Component {
        state = {
            isMobileMenuOpen: false,
            categories: [],
            products: []
        }

        async componentDidMount() {
            const initialDatas = await getInitialDatas()
            let breadcrumb = []

            if (page) {
                breadcrumb = await dynamicBreadcrumb({ page, categories: initialDatas.categories, urlParams: this.props.match.params })
            }

            if (page) {
                this.setState({ ...initialDatas, breadcrumb })
            } else {
                this.setState(initialDatas)
            }
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

        render() {
            // eslint-disable-next-line no-underscore-dangle
            const _breadcrumb = (page ? this.state.breadcrumb : breadcrumb) ?? []

            return (
                <div
                    className={`site-wrap ${this.state.isMobileMenuOpen ? 'offcanvas-menu' : ''}`}
                    onClick={this.onOutsideMenuClick}
                >

                    <Header
                        categories={this.state.categories}
                        products={this.state.products}
                        firstImage={firstImage}
                        changeMobileMenuStatus={this.changeMobileMenuStatus}
                        setProductQuantity={this.setProductQuantity} />

                    {
                        firstImage && <FirstImage />
                    }

                    {
                        _breadcrumb.length > 0 && <Breadcrumb breadcrumb={_breadcrumb} />
                    }

                    <div className='site-section'>
                        <WrappedComponent
                            categories={this.state.categories}
                            products={this.state.products}
                            onIncreaseClick={this.onIncreaseClick}
                            onDecreaseClick={this.onDecreaseClick}
                            setProductQuantity={this.setProductQuantity}
                            history={this.props.history}
                            match={this.props.match}
                            location={this.props.location} />
                    </div>

                    <Footer />
                </div>
            )
        }
}

export default SiteWrapHoc
