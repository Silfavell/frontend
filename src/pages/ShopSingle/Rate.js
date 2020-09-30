import React from 'react'
import { IoIosStar, IoIosStarOutline, } from 'react-icons/io'

class Rate extends React.Component {
    state = {
        rate: 0,
        rateHover: 0,
        showRateHover: false
    }

    onRateContainerRef = (ref) => {
        this.rateContainerRef = ref
    }

    componentDidMount() {
        this.rateContainerRef.addEventListener('mouseenter', () => {
            this.setState({ showRateHover: true })
        })

        this.rateContainerRef.addEventListener('mouseleave', () => {
            this.setState({ showRateHover: false })
        })
    }

    render() {
        return (
            <li ref={this.onRateContainerRef} style={{ flexDirection: 'row', display: 'flex' }}>
                {
                    [1, 2, 3, 4, 5].map((rate) => {
                        if (this.state.showRateHover && rate <= this.state.rateHover) {
                            return (
                                <div>
                                    <IoIosStar style={{ cursor: 'pointer' }} size={32} color='orange'
                                        onMouseEnter={() => {
                                            this.setState({ rateHover: rate })
                                        }}
                                        onClick={() => {
                                            this.setState({ rate: rate })
                                        }} />
                                </div>
                            )
                        } else if (!this.state.showRateHover && rate <= this.state.rate) {
                            return (
                                <div>
                                    <IoIosStar style={{ cursor: 'pointer' }} size={32} color='orange'
                                        onMouseEnter={() => {
                                            this.setState({ rateHover: rate })
                                        }}
                                        onClick={() => {
                                            this.setState({ rate: rate })
                                        }} />
                                </div>
                            )
                        }

                        return (
                            <div>
                                <IoIosStarOutline style={{ cursor: 'pointer' }} size={32} color='orange'
                                    onMouseEnter={() => {
                                        this.setState({ rateHover: rate })
                                    }}
                                    onClick={() => {
                                        this.setState({ rate: rate })
                                    }} />
                            </div>
                        )
                    })
                }
            </li>
        )
    }
}


export default Rate