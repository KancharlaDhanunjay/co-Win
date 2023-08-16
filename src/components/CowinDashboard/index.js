// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  pending: 'PENDING',
  failure: 'FAILURE',
}
class CowinDashboard extends Component {
  state = {coWinData: [], apiState: apiStates.initial}

  componentDidMount() {
    this.getCowinDetails()
  }

  getCowinDetails = async () => {
    this.setState({apiState: apiStates.pending})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const fetchCowinData = await response.json()
    console.log(fetchCowinData)

    if (response.ok === true) {
      const coWinData = {
        vaccinationCoverage: fetchCowinData.last_7_days_vaccination,
        vaccinationByGender: fetchCowinData.vaccination_by_gender,
        vaccinationByAge: fetchCowinData.vaccination_by_age,
      }
      this.setState({coWinData, apiState: apiStates.success})
    } else {
      this.setState({apiState: apiStates.failure})
    }
  }

  renderFailureApi = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <p className="failure-text">Something went wrong</p>
    </>
  )

  renderPendingApi = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessApi = () => {
    const {coWinData} = this.state
    const {
      vaccinationCoverage,
      vaccinationByGender,
      vaccinationByAge,
    } = coWinData
    return (
      <>
        <VaccinationCoverage vaccinationCoverage={vaccinationCoverage} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderPageView = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiStates.success:
        return this.renderSuccessApi()
      case apiStates.pending:
        return this.renderPendingApi()
      case apiStates.failure:
        return this.renderFailureApi()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="co-win-container">
          <div className="name-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="website-name">co-Win</h1>
          </div>
          <h1>coWin Vaccination in India</h1>
          {this.renderPageView()}
        </div>
      </>
    )
  }
}

export default CowinDashboard
