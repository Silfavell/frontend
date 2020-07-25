import React from 'react'
import { Nav, Tab } from 'react-bootstrap'

import Carousel from '../Carousel'

class Tabs extends React.Component {
    render() {
        return (
            <Tab.Container defaultActiveKey='details'>
                <Nav variant='tabs' className={'pl-4 w-100'}>
                    <Nav.Item className={'mx-2'}>
                        <Nav.Link style={{ color: '#495057' }} eventKey='details'>Kategori 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={'mx-2'}>
                        <Nav.Link style={{ color: '#495057' }} eventKey='comments'>Kategori 2</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className={'w-100'}>
                    <Tab.Pane eventKey='details'>
                        <Carousel
                            products={this.props.products}
                            onIncreaseClick={this.props.onIncreaseClick}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey='comments'>
                        <Carousel
                            products={this.props.products}
                            onIncreaseClick={this.props.onIncreaseClick}
                        />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        )
    }
}

export default Tabs