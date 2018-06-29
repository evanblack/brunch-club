import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './EventCard.css'

// const ProgramCaptions = observer(({ text, on, ccMode, onClick, label }) => {
//   const isDisabled = ccMode === CAPTION_MODES.FORCED_ON ? true : false
//   const displayClass = on ? 'is-on' : 'is-off'
//   return (
//     <button
//       onClick={onClick}
//       disabled={isDisabled}
//       className={`EventCard-media-options-captioning ${displayClass}`}
//       title={label}
//       aria-label={label}>
//       <IconClosedCaptioning />
//       <span>{text}</span>
//     </button>
//   )
// })

class EventCard extends Component {
  render() {
    const { event: e } = this.props
    return (
      <div className="mdc-card event-card">
        {/*<div className="mdc-card__media event-card__media">
          <div className="mdc-card__media-content">
            <iframe
              frameBorder="0"
              src="https://www.google.com/maps/d/embed?mid=1tALyDa-yK9dKaM9j1KqOr3I1nLHm8hDt"
            />
          </div>
        </div>*/}
        <div className="event-card__when">
          <h2 className="event-card__title mdc-typography--headline6">When</h2>
          <p className="event-card__subcontent mdc-typography--body2">{e.formattedDate}</p>
        </div>
        {e.where ? (
          <div className="event-card__where">
            <h2 className="event-card__title mdc-typography--headline6">Where</h2>
            <p className="event-card__subcontent mdc-typography--body2">
              {e.where.name}
              <br />
              {e.where.address}
            </p>
          </div>
        ) : null}
        {/*<div className="event-card__secondary mdc-typography--body2">
          Visit ten places on our planet that are undergoing the biggest changes today.
        </div>*/}
        <div className="mdc-card__actions">
          <div className="mdc-card__action-buttons">
            <button className="mdc-button mdc-card__action mdc-card__action--button">RSVP</button>
            <span className="event-card__rsvp-number mdc-typography--caption">{e.rsvps}</span>
          </div>
          <div className="mdc-card__action-icons">
            <button
              className="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
              title="Favorite">
              favorite_border
            </button>
            <button
              className="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
              title="Remind Me">
              alarm
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(EventCard)
