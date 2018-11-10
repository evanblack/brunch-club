import React, { Component } from 'react'
import { observer } from 'mobx-react'
// import mapboxgl from 'mapbox-gl'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './EventCard.css'
import { mapboxConfig, addeventConfig } from '../../../CONFIG'

// Configure AddEvent
window.addeventasync = () => {
  window.addeventatc.settings({
    license: addeventConfig.clientId,
    css: false
  })
}

const mapboxTileUrl = `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${
  mapboxConfig.accessToken
}`

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
  constructor(props) {
    super(props)
    this.mapEl = null
    this.mapLeaflet = null
    this.mapMapbox = null
    this.setupMap = this.setupMap.bind(this)
  }
  setupMap(el) {
    const { event: e } = this.props
    this.mapEl = el
    // Init Map
    const { latitude, longitude } = e.where.location
    this.mapLeaflet = L.map(`map_${e.id}`).setView([latitude, longitude], 13)
    L.tileLayer(mapboxTileUrl, {
      maxZoom: 18,
      attribution: 'Imagery ©<a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(this.mapLeaflet)
    // L.marker([latitude, longitude]).addTo(this.mapLeaflet)
    L.circle([latitude, longitude], {
      color: '#6200ee',
      fillColor: '#6200ee',
      fillOpacity: 0.25,
      weight: 1,
      radius: 250
    }).addTo(this.mapLeaflet)
    // mapboxgl.accessToken = mapboxConfig.accessToken
    // this.mapMapbox = new mapboxgl.Map({
    //   container: 'mapid',
    //   style: 'mapbox://styles/mapbox/streets-v10'
    // })
  }
  render() {
    const { event: e } = this.props
    return (
      <div className="mdc-card event-card">
        {e.where && e.where.location ? (
          <div className="mdc-card__media event-card__media">
            <div className="mdc-card__media-content">
              <div className="event-card__media__map" id={`map_${e.id}`} ref={this.setupMap} />
            </div>
          </div>
        ) : null}
        <div className="event-card__when">
          <h2 className="event-card__title mdc-typography--headline6">When</h2>
          <p className="event-card__subcontent mdc-typography--body2">{e.formattedDate}</p>
        </div>
        {e.where ? (
          <div className="event-card__where">
            <h2 className="event-card__title mdc-typography--headline6">Where</h2>
            <p className="event-card__subcontent mdc-typography--body2">
              <a target="_blank" href={`https://maps.google.com/?q=${e.where.address}`}>
                {e.where.name}
              </a>
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
            <button
              className="mdc-button mdc-card__action mdc-card__action--button"
              onClick={e.rsvp}>
              {e.isRsvpd ? `Cancel` : `RSVP`}
            </button>
            <button className="event-card__rsvp-number-button" onClick={e.toggleWhosIn}>
              <span className="event-card__rsvp-number mdc-typography--caption">
                {e.rsvps.size}
              </span>
            </button>
          </div>
          <div className="mdc-card__action-icons">
            {/*<button
              className="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
              title="Favorite">
              favorite_border
            </button>*/}
            {e.where ? (
              <button
                className="addeventatc material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
								data-dropdown-x="right"
                title="Remind Me"
                ref={() => {
                  window.addeventatc.refresh()
                }}>
                alarm
                <span className="start">{e.calendarDate}</span>
                <span className="timezone">America/Indiana/Indianapolis</span>
                <span className="title">Brunch Club ({e.where.name})</span>
                <span className="location">{e.where.address}</span>
                <span className="all_day_event">false</span>
                <span className="date_format">MM/DD/YYYY</span>
              </button>
            ) : null}
          </div>
        </div>
        {e.whosIn && e.rsvpData.length ? (
          <div className="event-card__rsvps">
            <p className="mdc-typography--body2">
              <span className="mdc-typography--subtitle2">Who's Going?&nbsp;</span>
              {e.rsvpData.map((m) => m.name).join(', ')}
            </p>
          </div>
        ) : null}
      </div>
    )
  }
}

export default observer(EventCard)
