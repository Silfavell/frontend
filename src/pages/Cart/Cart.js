import React from 'react'

import SiteWrapHoc from '../../components/SiteWrap/SiteWrap'
import EmptyCart from './EmptyCart'
import FilledCart from './FilledCart'

class Cart extends React.PureComponent {
    render() {
        if (this.props.products.length > 0) {
            return (
                <FilledCart
                    {...this.props}
                    history={this.props.history} />
            )
        }

        return <EmptyCart />
    }
}

const breadcrumb = [
    {
        path: null,
        title: 'Sepetim'
    }
]

export default SiteWrapHoc(Cart, { breadcrumb })
