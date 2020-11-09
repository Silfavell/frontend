import React from 'react'

import { IoIosSearch, IoMdClose } from 'react-icons/io'

class SearchBarBottom extends React.PureComponent {
    render() {
        return (
            <div className='search-bottom'>
                <div className='input-group' style={{ border: '1px solid #E83E8C', zIndex: 11 }}>
                    <input
                        type='text'
                        className='form-control border-0'
                        style={{ backgroundColor: 'white', zIndex: 11 }}
                        placeholder='Ara'
                        onChange={this.props.onSearchTextChange}
                        value={this.props.searchText} />

                    <div className={`background ${this.props.searchedProducts.length > 0 ? 'visible' : ''}`} onClick={this.props.onSearchBackgroundClick} />

                    <div className='input-group-append' style={{ backgroundColor: 'white', zIndex: 11 }}>
                        <button className='btn' type='button'>
                            {
                                (this.props.searchText.length > 0 && this.props.searchedProducts.length > 0) && (
                                    <IoMdClose color='#8C92A0' size={26} onClick={this.props.onSearchClearClick} />
                                )
                            }
                            <IoIosSearch color='#8C92A0' size={26} onClick={this.props.onSearchClick} />
                        </button>
                    </div>
                </div>

                <div className={`search-results ${this.props.searchedProducts.length > 0 ? 'active-search' : ''}`}>
                    <div style={{ backgroundColor: 'white', paddingTop: 10 }}>
                        <div className='col-md-12'>
                            <div className='row'>
                                {
                                    this.props.searchedProducts.map((product) => (
                                        <a href={`/${product.slug}/p`} className='col-md-12 border-bottom p-3' style={{ cursor: 'pointer' }}>
                                            {product.name}
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBarBottom
