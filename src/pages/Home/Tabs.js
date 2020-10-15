import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { getBestSellerProducts } from '../../scripts/requests'

import Carousel from '../../components/Carousel'

import './Tabs.css'

class CustomTabs extends React.Component {
    state = {
        bestSeller: []
    }

    async componentDidMount() {
        const { data } = await getBestSellerProducts()

        this.setState({ bestSeller: data })
    }

    render() {
        if (this.state.bestSeller.length > 0) {
            return (
                <Tabs defaultIndex={0} className='w-100'>
                    <TabList>
                        {
                            this.state.bestSeller.map((category) => (
                                <Tab key={'Tab:' + category.name}>{category.name}</Tab>
                            ))
                        }
                    </TabList>
                    {
                        this.state.bestSeller.map((category) => (
                            <TabPanel key={'TabPane:' + category.name} className='w-100'>
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