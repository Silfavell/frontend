import React from 'react'

import AccordionHeader from './Accordion/AccordionHeader'
import AccordionContent from './Accordion/AccordionContent'

class Specifications extends React.PureComponent {
  render() {
    return (
      this.props.shop.specifications.map((specification, index) => (
        <div className='card mb-3' key={`specification:${index}`}>
          <AccordionHeader
            title={specification.name}
            id={index}
          />

          <AccordionContent
            show={this.props.location.search.includes(specification.slug)}
            items={specification.values}
            id={index}
            location={this.props.location}
            itemFilterKey={specification.slug}
            itemFilterValue={'value'}
            itemKey={'slug'}
            itemCount={'count'}
          />
        </div>
      ))
    )
  }
}

export default Specifications