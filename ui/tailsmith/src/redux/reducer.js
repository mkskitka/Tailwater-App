/**
 * Conceptual Approach Reducers
 */
import {
	ADD_LOCATION_DATA,
	ADD_ANOMALY_LOCATION_DATA
} from './action-types';


const initialState = {
		data_by_location: [],
		anomalies: [],

};


function tailwaterReducer(state = initialState, action) {

	switch(action.type) {
	    case ADD_LOCATION_DATA :
        return Object.assign({}, state, {
            data_by_location: [
                ...state.data_by_location,
                {
                    name: action.name,
                    data: action.data,
                    start_time: action.start_time
                }
            ]
        })
    	case ADD_ANOMALY_LOCATION_DATA :
        return Object.assign({}, state, {
            anomalies: action.data
        })
	default:
		return state;
	}
}

export default tailwaterReducer;