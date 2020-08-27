import React from 'react'
import axios from 'axios'
import { Nav, Tab } from 'react-bootstrap'

import Carousel from '../Carousel'

import './Tabs.css'

class Tabs extends React.Component {
    state = {
        bestSeller: []
    }

    UNSAFE_componentWillMount() {
        this.fetchProducts().then((bestSeller) => {
            this.setState({
                bestSeller
            })
        })
    }

    fetchProducts = () => {
        const url = `${process.env.REACT_APP_API_URL}/best-seller`
        return axios.get(url).then((result) => result?.data || [])
    }

    render() {
        if (this.state.bestSeller.length > 0) {
            return (
                <Tab.Container defaultActiveKey={this.state.bestSeller[0]._id}>
                    <Nav variant='tabs' className={'pl-4 w-100'}>
                        {
                            this.state.bestSeller.map((category) => (
                                <Nav.Item key={'bestSellerTab' + category._id} className={'mx-2'}>
                                    <Nav.Link style={{ color: '#495057' }} eventKey={category._id}>{category.name}</Nav.Link>
                                </Nav.Item>
                            ))
                        }
                    </Nav>

                    <Tab.Content className={'w-100'}>
                        {
                            this.state.bestSeller.map((category) => (
                                <Tab.Pane key={'bestSellerPane' + category._id} eventKey={category._id}>
                                    <Carousel
                                        products={category.products}
                                        onIncreaseClick={this.props.onIncreaseClick}
                                    />
                                </Tab.Pane>
                            ))
                        }
                    </Tab.Content>
                </Tab.Container>
            )
        }

        return null
    }
}

export default Tabs