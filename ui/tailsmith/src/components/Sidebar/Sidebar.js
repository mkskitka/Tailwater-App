import React, { useEffect } from 'react';
import { FileUtils } from '../../utils/file-utils';
import { useSelector } from 'react-redux';
import './Sidebar.css';
import { Accordion, Icon, Segment } from 'semantic-ui-react';
import Alerts from "../Alerts/Alerts";


function Sidebar() {

  const anomalies = useSelector(state => state.anomalies);
  // Component Did Mount
  useEffect(() => {
  }, []);


  return (
    <div className="Sidebar">
        <div className="alert-menu-bar-component active">
            {"Viewing Recent Alerts (" + anomalies.length +")"}
        </div>
        <div className="alert-menu-bar-component inactive">
            Alerts History
        </div>
        <div id="alerts-container">
            <Alerts/>
        </div>
    </div>
  );
}

export default Sidebar;