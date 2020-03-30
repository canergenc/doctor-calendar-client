import * as actionTypes from './actionTypes';
import { locationService } from '../../services/index';
import history from "../../hoc/Config/history"




export const createBulkLocaition = (listOfLocaition) => {
    return dispatch => {
        dispatch(createBulkLocaitionRequest());

        locationService.createBulkLocationService(listOfLocaition)
            .then((response) => {
                //Success
                console.log(response);
                dispatch(createBulkLocaitionSuccess(response))
                history.push({
                    pathname: '/admin/index'
                })

            })
            .catch((error) => {
                console.log('HATA',error);
                dispatch(createBulkLocaitionFailure(error));
            });
    }
}


export const createBulkLocaitionRequest = () => {
    return {
        type: actionTypes.BULKLOCATION_REQUEST,
    };
};

export const createBulkLocaitionSuccess = (response) => {


    return {
        type: actionTypes.BULKLOCATION_SUCCESS,
        status: true
    };
}


export const createBulkLocaitionFailure = (err) => {
    return {
        type: actionTypes.BULKLOCATION_FAILURE,
        erorObj: err,
        status: false,
        statusCode: err.data.error.statusCode, // BadRequestError
        statusText: err.data.error.message,  // Invalid email or password
        statusName: err.data.error.name,   // BadRequestError
    };
}




//---------------------------------




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

export const initLocations = (filterData) => {
    return dispatch => {
        locationService.getLocationsService(filterData)
            .then(res => {
                const locations = [];
                res.forEach(element => {
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

export const deleteLocation = (locationId) => {
    return dispatch => {
        locationService.deleteLocationService(locationId).then(result => {
            dispatch(deleteLocationSuccess(locationId));
            const filterData = {
                filter: {
                    where: {
                        groupId: {
                            like: "5e81d18363226a009965dd49"
                        }
                    }
                }
            };
            dispatch(initLocations(filterData));
        }).catch(error => {
            dispatch(deleteLocationFailed(error));
        });
    };
};

export const deleteLocationSuccess = (id) => {
    return {
        type: actionTypes.DELETE_LOCATION,
        locationId: id
    };
};

export const deleteLocationFailed = (error) => {
    return {
        type: actionTypes.DELETE_LOCATION_FAIL,
        error: error
    };
};

export const createLocation = (locationData) => {
    return dispatch => {
        locationService.createLocationService(locationData)
            .then(response => {
                dispatch(createLocationSuccess(response.data.id, locationData));
                const filterData = {
                    filter: {
                        where: {
                            groupId: {
                                like: "5e81d18363226a009965dd49"
                            }
                        }
                    }
                };
                dispatch(initLocations(filterData));
            })
            .catch(error => {
                dispatch(createLocationFailed(error))
            });
    };
};

export const createLocationSuccess = (id, locationData) => {
    return {
        type: actionTypes.CREATE_LOCATION_SUCCESS,
        locationId: id,
        locationData: locationData
    };
};

export const createLocationFailed = (error) => {
    return {
        type: actionTypes.CREATE_LOCATION_FAIL,
        error: error
    };
};

export const updateLocation = (locationId, locationData) => {
    return dispatch => {
        locationService.updateLocationService(locationId, locationData)
            .then(response => {
                dispatch(updateLocationSuccess(response.data.id, locationData));
                const filterData = {
                    filter: {
                        where: {
                            groupId: {
                                like: "5e81d18363226a009965dd49"
                            }
                        }
                    }
                };
                dispatch(initLocations(filterData));
            })
            .catch(error => {
                dispatch(updateLocationFailed(error))
            });
    };
};

export const updateLocationSuccess = (id, locationData) => {
    return {
        type: actionTypes.UPDATE_LOCATION_SUCCESS,
        locationId: id,
        locationData: locationData
    };
};

export const updateLocationFailed = (error) => {
    return {
        type: actionTypes.UPDATE_LOCATION_FAIL,
        error: error
    };
};