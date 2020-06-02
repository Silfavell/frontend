/* eslint-disable */
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export default () => {
    // Add a request interceptor
    axios.interceptors.request.use((config) => { // Do something before request is sent
        //config.cancelToken = new axios.CancelToken((c) => {
        //    cancel = c
        //})

        if (config.headers.Authorization === 'DO_NOT_SET_AUTH') {
            delete config.headers.Authorization
        } else if (cookies.get('token')) {
            config.headers.Authorization = cookies.get('token')
        }

        return config
    }, (error) => // Do something with request error
        Promise.reject(error))

    // Add a response interceptor
    axios.interceptors.response.use((response) => // Do something with response data
        response,
        (error) => { // Do something with response error
            throw error
        })
}
