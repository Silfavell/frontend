import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import 'dotenv/config'

import Home from './pages/Home'
import Contact from './pages/Contact'
import ShopSingle from './pages/ShopSingle'
import AboutUs from './pages/AboutUs'
import Shop from './pages/Shop'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import EditProfile from './pages/EditProfile'

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
                    <Route exact path='/edit-profile' component={EditProfile} />
                    <Route exact path='/:_id' component={ShopSingle} />
                </Switch>
            </Router >
        )
    }
}

export default App