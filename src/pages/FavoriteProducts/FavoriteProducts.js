import React from 'react'

import Cookies from 'universal-cookie'

import Loading from '../../components/Loading/Loading'
import ShopProduct from '../../components/Product/ShopProduct'
import ProfileColumn from '../../components/ProfileColumn/ProfileColumn'
import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'
import { listFavorites } from '../../scripts/requests'

const cookies = new Cookies()

class FavoriteProducts extends React.Component {
    state = {
        products: [],
        fetching: true
    }

    async componentDidMount() {
        if (cookies.get('token')) {
            const result = await listFavorites()

            this.setState({
                products: result.data.favoriteProducts,
                fetching: false
            })
        } else {
            this.props.history.push('/sign-in')
        }
    }

    render() {
        if (this.state.fetching) {
            return (
                <Loading />
            )
        }

        return (
            <div className='container'>
                <div className='row mb-5'>
                    <ProfileColumn />
                    <div className='col-md-9 order-1 my-2'>
                        <div className={`w-100 h-100 ${!(this.state.products.length > 0) ? 'border' : ''}`}>
                            {
                                this.state.products.length > 0 ? (
                                    <div className='row'>
                                        {
                                            this.state.products.map((product) => (
                                                <ShopProduct
                                                    onIncreaseClick={this.props.onIncreaseClick}
                                                    key={product._id}
                                                    item={product}
                                                    loggedIn
                                                    favorite />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className='h-100 w-100 d-flex align-items-center justify-content-center py-5'>
                                        Favori ürününüz bulunmamaktadır.
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const breadcrumb = [
    {
        path: null,
        title: 'Favorilerim'
    }
]

export default SiteWrapHoc(FavoriteProducts, { breadcrumb })
