const columnCount = 3
const rowCount = 6
export const maximumProductLengthInOnePage = rowCount * columnCount
export const maximumPageCount = 5

export const onFilterLinkClick = ({
    filter,
    filterValue,
    multiple,
    price,
    keep,
    location
}) => {
    const searchParams = new URLSearchParams(location.search)
    const searchParamsAsString = decodeURIComponent(searchParams.toString())

    if (searchParamsAsString.includes(`${filter}=${filterValue.toString().split(' ').join('+')}`) && !keep) {
        return `?${searchParamsAsString
            .replace(`&${filter}=${filterValue.toString().split(' ').join('+')}`, '')
            .replace(`${filter}=${filterValue.toString().split(' ').join('+')}`, '')}`
    }
    if (multiple) {
        searchParams.append(filter, filterValue)
        searchParams.delete('start')
    } else if (price) {
        searchParams.set('minPrice', price.min)
        searchParams.set('maxPrice', price.max)
    } else {
        searchParams.set(filter, filterValue)
    }

    return `?${searchParams.toString()}`
}

export const getStartingIndex = (location) => {
    const searchParams = new URLSearchParams(location.search)

    let start = 0

    for (const param of searchParams) {
        if (param[0] === 'start') {
            start = Number.isNaN(parseInt(param[1])) ? 0 : parseInt(param[1])
        }
    }

    return start
}

export const onPageGtClick = ({ shop, location }) => {
    const startingIndex = getStartingIndex(location)
    const startingIndexOfPage = startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount))

    if (shop.productsLength - startingIndexOfPage > maximumProductLengthInOnePage * maximumPageCount) {
        return onFilterLinkClick({
            filter: 'start',
            filterValue: startingIndex
        + (maximumProductLengthInOnePage * maximumPageCount)
        - ((startingIndex + maximumProductLengthInOnePage * maximumPageCount) % (maximumProductLengthInOnePage * maximumPageCount)),
            keep: true,
            location
        })
    }

    return onFilterLinkClick({
        filter: 'start',
        filterValue: shop.productsLength - (shop.productsLength % maximumProductLengthInOnePage),
        keep: true,
        location
    })
}

export const onPageLtClick = ({ location }) => {
    const startingIndex = getStartingIndex(location)
    const startingIndexOfPage = startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount))

    if (startingIndexOfPage >= maximumProductLengthInOnePage * maximumPageCount) {
        return onFilterLinkClick({
            filter: 'start',
            // TODO
            // eslint-disable-next-line no-mixed-operators
            filterValue: startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount) + maximumProductLengthInOnePage),
            location
        })
    }

    return onFilterLinkClick({
        filter: 'start',
        filterValue: 0,
        location
    })
}

export const getPageText = ({ index, location }) => (index + 1) + (Math.floor((getStartingIndex(location) + 1) / (maximumProductLengthInOnePage * maximumPageCount))) * maximumPageCount

export const isPageActive = ({ index, location }) => {
    const startingIndex = getStartingIndex(location)

    return (
        index + (Math.floor((startingIndex + 1) / (maximumProductLengthInOnePage * maximumPageCount))) * maximumPageCount
    === Math.floor((startingIndex - (startingIndex % maximumProductLengthInOnePage)) / maximumProductLengthInOnePage)
    )
}

export const getPageList = ({ shop, location }) => {
    const startingIndex = getStartingIndex(location)
    const startingIndexOfPage = startingIndex - (startingIndex % (maximumProductLengthInOnePage * maximumPageCount))

    return new Array(
        Math.ceil((shop.productsLength - startingIndexOfPage) / maximumProductLengthInOnePage) >= maximumPageCount
            ? maximumPageCount
            : Math.ceil((shop.productsLength - startingIndexOfPage) / maximumProductLengthInOnePage)
    )
}
