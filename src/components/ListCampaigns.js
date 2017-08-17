import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

import {fetchCampaigns} from '../actions';

import {Card, CardActions, CardHeader,
  CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



class ListCampaigns extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  handleExpandChange = (expanded) =>{
    this.setState({expanded: expanded});
  };
  handleExpand = () =>{
    if(this.state.expanded === false){
      this.setState({expanded: true});
    }else{
      this.setState({expanded: false});
    }

  };
  handleReduce = () =>{
    this.setState({expanded: false});
  };

  componentDidMount(){
    this.props.fetchCampaigns();
  }

  renderCampaigns(){
    return _.map(this.props.campaigns, campaign => {
      return(
        <li key={campaign.id} >
        <Row center="xs" >
          <Col xs={6} md={3}>
            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
              <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Expand" onTouchTap={this.handleExpand} />
                <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
                <Link to={`/campaigns/${campaign.id}`}>
                  {campaign.position}
                </Link>
              </CardActions>
            </Card>

          </Col>
        </Row>
        </li>
      );
    });
  }

  render() {

    return (
      <Grid fluid>
        <ul>
          {this.renderCampaigns()}
        </ul>

      </Grid>
    );
  }
}
function mapStateToProps(state){
  return { campaigns: state.campaigns}
}

export default connect(mapStateToProps, {fetchCampaigns})(ListCampaigns);
