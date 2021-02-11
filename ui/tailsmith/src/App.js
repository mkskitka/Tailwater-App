import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import { FileUtils } from './utils/file-utils';
import { DataUtils } from './utils/data-process'
import Sidebar from "./components/Sidebar/Sidebar";
import MapWindow from "./components/MapWindow/MapWindow";
import PageHeader from "./components/PageHeader/PageHeader";
import { Breadcrumb, Button, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'


import {
	ADD_LOCATION_DATA,
	ADD_ANOMALY_LOCATION_DATA
} from './redux/action-types';

var _ = require('lodash');

function App() {
const dispatch = useDispatch()
  useEffect(() => {
    async function doImportCSV() {
        let fileImportPromise = FileUtils.importCSV("testing")
        const [res] = await Promise.all([fileImportPromise]);
        let dataStr = JSON.stringify(res.data);
        let data = JSON.parse(dataStr);
        let processed_data = DataUtils.processRaw(data);
        let anomalies = DataUtils.processAnomalies(processed_data)
        let filtered_anomalies = DataUtils.removeRedundantAnomalies(anomalies);
        processed_data = _.reverse(processed_data);
        dispatch({ type: ADD_LOCATION_DATA, data: processed_data, name: "Cimarron", start_time: processed_data[0].Date })
        dispatch({ type: ADD_ANOMALY_LOCATION_DATA, data: filtered_anomalies})
    }
    doImportCSV()
  }, []);

  return (
    <div className="App">
        <PageHeader/>
        <Sidebar/>
        <MapWindow/>
    </div>
  );
}

export default App;
