import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class AddAdmin extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Admin: React.PropTypes.object,
    }).isRequired
  }

  state = {
    email: '',
    password: '',
  }

  render () {
    return (
      <div>
        <input 
          placeholder="email"
          type="text" 
          name="email" 
          value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})}
          />
        <input 
          placeholder="password"
          type="text" 
          name="password" 
          value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})}
          />

        {this.canSave()
          ? <RaisedButton
              label="SUBMIT"
              primary={true}
              onClick={this.handleSave.bind(this)}
            />
          : <RaisedButton
              type="submit"
              label="SUBMIT"
              primary={true}
              disabled
            />
        }
      </div>
    )
  }
  
  canSave = () => {
    return this.state.email && this.state.password
  }

  handleSave = () => {
    window.alert(`\n\n${JSON.stringify(this.props.data, null, 2)}`)
    const {email, password} = this.state
    this.props.mutate({variables: {email, password}})
      .then(() => {
        const result = 
       `AdminID: ${this.props.data.Admin.admin_id},\n
        Email: ${this.props.data.Admin.email},\n
        Password: ${this.props.data.Admin.password}`

        //window.alert(`\n\n${JSON.stringify(result, null, 2)}`)
      })
  }
}



const AddAdminMutation = gql`
  mutation addAdmin($email: String!, $password: String!) {
    addAdmin(email: $email, password: $password) {
      Admin {
        admin_id,
        email,
        password
      }
    }
  }`

export default graphql(AddAdminMutation)(AddAdmin)

