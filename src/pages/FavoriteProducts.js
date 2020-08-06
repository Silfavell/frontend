/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import SiteWrap from '../components/SiteWrap'
import ShopProduct from '../components/ShopProduct'
import Loading from '../components/Loading'
import ProfileColumn from '../components/ProfileColumn'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

const cookies = new Cookies()

class FavoriteProducts extends React.Component {

    state = {
        products: [],
        fetching: true
    }

    fetchProducts = () => {
        const url = `${process.env.REACT_APP_API_URL}/user/favorite-products`

        return axios.get(url).then(({ data }) => data.favoriteProducts)
    }

    UNSAFE_componentWillMount() {
        if (cookies.get('token')) {
            this.fetchProducts().then((products) => {
                this.setState({
                    products: products || [],
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
                <div className='col-md-9 order-1'>
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
                                <div className='border h-100 w-100 d-flex align-items-center justify-content-center'>
                                    Favori ürününüz bulunmamaktadır.
                                </div>
                            )
                    }
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