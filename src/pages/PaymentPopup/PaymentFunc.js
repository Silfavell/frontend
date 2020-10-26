import React, { Component } from 'react'

export default class PaymentFunc extends Component {
    onChange = (event) => {
        if (event.target.maxLength === 1) {
            this.nameInput2.focus();
        }
        else
        {
            this.nameInput1.focus();
        }
    }

    onChangeFirst = (event) => {
        if (event.target.maxLength === 1) {
            this.nameInput3.focus();
        }   
        else
        {
            this.nameInput2.focus();
        }
    }

    onChangeSecond = (event) => {
        if (event.target.maxLength === 1) {
            this.nameInput4.focus();
        }
        else
        {
            this.nameInput3.focus();
        }
    }

    onChangeThird = (event) => {
        if (event.target.maxLength === 1) {
            this.nameInput4.focus();
        }
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    maxLength="1"
                    onChange={this.onChange}
                    ref={(input) => { this.nameInput1 = input; }}
                    />
                <input
                    type="text"
                    maxLength="1"
                    onChange={this.onChangeFirst}
                    ref={(input) => { this.nameInput2 = input; }}
                />
                <input
                    type="text"
                    maxLength="1"
                    onChange={this.onChangeSecond}
                    ref={(input) => { this.nameInput3 = input; }}
                />
                <input
                    type="text"
                    maxLength="1"
                    onChange={this.onChangeThird}
                    ref={(input) => { this.nameInput4 = input; }}
                />
            </div>
        )
    }
}
