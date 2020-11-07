import React from 'react'

import { onFilterLinkClick } from '../scripts'

class AccordionItem extends React.PureComponent {
    render() {
        return (
            <a
                className='d-flex align-items-center justify-content-start'
                href={onFilterLinkClick({
                    filter: this.props.filterKey,
                    filterValue: this.props.filterValue,
                    multiple: true,
                    location: this.props.location
                })}
                key={this.props.id}
                htmlFor={this.props.id}
                style={{ cursor: 'pointer' }}>

                <input
                    type='checkbox'
                    id={this.props.id}
                    className='mr-2 mt-1'
                    style={{
                        cursor: 'pointer', width: 18, height: 18, pointerEvents: 'none'
                    }}
                    defaultChecked={this.props.location.search.includes(`${this.props.filterKey}=${this.props.filterValue.split(' ').join('+')}`)} />

                <span className='text-black'>
                    {`${this.props.filterValue} (${this.props.count})`}
                </span>
            </a>
        )
    }
}

export default AccordionItem
