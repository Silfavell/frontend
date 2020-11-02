import { getProductBySlug } from '../../scripts/requests'

const PagesThatHasDynamicBreadcrumb = {
  'Shop': 'Shop',
  'ShopSingle': 'ShopSingle'
}

export const dynamicBreadcrumb = async ({ page, categories, urlParams }) => {
  let breadcrumb = []

  if (page === PagesThatHasDynamicBreadcrumb.Shop) {
    const { category: categorySlug, subCategory: subCategorySlug } = urlParams
    const currentCategory = categories.find(category => category.slug === categorySlug)
    const currentSubCategory = subCategorySlug ? currentCategory?.subCategories.find((subCategory) => subCategory.slug === subCategorySlug) : null

    if (currentSubCategory) {
      breadcrumb = [
        {
          path: `/shop/${currentCategory?.slug}`,
          title: currentCategory?.name
        },
        {
          path: null,
          title: currentSubCategory.name
        }
      ]
    } else {
      breadcrumb = [
        {
          path: null,
          title: currentCategory?.name
        }
      ]
    }
  } else if (page === PagesThatHasDynamicBreadcrumb.ShopSingle && categories.length > 0) {
    const { data: product } = await getProductBySlug(urlParams.slug)

    const {
      categoryId,
      subCategoryId
    } = product

    const category = categories.find(category => category._id === categoryId)
    const subCategory = category?.subCategories.find((subCategory) => subCategory._id === subCategoryId)

    breadcrumb = [
      { path: `/shop/${category.slug}`, title: category.name },
      { path: `/shop/${category.slug}/${subCategory.slug}`, title: subCategory.name },
      { path: null, title: product.name }
    ]
  }

  return breadcrumb
}