import React from 'react'
import { Nav, Tab } from 'react-bootstrap'

import ProductSpecifications from './ProductSpecifications'
import ReturnConditions from './ReturnConditions'

class Tabs extends React.Component {
    render() {
        return (
            <Tab.Container defaultActiveKey='details'>
                <Nav variant='tabs' className={'pl-4 w-100'}>
                    <Nav.Item className={'mx-2'}>
                        <Nav.Link style={{ color: '#495057' }} eventKey='details'>Ürün Özellikleri</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={'mx-2'}>
                        <Nav.Link style={{ color: '#495057' }} eventKey='comments' disabled>Yorumlar (Aktif Değil)</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={'mx-2'}>
                        <Nav.Link style={{ color: '#495057' }} eventKey='return-conditions'>İade Koşulları</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className={'w-100'}>
                    <Tab.Pane eventKey='details'>
                        <ProductSpecifications details={this.props.details} specifications={this.props.specifications} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='comments'>
                    </Tab.Pane>
                    <Tab.Pane eventKey='return-conditions'>
                        <ReturnConditions />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        )
    }
}

export default Tabs