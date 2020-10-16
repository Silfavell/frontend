import React from 'react'

class Navbar extends React.PureComponent {
  render() {
    return (
      <div className='main-nav d-none d-lg-block'>
        <nav className='site-navigation text-right text-md-center' role='navigation'>
          <ul className='site-menu js-clone-nav d-none d-lg-block'>
            {
              this.props.categories.map((category) => (
                <li className={'has-children'} key={category._id}>
                  <a href={`/shop/${category.slug}`}>{category.name}</a>
                  <ul className='dropdown'>
                    {
                      category.subCategories.map((subCategory) => (
                        <li className={subCategory.types.length > 0 ? 'has-children' : ''} key={subCategory._id}>
                          <a href={`/shop/${category.slug}/${subCategory.slug}`}>{subCategory.name}</a>
                          {
                            subCategory.types.length > 0 && (
                              <ul className='dropdown'>
                                {
                                  subCategory.types.map((type) => (
                                    <li key={type._id}>
                                      <a href={`/shop/${category.slug}/${subCategory.slug}?type=${type.slug}`}>{type.name}</a>
                                    </li>
                                  ))
                                }
                              </ul>
                            )
                          }
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    )
  }
}

export default Navbar