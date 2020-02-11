import * as actionTypes from './actionTypes';
import api from '../../api';

export const setLocations = (locations) => {
    return {
        type: actionTypes.SET_LOCATIONS,
        locations: locations,
        activeLocationName: locations[0].name,
        activeLocationId: locations[0].id
    };
};

export const fetchLocationsFailed = (error) => {
    return {
        type: actionTypes.FETCH_LOCATIONS_FAILED
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