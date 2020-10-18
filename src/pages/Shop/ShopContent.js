import React from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import Cookies from 'universal-cookie'

import ShopProduct from '../../components/Product/ShopProduct'
import Slider from './Slider'
import Specifications from './Specifications'
import ShopHeader from './ShopHeader'

import {
  getPageText,
  isPageActive,
  maximumProductLengthInOnePage,
  onPageGtClick,
  onPageLtClick,
  onFilterLinkClick,
  getPageList
} from './scripts'

import './Shop.css'

const cookies = new Cookies()

class ShopContent extends React.PureComponent {
  getInitialValues = () => {
    const favoriteProducts = localStorage.getItem('favoriteProducts') ? JSON.parse(localStorage.getItem('favoriteProducts')) : []
    const loggedIn = cookies.get('token')
    this.props.location.search = decodeURIComponent(this.props.location.search)

    const s = new URLSearchParams(this.props.location.search)
    let type = s.get('type')
    let isFilterExists = false
    let clearFilterUrl

    if (type) {
      if (s.toString().includes('&')) {
        isFilterExists = true
        clearFilterUrl = `${this.props.location.pathname}?type=${type}`
      }
    } else {
      if (s.toString().includes('=')) {
        isFilterExists = true
        clearFilterUrl = this.props.location.pathname
      }
    }

    return {
      favoriteProducts,
      loggedIn,
      isFilterExists,
      clearFilterUrl
    }
  }

  render() {
    const {
      favoriteProducts,
      loggedIn,
      isFilterExists,
      clearFilterUrl
    } = this.getInitialValues()

    return (
      <div className='container'>
        <div className='row mb-5'>
          <div className='col-md-9 order-1'>
            <ShopHeader
              location={this.props.location} />
            <div className='row mb-5'>
              {
                this.props.shop.products.map((product) => (
                  <ShopProduct
                    key={product._id}
                    item={product}
                    onIncreaseClick={this.props.onIncreaseClick}
                    loggedIn={loggedIn}
                    favorite={favoriteProducts.includes(product._id)}
                  />
                ))
              }
            </div>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <div className='site-block-27'>
                  <ul>
                    <li>
                      <a
                        href={onPageLtClick({ location: this.props.location })}
                        style={{ marginLeft: 5, cursor: 'pointer', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IoIosArrowBack color={'#707070'} />
                      </a>
                    </li>
                    {
                      // pages
                      Array.from(getPageList({ shop: this.props.shop, location: this.props.location })).map((_, index) => (
                        <li
                          key={'page' + index}
                          style={{ marginLeft: 5, cursor: 'pointer' }}
                          className={isPageActive({ index, location: this.props.location }) ? 'active' : ''}
                        >
                          <a
                            className='text-black'
                            href={
                              onFilterLinkClick({
                                filter: 'start',
                                filterValue: (getPageText({
                                  index,
                                  location: this.props.location
                                }) - 1) * maximumProductLengthInOnePage,
                                keep: true,
                                location: this.props.location
                              })
                            }>
                            {getPageText({
                              index,
                              location: this.props.location
                            })}
                          </a>
                        </li>
                      ))
                    }
                    <li>
                      <a
                        href={onPageGtClick({
                          shop: this.props.shop,
                          location: this.props.location
                        })}
                        style={{ marginLeft: 5, cursor: 'pointer', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IoIosArrowForward color={'#707070'} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-3 order mb-5 mb-md-0'>

            {
              /*
                  <div className='border p-4 rounded mb-4 related-categories'>
                      <h3 className='h6 text-capitalize text-black d-block'>İlgili Kategoriler</h3>
                      <ul className='list-unstyled mb-0'>
                          {
                              currentCategory?.subCategories.map((subCategory) => (
                                  <li className='mb-1' key={subCategory._id}>
                                      <a className='d-flex text-primary'
                                          href={`/shop/${currentCategory.slug}/${subCategory.slug}`}>{subCategory.name}</a>
                                  </li>
                              ))
                          }
                      </ul>
                  </div>
              */
            }

            {
              isFilterExists && (
                <a href={clearFilterUrl} className='mb-3 d-flex align-items-end justify-content-end p-2 border' style={{ borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0' }}>
                  Filtreleri Temizle
                </a>
              )
            }

            <div className='card mb-3'>
              <div className='card-header p-0 bg-white' id={`heading${'brands'}`}>
                <h5 className='mb-0'>
                  <button
                    className='btn btn-link w-100 mx-3'
                    style={{ textAlign: 'left', color: 'black', textDecoration: 'none' }}
                    data-toggle='collapse'
                    data-target={`#collapse${'brands'}`}
                    aria-expanded='true'
                    aria-controls={`collapse${'brands'}`}>
                    {'Markalar'}
                  </button>
                </h5>
              </div>

              <div id={`collapse${'brands'}`} className={'collapse show'} aria-labelledby={`heading${'brands'}`}>
                <div className='card-body'>
                  {
                    this.props.shop.brands.map((brand, index) => (
                      <a
                        className='d-flex align-items-center justify-content-start'
                        href={onFilterLinkClick({
                          filter: 'brands',
                          filterValue: brand.name,
                          multiple: true,
                          location: this.props.location
                        })}
                        key={brand._id}
                        htmlFor={brand._id}
                        style={{ cursor: 'pointer' }}>

                        <input
                          type='checkbox'
                          id={brand._id}
                          brand={brand.name}
                          className='mr-2 mt-1'
                          style={{ cursor: 'pointer', width: 18, height: 18, pointerEvents: 'none' }}
                          checked={this.props.location.search.includes(`brands=${brand.name.split(' ').join('+')}`)} />

                        <span className='text-black'>
                          {`${brand.name} (${brand.count})`}
                        </span>
                      </a>
                    ))
                  }
                </div>
              </div>
            </div>

            <Specifications
              location={this.props.location}
              shop={this.props.shop}
            />

            {
              this.props.shop.maxPrice !== this.props.shop.minPrice && (
                <Slider
                  max={this.props.shop.maxPrice}
                  min={this.props.shop.minPrice}
                  location={this.props.location}
                />
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ShopContent