import * as actionTypes from './actionTypes';
import api from '../../api';

export const setLocations = (locations) => {
    return {
        type: actionTypes.SET_LOCATIONS,
        locations: locations,
        defaultLocationName: locations[0].name
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
                console.log('init Locations inside')
                console.log(res.data);

                const locations = [];
                for (let key in res.data) {
                    locations.push({
                        ...res.data[key],
                        id: key
                    });

                }
                console.log('init locations to array ');
                
                console.log(locations[0].name);

                dispatch(setLocations(locations));
            })
            .catch(err => {
                dispatch(fetchLocationsFailed());
            });
    }
}