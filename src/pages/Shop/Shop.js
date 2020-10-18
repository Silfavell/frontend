import React from 'react'
import { Helmet } from 'react-helmet'

import SiteWrap from '../../components/SiteWrap/SiteWrap'
import Loading from '../../components/Loading/Loading'
import EmptyShop from './EmptyShop'
import ShopContent from './ShopContent'

import { getCategories, makeCustomRequest } from '../../scripts/requests'
import {
    maximumProductLengthInOnePage
} from './scripts'

import './Shop.css'

class Shop extends React.Component {
    state = {
        categories: [],
        shop: {},
        fetching: true
    }

    filterShop = async () => {
        const url = `${process.env.REACT_APP_API_URL}/filter-shop${this.props.location.pathname.replace('/shop', '')}${this.props.location.search}${this.props.location.search.startsWith('?') ? '&' : '?'}quantity=${maximumProductLengthInOnePage}`
        const { data } = await makeCustomRequest({ url })

        return data
    }

    getCategories = async () => {
        const { data } = await getCategories()

        return data
    }

    refresh = () => {
        this.setState({ fetching: true }, async () => {
            const shop = await this.filterShop()

            this.setState({ shop, fetching: false })
        })
    }

    async componentDidMount() {
        const [categories, shop] = await Promise.all([this.getCategories(), this.filterShop()])

        this.setState({
            categories,
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
        const currentCategory = this.state.categories.find(category => category._id === this.state.shop._id)
        const subCategory = [...this.props.location.pathname].filter(letter => letter === '/').length > 2 ? currentCategory?.subCategories.find((subCategory) => subCategory._id === this.state.shop.subCategoryId) : null

        let divider = []

        if (subCategory) {
            divider = [
                {
                    path: `/shop/${currentCategory?.slug}`,
                    title: currentCategory?.name
                },
                {
                    path: null,
                    title: subCategory.name
                }
            ]
        } else {
            divider = [
                {
                    path: null,
                    title: currentCategory?.name
                }
            ]
        }

        if (this.state.fetching) {
            return (
                <Loading />
            )
        } else if (!this.state.fetching && !currentCategory) {
            return (
                <SiteWrap>
                    <EmptyShop />
                </SiteWrap>
            )
        } else {
            return (
                <SiteWrap divider={divider}>
                    <Helmet>
                        <title>{`${(subCategory ?? currentCategory)?.name} | Silfavell`}</title>
                        <meta name='description' content={`${(subCategory ?? currentCategory)?.name}`} data-react-helmet='true' />
                    </Helmet>
                    <ShopContent
                        location={this.props.location}
                        shop={this.state.shop} />
                </SiteWrap>
            )
        }
    }
}

export default Shop