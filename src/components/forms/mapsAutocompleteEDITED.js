import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => {
      this.setState({ address })

    const { input: { value, onChange } } = this.props

    onChange(address)
    
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {

    const myStyles = {
      input: { padding: "6px" },
      autocompleteContainer: { backgroundColor: 'green', width: "100%"},
      autocompleteItem: { color: '#000', fontSize: "12px", padding: "3px" },
      autocompleteItemActive: { color: '#00BCD4' },
      googleLogoImage: { width: "100px"}
    }


    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Your address',
    }


    return (
      <PlacesAutocomplete styles={myStyles} inputProps={inputProps} 
      />
    )
  }
}



export default SimpleForm