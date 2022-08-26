import './index.css'
import Header from '../HeaderRoute'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        className="not-found-image"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        we&apos;re sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
