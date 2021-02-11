import React, { useEffect, useState } from 'react';
import { FileUtils } from '../../utils/file-utils';
import { DataUtils } from '../../utils/data-process.js';
import './Alerts.css';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, Icon, Segment, Button, Form } from 'semantic-ui-react';
import AlertMetrics from './AlertMetrics';
import {DETAILS_VIEW, COMMENTS_VIEW} from '../../constants/constants';
import { LineChart, Line, ReferenceDot, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
//import AlertButtons from './AlertButtons';

import {
	ADD_ANOMALY_LOCATION_DATA
} from '../../redux/action-types';

var _ = require('lodash');

function Alerts() {

      const anomalies = useSelector(state => state.anomalies);
      const data = useSelector(state => state.data_by_location);
      const [alertState, setAlertState] = useState([]);
      const [alertDisplayState, setAlertDisplayState] = useState([]);
      const dispatch = useDispatch()

      useEffect(() => {
          console.log('anomalies: ', anomalies)
          let numAnomalies = anomalies.length;

          let newAlertState = _.times(numAnomalies, null);
          let newAlertDisplayState = _.times(numAnomalies, null);

          newAlertState.fill(false)
          newAlertDisplayState.fill(DETAILS_VIEW);

          setAlertState(newAlertState);
          setAlertDisplayState(newAlertDisplayState);
      }, [anomalies]); // Only re-run the effect if anomalies change

    function AlertMessages(props) {
        let content = [];
        let messages = DataUtils.constructAlertMessage(props.anomaly)
        for(let i=0; i< messages.length; i++) {
            content.push(
                <div className="alert-description">
                    <div><Icon inverted color='red' name="exclamation icon"/>{ messages[i]}</div>
                </div>);
        }
        return content;
    }

    function openCloseAlert(i) {
        let newAlertState = Object.assign([], alertState)
        newAlertState[i] = !newAlertState[i];
        setAlertState(newAlertState)
    }

    function dismissAlert(i) {
        let newAnomalies = Object.assign([], anomalies)
        newAnomalies.splice(i, i+1);
        dispatch({ type: ADD_ANOMALY_LOCATION_DATA, data: newAnomalies})
    }
    function displayComments(i) {
        let newAlertDisplayState = Object.assign([], alertDisplayState);
        newAlertDisplayState[i] = COMMENTS_VIEW;
        setAlertDisplayState(newAlertDisplayState);
    }
    function displayDetails(i) {
        let newAlertDisplayState = Object.assign([], alertDisplayState);
        newAlertDisplayState[i] = DETAILS_VIEW;
        setAlertDisplayState(newAlertDisplayState);
    }

    function AlertButtons(props) {
        return(
           <div className="alert-button-container">


          </div>
          )
    }

    let content = []
        for(let i=0; i<anomalies.length; i++) {
                content.push (
                    <Segment style={{minHeight: '70px'}} inverted><Accordion inverted>
                      <Accordion.Title  active={alertState[i]} index={0}>
                        <Icon name='dropdown' className="alert-dropdown-icon"
                            onClick={() => openCloseAlert(i)}
                         />
                        {<div className="alert-heading">
                            <Icon inverted color='red' name='warning sign' />{anomalies[i].name + "  " +
                         anomalies[i].monthAndDay}
                             <Button id="dismiss-button" inverted size="mini" color='grey' className="alert-button"
                            onClick={() => dismissAlert(i)}>
                            <i class="close icon"></i>
                            Dismiss
                            </Button>
                         </div>
                         }
                      </Accordion.Title>
                      <Accordion.Content active={ alertState[i] }>
                         <div className="linebreak"/>
                         <div>
                            <AlertMessages anomaly={anomalies[i]}/>
                         </div>

                        <AlertMetrics data={data} anomaly={anomalies[i]}/>
                         <Button inverted color='grey' id="comment-button"
                            onClick={() => displayComments(i)}>
                            <i class="chat icon"></i>
                            Comment
                            </Button>
                        <div>{alertDisplayState[i] === COMMENTS_VIEW &&
                            <Form >
                                <Form.TextArea style={{backgroundColor: '#111', color: '#ccc'}} placeholder='Comments...' />
                            </Form>
                         }</div>
                      </Accordion.Content>
                    </Accordion>
                  </Segment>)

        }
    return content
  }

export default Alerts