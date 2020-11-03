import React from 'react'

import { onFilterLinkClick } from './scripts'

class ShopHeader extends React.PureComponent {
    render() {
        return (
            <div className='col-md-12 mb-4 d-flex'>
                <div className='btn-group mr-1 ml-md-auto'>
                    <button type='button' className='btn btn-white btn-sm dropdown-toggle px-4' id='dropdownMenuReference' data-toggle='dropdown'>Sırala</button>
                    <div className='dropdown-menu' aria-labelledby='dropdownMenuReference'>
                        {
                            /*
                  <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => this.onSortTypeClick(5)}>En Yüksek Puan</span>
                  <span className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => this.onSortTypeClick(6)}>En Çok Yorumlanan</span>
                  <div className='dropdown-divider' />
              */
                        }
                        <a
                            className='dropdown-item'
                            href={onFilterLinkClick({
                                filter: 'sortType',
                                filterValue: 0,
                                location: this.props.location
                            })}
                        >
                            Akıllı Sıralama
                        </a>

                        <a
                            className='dropdown-item'
                            href={onFilterLinkClick({
                                filter: 'sortType',
                                filterValue: 1,
                                location: this.props.location
                            })}
                        >
                            Çok Satanlar
                        </a>

                        <a
                            className='dropdown-item'
                            href={onFilterLinkClick({
                                filter: 'sortType',
                                filterValue: 2,
                                location: this.props.location
                            })}
                        >
                            En Yeniler
                        </a>

                        <a
                            className='dropdown-item'
                            href={onFilterLinkClick({
                                filter: 'sortType',
                                filterValue: 3,
                                location: this.props.location
                            })}
                        >
                            En Düşük Fiyat
                        </a>

                        <a
                            className='dropdown-item'
                            href={onFilterLinkClick({
                                filter: 'sortType',
                                filterValue: 4,
                                location: this.props.location
                            })}
                        >
                            En Yüksek Fiyat
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopHeader
