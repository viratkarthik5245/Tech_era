import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechEra extends Component {
  state = {techList: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const Url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(Url)
    if (response.ok) {
      const data = await response.json()
      const updatedList = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({techList: updatedList, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-card">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {techList} = this.state
    return (
      <>
        <h1 className="main-heading">Courses</h1>
        <ul className="tech-ul-card">
          {techList.map(each => (
            <Link
              className="Link-card"
              to={`/courses/${each.id}`}
              key={each.id}
            >
              <li className="tech-app-icon">
                <img src={each.logoUrl} alt={each.name} />
                <p>{each.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  onClickRetry = () => {
    this.getData()
  }

  renderPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        {this.renderPageView()}
      </div>
    )
  }
}

export default TechEra
