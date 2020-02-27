import * as actionTypes from './actionTypes';
import api from '../../api';

export const setLocations = (locations) => {
    return {
        type: actionTypes.SET_LOCATIONS,
        locations: locations
    };
};


export const fetchLocationsFailed = (error) => {
    return {
        type: actionTypes.FETCH_LOCATIONS_FAILED
    };
};


export const setActiveLocationId = (locationId) => {
    return {
        type: actionTypes.SET_ACTIVE_LOCATION_ID,
        activeLocationId: locationId
    };
};

export const initLocations = () => {
    return dispatch => {
        api.get('/locations')
            .then(res => {
                const locations = [];
                res.data.forEach(element => {
                    locations.push({
                        ...element
                    });
                });
                dispatch(setLocations(locations));
            })
            .catch(err => {
                dispatch(fetchLocationsFailed());
            });
    }
}

