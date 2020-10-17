import React from 'react'

import { onFilterLinkClick } from './scripts'

class Specifications extends React.PureComponent {
  render() {
    return (
      this.props.shop.specifications.map((specification, index) => (
        <div className='card mb-3'>
          <div className='card-header p-0 bg-white' id={`heading${index}`}>
            <h5 className='mb-0'>
              <button
                className='btn btn-link w-100 mx-3'
                style={{ textAlign: 'left', color: 'black', textDecoration: 'none' }}
                data-toggle='collapse'
                data-target={`#collapse${index}`}
                aria-expanded='false'
                aria-controls={`collapse${index}`}>
                {specification.name}
              </button>
            </h5>
          </div>

          <div
            id={`collapse${index}`}
            className={`collapse ${this.props.location.search.includes(specification.slug) ? 'show' : ''}`}
            aria-labelledby={`heading${index}`}>
            <div className='card-body'>
              {
                specification.values.map((specificationValue, index) => (
                  <a
                    className='d-flex align-items-center justify-content-start'
                    href={onFilterLinkClick({
                      filter: specification.slug,
                      filterValue: specificationValue.value,
                      multiple: true,
                      location: this.props.location
                    })}
                    key={specificationValue.slug}
                    htmlFor={specificationValue.slug}
                    style={{ cursor: 'pointer' }}>

                    <input
                      type='checkbox'
                      id={specificationValue.slug}
                      className='mr-2 mt-1'
                      style={{ cursor: 'pointer', width: 18, height: 18, pointerEvents: 'none' }}
                      checked={this.props.location.search.includes(`${specification.slug}=${specificationValue.value}`)}
                    />

                    <span className='text-black'>
                      {`${specificationValue.value} (${specificationValue.count})`}
                    </span>

                  </a>
                ))
              }
            </div>
          </div>
        </div>
      ))
    )
  }
}

export default Specifications