import * as actionTypes from './actionTypes';
import { locationService, helperService } from '../../services/index';
import history from "../../hoc/Config/history"

export const createBulkLocation = (listOfLocation) => {
    return dispatch => {
        dispatch(createBulkLocationRequest());

        locationService.createBulkLocationService(listOfLocation)
            .then((response) => {
                //Success
                console.log(response);
                dispatch(createBulkLocationSuccess(response))
                history.push({
                    pathname: '/admin/index'
                })

            })
            .catch((error) => {
                console.log('HATA', error);
                dispatch(createBulkLocationFailure(error));
            });
    }
}

export const createBulkLocationRequest = () => {
    return {
        type: actionTypes.CREATE_BULK_LOCATION_REQUEST,
    };
};

export const createBulkLocationSuccess = (response) => {
    return {
        type: actionTypes.CREATE_BULK_LOCATION_SUCCESS,
        response:response
    };
}

export const createBulkLocationFailure = (err) => {
    return {
        type: actionTypes.CREATE_BULK_LOCATION_FAILURE,
        erorObj: err,
    };
}

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

                var sortList = locations.map(function (location, index) {
                    return { index: index, value: location.sortOrder ? parseInt(location.sortOrder) : 0 };
                });

                sortList.sort(function (a, b) {
                    return +(a.value > b.value) || +(a.value === b.value) - 1;
                });

                var sortedLocations = sortList.map(function (e) {
                    return locations[e.index];
                });

                dispatch(setLocations(sortedLocations));
            })
            .catch(err => {
                dispatch(fetchLocationsFailed());
            });
    }
}

export const deleteLocation = (locationId) => {
    return dispatch => {
        locationService.deleteLocationService(locationId).then(result => {
            const filterData = {
                filter: {
                    where: {
                        groupId: {
                            like: helperService.getGroupId()
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
                const filterData = {
                    filter: {
                        where: {
                            groupId: {
                                like: helperService.getGroupId()
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
                const filterData = {
                    filter: {
                        where: {
                            groupId: {
                                like: helperService.getGroupId()
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

export const reorderLocation = (locationsData, startIndex, endIndex) => {
    return dispatch => {
        
        dispatch(reorderLocationStart(startIndex, endIndex))
        locationService.updateBulkLocationService(locationsData)
            .catch(error => {
                dispatch(updateLocationFailed(error))
            });;
    };
};

export const reorderLocationStart = (startIndex, endIndex) => {
    return {
        type: actionTypes.REORDER_LOCATION,
        startIndex: startIndex,
        endIndex: endIndex
    };
};
