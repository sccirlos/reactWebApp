import React from 'react';
import PropTypes from 'prop-types';
import { fetchInformation } from '../utils/api'
// return UI, used bootstrap here
function InformationNav({ active, onUpdateTab}) {
  const endpoints = ['films', 'people', 'species', 'vehicles']
  return (
      <nav className="nav justify-content-center mt-5 text-monospace">
      {endpoints.map((endpoint) => (
        <button key={endpoint} 
        className={(active === endpoint) ? "btn btn-sm mx-1 font-weight-bold active bg-dark text-light" : "btn btn-sm mx-1 font-weight-bold "}
        onClick={() => onUpdateTab(endpoint)}
       >{endpoint}</button>
      ))}
    </nav>
  )
}

InformationNav.propTypes = {
  active: PropTypes.string.isRequired,
  onUpdateTab: PropTypes.func.isRequired
}

function InfoMasonry ({ info }){
  return (
    <div className="card-columns container mt-5">
      {info.map((info, index) => {
        const { id, title, description} = info
        return (      
        <div className="card rounded-0  border-dark border-4" key={id} >
          <div className="card-header bg-secondary rounded-0 border-bottom border-dark border-4">
          </div>
          <div className="card-body text-monospace">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}  </p>
            <a href="####" className="text-dark">
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
            </a>
          </div>
        </div>
        )
      })}
    </div>
  )
}

InfoMasonry.propTypes = {
  info: PropTypes.array.isRequired,

}
// to import as index.js
// for each component
export default class Ghibli extends React.Component {
    constructor(props){
      super(props)
      
      this.state = {
        activeTab: 'films',
        info: null,
        error: null
      }

      this.updateTab = this.updateTab.bind(this)
      this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount(){
      this.updateTab(this.state.activeTab)
    }

    updateTab(activeTab){
      this.setState({
        activeTab,
        error: null,
        info:null
      })

      fetchInformation(activeTab)
        .then((info) => this.setState({
          error:null,
          info
        }))
        .catch((error)=>{
          console.warn('Error fetching repos: ', error)

          this.setState({
            error: `Error fetching information from endpoint rip`
          })
        })
    }

    isLoading(){
      return this.state.info === null && this.state.error === null
    }

    render(){
      const { activeTab, error, info } = this.state

      return (
        <React.Fragment>
          <InformationNav
            active={activeTab}
            onUpdateTab={ this.updateTab }/>

                
          {this.isLoading() && <p className="text-center"> LOADING </p>}
          {error && <p> { error } </p>}
          {info && <InfoMasonry info={info} />}
        </React.Fragment> 
      )
    }
}