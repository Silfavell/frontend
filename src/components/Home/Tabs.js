import React from 'react'
import axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import Carousel from '../Carousel'

import './Tabs.css'

class CustomTabs extends React.Component {
    state = {
        bestSeller: []
    }

    UNSAFE_componentWillMount() {
        this.fetchProducts().then((bestSeller) => {
            this.setState({ bestSeller })
        })
    }

    fetchProducts = () => {
        const url = `${process.env.REACT_APP_API_URL}/best-seller`
        return axios.get(url).then((result) => result?.data || [])
    }

    render() {
        if (this.state.bestSeller.length > 0) {
            return (
                <Tabs defaultIndex={0} className='w-100'>
                    <TabList>
                        {
                            this.state.bestSeller.map((category) => (
                                <Tab>{category.name}</Tab>
                            ))
                        }
                    </TabList>
                    {
                        this.state.bestSeller.map((category) => (
                            <TabPanel className='w-100'>
                                <Carousel
                                    products={category.products}
                                    onIncreaseClick={this.props.onIncreaseClick}
                                />
                            </TabPanel>
                        ))
                    }
                </Tabs>
            )
        }

        return null
    }
}

export default CustomTabs