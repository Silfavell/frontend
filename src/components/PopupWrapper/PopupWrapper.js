import React from 'react'
import { IoIosClose } from 'react-icons/io'


const PopupWrapperHoc = (WrappedComponent) => {
    return class extends React.PureComponent {
        onOutsideClick = (event) => {
            if (event.target !== event.currentTarget) {
                return
            }

            this.props.hidePopup()
        }

        onCloseClick = () => {
            this.props.hidePopup()
        }

        render() {
            return (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 999999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onClick={this.onOutsideClick}>
                    <div
                        className='col-md-7'
                        style={{
                            backgroundColor: 'white',
                            maxHeight: '90%',
                            width: '100%',
                            position: 'relative',
                            overflow: 'auto'
                        }}>
                        <IoIosClose
                            onClick={this.onCloseClick}
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                cursor: 'pointer',
                                zIndex: 11
                            }}
                            size={32}
                            color={'black'}
                        />

                        <WrappedComponent {...this.props} />
                    </div>
                </div>
            )
        }
    }
}

export default PopupWrapperHoc