import React, { Component, PropTypes } from 'react'
import FormFirstPage from './forms/form_one'
import FormSecondPage from './forms/form_two'
import FormThirdPage from './forms/form_three'
import Paper from 'material-ui/Paper'
import Animation from 'react-addons-css-transition-group'
import { Grid, Row, Col } from 'react-flexbox-grid';


class CreateCampaign extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1,
      slide: false
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1, slide: true })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      //<div className={`form-container ${this.state.slide ? 'slide' : ''}`}>


        <Grid className='form-container'>
          <Row center="xs">
            <Col xs={13} sm={12} md={2} lg={8}>
              <h1>PLEASE APPLY FOR THIS JOB BY REGISTERING WITH US.</h1>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12} sm={12} md={2} lg={8}>
              <Paper zDepth={4} rounded={false}>
                <Animation
                    transitionName='fade'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                >
                  {page === 1 && <FormFirstPage onSubmit={this.nextPage} />}
                  {page === 2 &&
                    <FormSecondPage
                      previousPage={this.previousPage}
                      onSubmit={this.nextPage}
                    />}
                  {page === 3 &&
                    <FormThirdPage
                      previousPage={this.previousPage}
                      onSubmit={onSubmit}
                    />}
                </Animation>
              </Paper>
            </Col>
          </Row>
        </Grid>


    )
  }
}

CreateCampaign.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default CreateCampaign
