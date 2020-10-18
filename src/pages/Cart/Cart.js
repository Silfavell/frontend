import React from 'react'

import EmptyCart from './EmptyCart'
import FilledCart from './FilledCart'
import SiteWrap from '../../components/SiteWrap/SiteWrap'

class Cart extends React.PureComponent {
    renderContent = (props) => {
        if (props.products.length > 0) {
            return <FilledCart {...props} />
        }

        return <EmptyCart />
    }

    render() {
        console.log('this')
        const breadcrumb = [
            {
                path: null,
                title: 'Sepetim'
            }
        ]

        return (
            <SiteWrap breadcrumb={breadcrumb}>
                <this.renderContent />
            </SiteWrap>
        )
    }
}

export default Cart