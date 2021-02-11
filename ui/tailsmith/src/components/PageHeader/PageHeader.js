import React, { useEffect } from 'react';
import {FileUtils} from '../../utils/file-utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Accordion, Icon, Segment, Button, Form } from 'semantic-ui-react';
import "./PageHeader.css"



//---------------------------------------------------
//Map properties to the Redux state for easier access
//---------------------------------------------------

const mapStateToProps = function(state) {
	return {
		locationData: state.data_by_location,
	}
}

//---------------------------------------------------
//Map dispatch functions to appropriate Redux
//functions used for updating the Redux state
//---------------------------------------------------
const mapDispatchToProps = function(dispatch) {
	return bindActionCreators({
	}, dispatch)
}

function PageHeader() {

  // Component Did Mount
  useEffect(() => {
  }, []);

  return (
    <div className="PageHeader">
        <div className="charles-river-logo"/>
        <div className="title-header">Charles River Analytics</div>
        <div className="title-header" style={{color: '#95ddfc'}}>Pipeline Tracker</div>
        <div className="title-header-right" >Quit</div>
        <div className="title-header-right" style={{color: '#6DF3F3', left: '-25px', position: 'relative'}}>Operator 1</div>
        <div className="title-header-right" >User: </div>
        <Icon inverted size="large" className="title-header-right" color="teal" name="user circle outline" />
        {/* Take our Play Demo button */}
        {/*<Button id="demo-button" className="title-header-right" inverted size="mini"
            color='purple'>
            <i class="play icon"></i>
            Demo
        </Button>*/}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps) (PageHeader);