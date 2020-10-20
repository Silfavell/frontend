import React from 'react'
import AccordionItem from './AccordionItem'
class AccordionContent extends React.PureComponent {
  render() {
    return (
      <div
        id={`collapse${this.props.id}`}
        className={`collapse ${this.props.show ? 'show' : ''}`}
        aria-labelledby={`heading${this.props.id}`}>
        <div className='card-body'>
          {
            this.props.items.map((item, index) => (
              <AccordionItem
                item={item}
                index={index}
                location={this.props.location}
                filterKey={this.props.itemFilterKey}
                filterValue={item[this.props.itemFilterValue]}
                id={item[this.props.itemSlug]}
                count={item[this.props.itemCount]}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default AccordionContent