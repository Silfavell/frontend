import React from 'react'

import MultiSlider from 'multi-slider'
import { IoIosArrowForward } from 'react-icons/io'

import { onFilterLinkClick } from './scripts'

class Slider extends React.Component {
    constructor(props) {
        super(props)

        let { min } = this.props
        let { max } = this.props

        // eslint-disable-next-line
        this.props.location.search.split('&').map((q) => {
            if (q.includes('minPrice')) {
                min = parseInt(q.substring(q.indexOf('=') + 1), 2)
            } else if (q.includes('maxPrice')) {
                max = parseInt(q.substring(q.indexOf('=') + 1), 2)
            }
        })

        if (min < this.props.min || Number.isNaN(min)) min = this.props.min
        if (max > this.props.max || Number.isNaN(max)) max = this.props.max

        const distance = (this.props.max - this.props.min)

        this.state = {
            values: [distance - (this.props.max - min), this.props.max - this.props.min, this.props.max - max],
            max,
            min
        }
    }

    onSliderChange = (values) => {
        this.setState({ values, min: this.props.min + values[0], max: this.props.max - values[2] })
    }

    onChange = (event) => {
        const { name, value } = event.target

        if (!Number.isNaN(parseInt(value))) {
            this.setState({ [name]: parseInt(value) })
        }
    }

    onMaxChange = () => {
        const { values, min } = this.state
        let { max } = this.state
        const distance = (this.props.max - this.props.min)

        if (max < min) {
            max = min
        }

        if (max > this.props.max) {
            max = this.props.max
        }
        const maxOnSlider = this.props.max - max

        this.setState({
            values: [
                values[0],
                distance - (maxOnSlider + values[0]),
                maxOnSlider
            ],
            max
        })
    }

    onMinChange = () => {
        const { values, max } = this.state
        let { min } = this.state

        const distance = (this.props.max - this.props.min)

        if (min > max) {
            min = max
        }

        if (min < this.props.min) {
            min = this.props.min
        }

        const minOnSlider = min - this.props.min

        this.setState({
            values: [
                minOnSlider,
                distance - (minOnSlider + values[2]),
                values[2]
            ],
            min
        })
    }

    render() {
        const colors = ['#FCBD7E', '#EB9F71', '#E6817C']

        return (
            <div className='card mb-3'>
                <div className='card-header p-0 bg-white' id={`heading${'price'}`}>
                    <h5 className='mb-0'>
                        <button
                            className='btn btn-link w-100 mx-3'
                            style={{ textAlign: 'left', color: 'black', textDecoration: 'none' }}
                            data-toggle='collapse'
                            data-target={`#collapse${'price'}`}
                            aria-expanded='true'
                            aria-controls={`collapse${'price'}`}>
                            Fiyat Aralığı
                        </button>
                    </h5>
                </div>

                <div id={`collapse${'price'}`} className={`collapse ${this.props.location.search.includes('price') ? 'show' : ''}`} aria-labelledby={`heading${'price'}`}>
                    <div className='card-body'>
                        <div className='form-group pb-2 d-flex align-items-center justify-content-center'>
                            <div className='col-5 px-1'>
                                <input
                                    value={this.state.min}
                                    onBlur={this.onMinChange}
                                    onChange={this.onChange}
                                    type='text'
                                    className='form-control'
                                    id='min'
                                    name='min'
                                    placeholder='En Az' />
                            </div>
                            <div className='col-5 px-1'>
                                <input
                                    value={this.state.max}
                                    onBlur={this.onMaxChange}
                                    onChange={this.onChange}
                                    type='text'
                                    className='form-control'
                                    id='max'
                                    name='max'
                                    placeholder='En Çok' />
                            </div>
                            <div className='col-3 px-1'>
                                <a
                                    className='form-control'
                                    href={onFilterLinkClick({
                                        filter: 'price',
                                        filterValue: '',
                                        multiple: '',
                                        price: { min: this.state.min, max: this.state.max },
                                        location: this.props.location
                                    })}>
                                    <IoIosArrowForward />
                                </a>
                            </div>
                        </div>
                        <MultiSlider
                            colors={colors}
                            values={this.state.values}
                            onChange={this.onSliderChange} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Slider
