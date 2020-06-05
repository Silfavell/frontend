/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import axios from 'axios'

import SiteWrap from '../components/SiteWrap'
import ShopProduct from '../components/ShopProduct'
import Loading from '../components/Loading'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/css/style.css'

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
        this.fetchProducts().then((products) => {
            this.setState({
                products,
                fetching: false
            })
        })
    }

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
                    <div className='container'>
                        <div className='row mb-5'>
                            <div className="col-md-3 border">
                            </div>
                            <div className='col-md-9 order-1'>
                                <div className='row'>
                                    {
                                        this.state.products.map((product) => (
                                            <ShopProduct key={product._id} item={product} favorite />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </SiteWrap>
            )
        }
    }
}

export default FavoriteProducts