import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import axios from './utils/axios'

import Home from './pages/Home'
import Contact from './pages/Contact'
import ShopSingle from './pages/ShopSingle'
import AboutUs from './pages/AboutUs'
import Shop from './pages/Shop'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import EditProfile from './pages/EditProfile'
import UpdatePassword from './pages/UpdatePassword'
import ForgotPassword from './pages/ForgotPassword'
import Payment from './pages/Payment'
import FavoriteProducts from './pages/FavoriteProducts'
import PreviousOrders from './pages/PreviousOrders'

axios()

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/contact' component={Contact} />
                    <Route exact path='/about-us' component={AboutUs} />
                    <Route exact path='/shop' component={Shop} />
                    <Route exact path='/sign-in' component={SignIn} />
                    <Route exact path='/sign-up' component={SignUp} />
                    <Route exact path='/cart' component={Cart} />
                    <Route exact path='/payment' component={Payment} />
                    <Route exact path='/edit-profile' component={EditProfile} />
                    {
                        // <Route exact path='/favorite-products' component={FavoriteProducts} />
                    }
                    <Route exact path='/previous-orders' component={PreviousOrders} />
                    <Route exact path='/update-password' component={UpdatePassword} />
                    <Route exact path='/forgot-password' component={ForgotPassword} />
                    <Route exact path='/:_id' component={ShopSingle} />
                </Switch>
            </Router >
        )
    }
}

export default App