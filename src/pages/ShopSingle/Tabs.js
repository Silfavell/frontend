import React from 'react'

import {
    Tab, Tabs, TabList, TabPanel
} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import Comments from './Comments'
import ProductSpecifications from './ProductSpecifications'
import ReturnConditions from './ReturnConditions'

import './Tabs.css'

class CustomTabs extends React.PureComponent {
    render() {
        return (
            <Tabs defaultIndex={0} className='w-100'>
                <TabList>
                    <Tab>Ürün Özellikleri</Tab>
                    <Tab>Yorumlar</Tab>
                    <Tab>İade Koşulları</Tab>
                </TabList>
                <TabPanel className='w-100'>
                    <ProductSpecifications details={this.props.details} specifications={this.props.specifications} />
                </TabPanel>
                <TabPanel className='w-100'>
                    <Comments productId={this.props.productId} comments={this.props.comments} />
                </TabPanel>
                <TabPanel className='w-100'>
                    <ReturnConditions />
                </TabPanel>
            </Tabs>
        )
    }
}

export default CustomTabs
