/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import Cookies from 'universal-cookie'

import { listFavorites } from '../../scripts/requests'

import SiteWrap from '../../components/SiteWrap'
import ShopProduct from '../../components/Product/ShopProduct'
import Loading from '../../components/Loading'
import ProfileColumn from '../../components/ProfileColumn'

const cookies = new Cookies()

class FavoriteProducts extends React.Component {

    state = {
        products: [],
        fetching: true
    }

    componentDidMount() {
        if (cookies.get('token')) {
            listFavorites().then((result) => {
                this.setState({
                    products: result.data.favoriteProducts,
                    fetching: false
                })
            })
        } else {
            this.props.history.push('/sign-in')
        }
    }

    renderContent = ({ onIncreaseClick }) => (
        <div className='container'>
            <div className='row mb-5'>
                <ProfileColumn />
                <div className={`col-md-9 order-1 my-2`}>
                    <div className={`w-100 h-100 ${!(this.state.products.length > 0) ? 'border' : ''}`}>
                        {
                            this.state.products.length > 0 ? (
                                <div className='row'>
                                    {
                                        this.state.products.map((product) => (
                                            <ShopProduct
                                                onIncreaseClick={onIncreaseClick}
                                                key={product._id}
                                                item={product}
                                                loggedIn
                                                favorite
                                            />
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

    render() {
        const divider = [
            {
                path: null,
                title: 'Favorilerim'
            }
        ]

        if (this.state.fetching) {
            return (
                <Loading />
            )
        } else {
            return (
                <SiteWrap divider={divider}>
                    <this.renderContent />
                </SiteWrap>
            )
        }
    }
}

export default FavoriteProducts