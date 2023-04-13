// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStared} = props
  const {id, title, date, isStared} = appointmentDetails

  const onClickStar = () => {
    toggleStared(id)
  }

  const imageUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-list-item">
      <div className="appointment-item">
        <p className="title">{title}</p>
        <button
          type="button"
          className="button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={imageUrl} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
