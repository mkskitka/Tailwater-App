import React, { useEffect, useState } from 'react';
import { FileUtils } from '../../utils/file-utils';
import { DataUtils } from '../../utils/data-process';
import { useSelector } from 'react-redux';
import "./MapWindow.css"
import { Breadcrumb, Button, Icon, Popup } from 'semantic-ui-react';
import { locations_map, GEO_VIEW, STICK_VIEW, FINANCIAL_VIEW, FINANCIAL_VIEW_2 } from '../../constants/constants';

let FIRST = false;

function MapWindow() {

  // Component Did Mount
  useEffect(() => {
  }, []);

 const [windowView, setWindowView] = useState(GEO_VIEW);
 const anomalies = useSelector(state => state.anomalies)
 console.log(anomalies)

function getBreadcrumbMenu() {
    return (
        <Breadcrumb>
        <Breadcrumb.Section onClick={() => setWindowView(GEO_VIEW)}> Pipeline Map (Geospatial) View </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link onClick={() => setWindowView(STICK_VIEW)}>Pipeline Map (Stick) View</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link>Pipeline Map (List) View</Breadcrumb.Section>
         <Breadcrumb.Divider />
        <Breadcrumb.Section active onClick={() => setWindowView(FINANCIAL_VIEW)}>Financial Impact View</Breadcrumb.Section>
         </Breadcrumb>
         );
  }

  function getLocationIcons() {
    let content = [];
     for (const [key, value] of Object.entries(locations_map)) {
        if(typeof(anomalies[0]) !== 'undefined') {
            let latest_anomaly = anomalies[0]
            let anomalies_by_type = DataUtils.getAnomaliesByType(latest_anomaly)
            content.push(
            <Popup inverted content={(key === "Cimarron") ?
                   <div>
                       <div> { key + " - " + latest_anomaly.Date } </div>
                       <div style={{height: '10px'}}></div>
                       <div>
                            <Icon inverted
                                size= "small"
                                name= {(anomalies_by_type.mass ? "warning sign" : "dot circle")}
                                color = {(anomalies_by_type.mass ? "red" : "green")}
                             />
                        { "Mass: " + latest_anomaly.Mass + " lbs" }</div>
                       <div>
                            <Icon inverted
                                size= "small"
                                name= {(anomalies_by_type.temperature ? "warning sign" : "dot circle")}
                                color = {(anomalies_by_type.temperature ? "red" : "green")}
                             />
                        {"Temp: " + latest_anomaly.MeterTemperature + " °F" } </div>
                       <div>
                             <Icon inverted
                                size= "small"
                                name= {(anomalies_by_type.pressure ? "warning sign" : "dot circle")}
                                color = {(anomalies_by_type.pressure ? "red" : "green")}
                             />
                       {"Pressure: " + latest_anomaly.MeterPressure + " psig"}</div>
                       <div>
                             <Icon inverted
                                size= "small"
                                name= {(anomalies_by_type.density ? "warning sign" : "dot circle")}
                                color = {(anomalies_by_type.density ? "red" : "green")}
                             />
                        {"Density: " + latest_anomaly.ObservedDensity}</div>
                   </div>
                   : <div>
                       <div> { key } </div>
                       <div style={{height: '10px'}}></div>
                       <div> {"Mass: N/A"} </div>
                       <div> {"Temp: N/A"} </div>
                       <div> {"Pressure: N/A"}</div>
                       <div> {"Density: N/A"}</div>
                   </div>}
                   trigger={
                  <Icon inverted style={{left: value.cx, top: value.cy, position: 'absolute'}}
                  name= {(value.anomalous ? "warning sign" : "dot circle")}
                  color = {(value.anomalous ? "red" : "green")}/>}
             />);
        }
     }
     return content;
  }
  function onFinancialClick() {
    if(FIRST === false) {
        FIRST = true;
        return
    }
    console.log("On Financial Click")
    setWindowView(FINANCIAL_VIEW_2)
  }

  return (
    <div className="MapWindow">
        { windowView === GEO_VIEW ?
            <div>
                <div className="floatTP" id= "map-background-image"/>
                <div className="floatTP" id= "icon-canvas">
                    {getLocationIcons()}
                </div>
            </div>
         : windowView === FINANCIAL_VIEW ?
            <div className="floatTP" id="financial-background-image" onClick={onFinancialClick()}/>
         : windowView === FINANCIAL_VIEW_2 ?
         <div className="floatTP" id="financial-background-image2"/>
         :
         <div className="floatTP" id="stick-background-image"/> }
      <div className="breadcrumb-menu">{getBreadcrumbMenu()}</div>
    </div>
  );
}

export default MapWindow;