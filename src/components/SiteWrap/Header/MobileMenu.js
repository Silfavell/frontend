import React from 'react'

import { IoIosArrowDown } from 'react-icons/io'

class MobileMenu extends React.PureComponent {
    render() {
        return (
            <div className='site-mobile-menu'>
                <div className='site-mobile-menu-body'>
                    <ul className='site-nav-wrap'>
                        {
                            this.props.categories.map((category) => (
                                <li className='has-children' key={category._id}>
                                    {
                                        category.subCategories.length > 0
                    && <IoIosArrowDown size={18} className='arrow-collapse collapsed' data-toggle='collapse' data-target={`#collapseItem${category._id}`} />
                                    }
                                    <a href={`/shop/${category.slug}`}>{category.name}</a>
                                    <ul className='collapse' id={`collapseItem${category._id}`}>
                                        {
                                            category.subCategories.map((subCategory) => (
                                                <li key={subCategory._id}>
                                                    <a href={`/shop/${category.slug}/${subCategory.slug}`}>{subCategory.name}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default MobileMenu
