import React from 'react'

import { Accordion, Card } from 'react-bootstrap'

import Comments from './Comments'
import ProductSpecifications from './ProductSpecifications'
import ReturnConditions from './ReturnConditions'

class ProductAccordion extends React.PureComponent {
    render() {
        return (
            <Accordion defaultActiveKey='0' className='w-100'>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey='details'>Ürün Özellikleri</Accordion.Toggle>
                    <Accordion.Collapse eventKey='details'>
                        <ProductSpecifications details={this.props.details} specifications={this.props.specifications} />
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey='comments'>Yorumlar</Accordion.Toggle>
                    <Accordion.Collapse eventKey='comments'>
                        <Comments productId={this.props.productId} comments={this.props.comments} />
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey='return-conditions'>İade Koşulları</Accordion.Toggle>
                    <Accordion.Collapse eventKey='return-conditions'>
                        <ReturnConditions />
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}

export default ProductAccordion
