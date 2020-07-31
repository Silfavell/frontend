import React from 'react'
import MultiSlider from 'multi-slider'

import { IoIosArrowForward } from 'react-icons/io'

class Slider extends React.Component {
    state = {
        values: [0, this.props.max, 0],
        max: this.props.max,
        min: 0
    }

    onSliderChange = (values) => {
        this.setState({ values, min: values[0], max: this.props.max - values[2] })
    }

    onChange = (event) => {
        const { name, value } = event.target

        if (!Number.isNaN(parseInt(value))) {
            this.setState({ [name]: parseInt(value) })
        }
    }

    onMaxChange = (event) => {
        let { values, max } = this.state

        max = this.props.max - max

        let maxOnSlider = max < values[0] ? values[0] : max
        maxOnSlider = maxOnSlider > this.props.max ? this.props.max : maxOnSlider
        maxOnSlider = maxOnSlider + values[0] > this.props.max ? this.props.max - values[0] : maxOnSlider
        maxOnSlider = max < 0 ? 0 : maxOnSlider

        this.setState({
            values: [
                values[0],
                this.props.max - (maxOnSlider + values[0]),
                maxOnSlider
            ],
            max: this.props.max - maxOnSlider,
            min: values[0]
        })
    }

    onMinChange = (event) => {
        const { values, min } = this.state

        let minOnSlider = min > (this.props.max - values[2]) ? values[2] : min
        minOnSlider = minOnSlider < 0 ? 0 : minOnSlider
        minOnSlider = minOnSlider + values[2] > this.props.max ? this.props.max - values[2] : minOnSlider

        this.setState({
            values: [
                minOnSlider,
                this.props.max - (minOnSlider + values[2]),
                values[2]
            ],
            min: minOnSlider,
            max: this.props.max - values[2]
        })
    }

    render() {
        var colors = ['#FCBD7E', '#EB9F71', '#E6817C']

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
                            {'Fiyat Aralığı'}
                        </button>
                    </h5>
                </div>

                <div id={`collapse${'price'}`} className={'collapse show'} aria-labelledby={`heading${'price'}`}>
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
                                <button className='form-control'>
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </div>
                        <MultiSlider
                            colors={colors}
                            values={this.state.values}
                            onChange={this.onSliderChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Slider