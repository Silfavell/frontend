import VanillaToasts from 'vanillatoasts'
import Cookies from 'universal-cookie'

import {
  fetchOfflineCartProducts,
  increaseProductQuantity,
  decreaseProductQuantity,
  setProductQuantity as setProductQuantityRequest,
  getCartProducts as getCartProductsRequest,
  getCategories as getCategoriesRequest,
  listFavorites
} from '../../scripts/requests'

const cookies = new Cookies()

export const setCartToStorageOnIncrease = (productId, quantity) => {
  const cart = window.localStorage.getItem('cart')

  if (cart) {
    const cartAsArray = JSON.parse(cart)
    const foundProduct = cartAsArray.find((cartProduct) => cartProduct._id === productId)

    if (foundProduct) {
      cartAsArray[cartAsArray.indexOf(foundProduct)].quantity = quantity

      if (cartAsArray[cartAsArray.indexOf(foundProduct)].quantity < 1) {
        cartAsArray.splice(cartAsArray.indexOf(foundProduct), 1)
      }
    } else {
      cartAsArray.push({ _id: productId, quantity })
    }

    window.localStorage.setItem('cart', JSON.stringify(cartAsArray))
  } else {
    window.localStorage.setItem('cart', JSON.stringify([{ _id: productId, quantity }]))
  }
}

export const setCartToStorageOnDecrease = (productId, quantity) => {
  const cart = window.localStorage.getItem('cart')

  const cartAsArray = JSON.parse(cart)
  const foundProduct = cartAsArray.find((cartProduct) => cartProduct._id === productId)
  cartAsArray[cartAsArray.indexOf(foundProduct)].quantity -= quantity

  if (cartAsArray[cartAsArray.indexOf(foundProduct)].quantity < 1) {
    cartAsArray.splice(cartAsArray.indexOf(foundProduct), 1)
  }

  window.localStorage.setItem('cart', JSON.stringify(cartAsArray))
}

export const getCartProducts = async () => {
  const { data } = await getCartProductsRequest()

  return data?.cart ? Object.values(data.cart) : []
}

export const getFavoriteProducts = async () => {
  const { data } = await listFavorites()

  return data.favoriteProducts
}

export const getCategories = async () => {
  const { data } = await getCategoriesRequest()

  return data
}

export const onIncreaseClick = async (productId, quantity, dontShowToast, products) => {
  const { status, data } = await increaseProductQuantity(productId, quantity)

  if (status === 200) {
    const foundProduct = products.find(product => product._id === productId)

    if (foundProduct) {
      const indexOfFoundProduct = products.indexOf(foundProduct)
      products[indexOfFoundProduct] = { ...data, quantity: foundProduct.quantity + quantity }

      if (!cookies.get('token')) {
        setCartToStorageOnIncrease(productId, foundProduct.quantity + quantity)
      }
    } else {
      products.push({ ...data, quantity })

      if (!cookies.get('token')) {
        setCartToStorageOnIncrease(productId, quantity)
      }
    }

    if (!dontShowToast) {
      VanillaToasts.create({
        title: `Ürün sepete eklendi`,
        positionClass: 'topRight',
        type: 'success',
        timeout: 3 * 1000
      })
    }
  }

  return products
}

export const onDecreaseClick = async (productId, quantity, dontShowToast, products) => {
  const { status, data } = await decreaseProductQuantity(productId, quantity)

  if (status === 200) {
    const foundProduct = products.find(product => product._id === productId)

    if (foundProduct.quantity - quantity > 0) {
      const indexOfFoundProduct = products.indexOf(foundProduct)
      products[indexOfFoundProduct] = { ...data, quantity: foundProduct.quantity - quantity }

      if (!dontShowToast) {
        VanillaToasts.create({
          title: `Ürün sepetten çıkarıldı`,
          positionClass: 'topRight',
          type: 'success',
          timeout: 3 * 1000
        })
      }
    } else {
      const indexOfFoundProduct = products.indexOf(foundProduct)
      products.splice(indexOfFoundProduct, 1)

      if (!dontShowToast) {
        VanillaToasts.create({
          title: `Ürün sepetten çıkarıldı`,
          positionClass: 'topRight',
          type: 'success',
          timeout: 3 * 1000
        })
      }
    }

    if (!cookies.get('token')) {
      setCartToStorageOnDecrease(productId, quantity)
    }
  }

  return products
}

export const setProductQuantity = async (productId, quantity, products) => {
  const { status, data } = await setProductQuantityRequest(productId, quantity)

  if (status === 200) {
    const foundProduct = products.find(product => product._id === productId)
    const indexOfFoundProduct = products.indexOf(foundProduct)

    if (data.quantity) {
      products[indexOfFoundProduct] = { ...data, quantity }
    } else {
      products.splice(indexOfFoundProduct, 1)

      VanillaToasts.create({
        title: `Ürün sepetten çıkarıldı`,
        positionClass: 'topRight',
        type: 'success',
        timeout: 3 * 1000
      })
    }

    if (!cookies.get('token')) {
      setCartToStorageOnIncrease(productId, quantity)
    }

  }

  return products
}


export const getInitialDatas = async () => {
  if (cookies.get('token')) {
    const [categories, products, favoriteProducts] = await Promise.all([getCategories(), getCartProducts(), getFavoriteProducts()])
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts))

    return { categories, products }
  } else {
    const categories = await getCategories()
    const cart = window.localStorage.getItem('cart')

    if (cart) {
      const cartAsArray = JSON.parse(cart)
      if (cartAsArray.length > 0) {
        const { data } = await fetchOfflineCartProducts()

        return {
          categories,
          products: data.products.map((product, index) => Object.assign(product, { quantity: cartAsArray[index].quantity }))
        }
      }
    } else {
      return { categories, products: [] }
    }
  }

  setTimeout(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }, 100)
}