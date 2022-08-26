import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import JobRoute from './components/JobRoute'
import JobDetailsRoute from './components/JobDetailsRoute'
import NotFoundRoute from './components/NotFoundRoute'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/jobs" component={JobRoute} />
    <Route exact path="/jobs/:id" component={JobDetailsRoute} />
    <Route component={NotFoundRoute} />
  </Switch>
)

export default App
