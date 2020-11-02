import React from 'react'
import { Helmet } from 'react-helmet'

import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'
import Loading from '../../components/Loading/Loading'
import EmptyShop from './EmptyShop'
import ShopContent from './ShopContent'

import { makeCustomRequest } from '../../scripts/requests'
import {
    maximumProductLengthInOnePage
} from './scripts'

import './Shop.css'

class Shop extends React.Component {
    state = {
        shop: {},
        fetching: true
    }

    filterShop = async () => {
        const url = `${process.env.REACT_APP_API_URL}/filter-shop${this.props.location.pathname.replace('/shop', '')}${this.props.location.search}${this.props.location.search.startsWith('?') ? '&' : '?'}quantity=${maximumProductLengthInOnePage}`
        const { data } = await makeCustomRequest({ url })

        return data
    }

    refresh = () => {
        this.setState({ fetching: true }, async () => {
            const shop = await this.filterShop()

            this.setState({ shop, fetching: false })
        })
    }

    async componentDidMount() {
        const shop = await this.filterShop()

        this.setState({
            shop,
            fetching: false
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.refresh()
        }
    }

    render() {
        const { category: categorySlug, subCategory: subCategorySlug } = this.props.match.params
        const currentCategory = this.props.categories.find(category => category.slug === categorySlug)
        const subCategory = subCategorySlug ? currentCategory?.subCategories.find((subCategory) => subCategory.slug === subCategorySlug) : null

        if (this.state.fetching) {
            return <Loading />
        } else if (!this.state.fetching && !currentCategory) {
            return (
                <EmptyShop />
            )
        } else {
            return (
                <>
                    <Helmet>
                        <title>{`${(subCategory ?? currentCategory)?.name} | Silfavell`}</title>
                        <meta name='description' content={`${(subCategory ?? currentCategory)?.name}`} data-react-helmet='true' />
                    </Helmet>
                    <ShopContent
                        location={this.props.location}
                        shop={this.state.shop} />
                </>
            )
        }
    }
}

export default SiteWrapHoc(Shop, { page: 'Shop' })