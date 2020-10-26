import React, { Component } from 'react'

export default class PaymentFunc extends Component {
    onChange = (event) => {
        if (event.target.maxLength === 1) {
            this.nameInput.focus();
        }
    }

    onChangeFirst = (event) => {
        if (event.target.maxLength === 1) {
            this.nameInput1.focus();
        }
        else
        {
            this.nameInput.focus();
        }
    }

    onChangeSecond = (event) => {
        if (event.target.maxLength === 1) {
            this.nameInput2.focus();
        }
       
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    maxLength="1"
                    onChange={this.onChange} />
                <input
                    type="text"
                    maxLength="1"
                    onChange={this.onChangeFirst}
                    ref={(input) => { this.nameInput = input; }}
                />
                <input
                    type="text"
                    maxLength="1"
                    onChange={this.onChangeSecond}
                    ref={(input) => { this.nameInput1 = input; }}
                />
                <input
                    type="text"
                    maxLength="1"
                    ref={(input) => { this.nameInput2 = input; }}
                />
            </div>
        )
    }
}
