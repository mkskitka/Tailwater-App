

import { ANOMALY_FIELDS } from "../constants/constants"
import {
    MASS_ANOMALY,
    METER_PRESSURE_ANOMALY,
    METER_TEMPERATURE_ANOMALY,
    OBSERVED_DENSITY_ANOMALY,
    MASS_DERIV_ANOMALY,
    METER_PRESSURE_DERIV_ANOMALY,
    METER_TEMPERATURE_DERIV_ANOMALY,
    OBSERVED_DENSITY_DERIV_ANOMALY,
     } from "../constants/constants"

var _ = require('lodash');

/**
 * Data Utilities
 */



var dataUtils = {
		processRaw: function(raw_data) {
            let columns = raw_data[0]
            let processed_data = []
            for(let i=1; i<raw_data.length; i++) {
                let obj = {}
                for(let x=0; x<raw_data[i].length; x++) {
                    let field = cleanField(columns[x])
                    let value = cleanValue(raw_data[i][x], field)
                    obj[field] = value
                }
                obj.name = "Cimarron";
                processed_data.push(obj);
            }
            let processed_data_newest_to_oldest = _.reverse(processed_data);
            return processed_data_newest_to_oldest;
		},
		processAnomalies: function(processed_data) {
            let anomalies = [];
            for(let i=0; i<processed_data.length; i++) {
                for(let x=0; x < ANOMALY_FIELDS.length; x++) {
                    if(processed_data[i][ANOMALY_FIELDS[x]] === 1) {
                        let anomaly = processed_data[i]
                        addFields(anomaly, processed_data, i);
                        anomalies.push(anomaly);
                     }
                }
		    }
		    return anomalies;
		},
		removeRedundantAnomalies(anomalies) {
            let previous_entry = {}
            let oldest_to_newest = _.reverse(anomalies);
            let filtered_anomalies = [];
            for(let i=0; i<oldest_to_newest.length; i++) {
                let this_entry = oldest_to_newest[i];
                addRawFields(this_entry)
                 if(check_value_for_repeat(this_entry, previous_entry, i)) {
                    previous_entry = this_entry;
                    continue;
                 }
                previous_entry = this_entry;
                filtered_anomalies.push(this_entry);
		    }
		    return _.reverse(filtered_anomalies);
		},
		getAnomaliesByType: function(anomaly) {
		    let anomaly_by_type = {mass: false, pressure: false, temperature: false, density: false}
		    if (anomaly[MASS_ANOMALY] === 1 || anomaly[MASS_DERIV_ANOMALY] === 1) {
		        anomaly_by_type.mass = true;
		    }
            if (anomaly[METER_PRESSURE_ANOMALY] === 1 || anomaly[METER_PRESSURE_DERIV_ANOMALY] === 1) {
		        anomaly_by_type.pressure = true;
		    }
		    if (anomaly[METER_TEMPERATURE_ANOMALY] === 1 || anomaly[METER_TEMPERATURE_DERIV_ANOMALY] === 1) {
		        anomaly_by_type.temperature = true;
		    }
		    if (anomaly[OBSERVED_DENSITY_ANOMALY] === 1 || anomaly[OBSERVED_DENSITY_DERIV_ANOMALY] === 1) {
		        anomaly_by_type.density = true;
		    }
		    return anomaly_by_type;
		},
		constructAlertMessage: function(anomaly) {
		    let alert_content = [];
		    if (anomaly[MASS_ANOMALY] === 1) {
		        alert_content.push("Mass was measured at " + String(anomaly.Mass) + " lbs which is outside " +
		        "the normal range of " + String(anomaly.MassMin) + " and " + String(anomaly.MassMax) + " lbs.");
		    }
		    if (anomaly[METER_PRESSURE_ANOMALY] === 1) {
		       	alert_content.push("Pressure was measured at " + String(anomaly.MeterPressure) + " psig which is outside " +
		        "the normal range of " + String(anomaly.MeterPressureMin) + " and " + String(anomaly.MeterPressureMax) + " psig.");
		    }
		    if (anomaly[METER_TEMPERATURE_ANOMALY] === 1) {
		        alert_content.push("Temperature was measured at " + String(anomaly.MeterTemperature) + " °F which is outside " +
		        "the normal range of " + String(anomaly.MeterTemperatureMin) + " and " + String(anomaly.MeterTemperatureMax) + " °F.");
		    }
		    if (anomaly[OBSERVED_DENSITY_ANOMALY] === 1) {
		        alert_content.push("Density was measured at " + String(anomaly.ObservedDensity) + " which is outside " +
		        "the normal range of " + String(anomaly.ObservedDensityMin) + " and " + String(anomaly.ObservedDensityMax) + ".");
		    }
		    if (anomaly[MASS_DERIV_ANOMALY] === 1) {
		        alert_content.push("Mass changed from " + String(anomaly.PreviousMass) + " to " + anomaly.Mass +
		         " lbs. This change of " + String(Math.abs(anomaly.massChange)) +
		        " lbs and is outside " +
		        " the normal range of " + String(anomaly.MassDerivMin) + " and " + String(anomaly.MassDerivMax) + " lbs.");
		    }
		    if (anomaly[METER_PRESSURE_DERIV_ANOMALY] === 1) {
		        alert_content.push("Pressure changed from " + String(anomaly.PreviousMeterPressure) + " to " +
		        anomaly.MeterPressure + " psig. This is a change of " + String(Math.abs(anomaly.pressureChange)) +
		        " psig and is outside " +
		        " the normal range of " + String(anomaly.MeterPressureDerivMin) + " and " +
		         String(anomaly.MeterPressureDerivMax) + " psig.");
		    }
		    if (anomaly[METER_TEMPERATURE_DERIV_ANOMALY] === 1) {
		        alert_content.push("Temperature changed from " + String(anomaly.PreviousMeterTemperature) + " °F to " +
		        anomaly.MeterTemperature + " . This is a change of " + String(Math.abs(anomaly.temperatureChange)) +
		        " °F and is outside " +
		        " the normal range of " + String(anomaly.MeterTemperatureDerivMin) + " and " +
		         String(anomaly.MeterTemperatureDerivMax) + " °F.");
		    }
		    if (anomaly[OBSERVED_DENSITY_DERIV_ANOMALY] === 1) {
		        alert_content.push("Density changed from " + String(anomaly.PreviousObservedDensity) + " to " +
		         anomaly.ObservedDensity + ". This change of " + String(Math.abs(anomaly.densityChange)) +
		        " and is outside " +
		        " the normal range of " + String(anomaly.ObservedDensityDerivMin) + "  and " +
		         String(anomaly.ObservedDensityDerivMax) + " .");
		    }
		    return alert_content
		}
}

