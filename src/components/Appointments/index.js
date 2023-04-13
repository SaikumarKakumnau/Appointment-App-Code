// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isStaredFilter: false,
  }

  toggleStared = id => {
    this.setState(prevSate => ({
      appointmentsList: prevSate.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStared: !eachItem.isStared}
        }
        return eachItem
      }),
    }))
  }

  staredFilter = () => {
    const {isStaredFilter} = this.state
    this.setState({isStaredFilter: !isStaredFilter})
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  AddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const dateFormat = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateFormat,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isStaredFilter} = this.state

    if (isStaredFilter) {
      return appointmentsList.filter(eachItem => eachItem.isStared === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isStaredFilter} = this.state
    const filteredClassName = isStaredFilter ? 'filled-filter' : 'empty-filter'
    const filteredAppointments = this.getFilteredAppointments()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="input-container">
              <form className="form-container" onSubmit={this.AddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  value={titleInput}
                  id="title"
                  className="input-element"
                  onChange={this.onChangeTitle}
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  className="input-element"
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="app-image"
              />
            </div>
            <hr className="separator" />
            <div className="stared-filter-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filteredClassName}`}
                onClick={this.staredFilter}
              >
                Starred
              </button>
            </div>
            <ul className="filtered-List">
              {filteredAppointments.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentDetails={eachItem}
                  toggleStared={this.toggleStared}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