function isInt(n) {
   return n % 1 === 0;
}

function check_value_for_repeat(new_entry, previous_entry, x) {
    if(x === 0) {
        return false;
    }

    let new_types = dataUtils.getAnomaliesByType(new_entry);
    let prev_types = dataUtils.getAnomaliesByType(previous_entry);

    if(new_types.mass === prev_types.mass && new_types.pressure === prev_types.pressure &&
        new_types.temperature === prev_types.temperature && new_types.density === prev_types.density) {
            return true;
        }
    else {
        return false;
    }
}

function cleanField(field) {
    if(field.includes("Date")){
        field = field.substring(3)
    }
    return field
}

function cleanValue(value, field) {
    if(field !== "Date") {
        let newValue = parseFloat(value)
        if(!isInt(newValue))
        {
            if(field === "ObservedDensity" || field === "ObservedDensityDerivMin" || field === "ObservedDensityDerivMax") {
                newValue = newValue.toFixed(4)
            }
            else {
                newValue = newValue.toFixed(2)
            }
        }
        return newValue
    }
    return value
}

function addRawFields(datapoint) {
    let month = datapoint.Date.substring(0, datapoint.Date.indexOf('/'))
    datapoint.month = month ;
    let everything_but_month = datapoint.Date.substring(datapoint.Date.indexOf('/')+1, datapoint.Date.length)
    let day = everything_but_month.substring(0, everything_but_month.indexOf('/'))
    datapoint.jsDate = new Date(Date.parse(datapoint.Date))
    datapoint.day = day
    datapoint.monthAndDay = datapoint.month + "/" + datapoint.day
    datapoint.monthAndDayAndHour = datapoint.monthAndDay + " " + datapoint.Date.substring(datapoint.Date.indexOf(" "), datapoint.Date.length)
}

function addFields(anomaly, data, i) {
    if(i === data.length-1)
        return;

    anomaly.PreviousMass = data[i+1].Mass;
    anomaly.PreviousMeterPressure = data[i+1].MeterPressure;
    anomaly.PreviousMeterTemperature = data[i+1].MeterTemperature;
    anomaly.PreviousObservedDensity = data[i+1].ObservedDensity;
    anomaly.massChange = (anomaly.PreviousMass - anomaly.Mass).toFixed(3)
    anomaly.pressureChange = (anomaly.PreviousMeterPressure - anomaly.MeterPressure).toFixed(3)
    anomaly.temperatureChange = (anomaly.PreviousMeterTemperature - anomaly.MeterTemperature).toFixed(3)
    anomaly.densityChange = (anomaly.PreviousObservedDensity - anomaly.ObservedDensity).toFixed(3)

    if(anomaly.densityChange < 0) {
        anomaly.densityChangeSign = "drop"
    }
    else {
        anomaly.densityChangeSign = "increase"
    }
    if(anomaly.pressureChange < 0) {
        anomaly.pressureChangeSign = "drop"
    }
    else {
        anomaly.pressureChangeSign = "increase"
    }
    if(anomaly.massChange < 0) {
        anomaly.massChangeSign = "drop"
    }
    else {
        anomaly.massChangeSign = "increase"
    }
    if(anomaly.densityChange < 0) {
        anomaly.densityChangeSign = "drop"
    }
    else {
        anomaly.densityChangeSign = "increase"
    }
    anomaly.index = i;
}

export const DataUtils = {
	processRaw: dataUtils.processRaw,
	processAnomalies: dataUtils.processAnomalies,
	constructAlertMessage: dataUtils.constructAlertMessage,
	getAnomaliesByType: dataUtils.getAnomaliesByType,
	removeRedundantAnomalies: dataUtils.removeRedundantAnomalies
};