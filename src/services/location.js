import request from "../hoc/Config/apiCentral";



const createBulkLocationService = (listOfLocation) => {
    return request({
        url: '/locations/bulk',
        method: 'POST',
        data: listOfLocation
        
    });
};

const updateBulkLocationService = (listOfLocation) => {
    return request({
        url: '/locations/bulk',
        method: 'PATCH',
        data: listOfLocation
    });
};

const getLocationsService = (filterData) => {
    return request({
        url: '/locations',
        method: 'GET',
        params: filterData
    });
};

const createLocationService = (data) => {
    return request({
        url: '/locations',
        method: 'POST',
        data: data
    });
};

const updateLocationService = (id, data) => {
    return request({
        url: '/locations/' + id,
        method: 'PATCH',
        data: data
    });
};

const deleteLocationService = (id) => {
    return request({
        url: '/locations/' + id,
        method: 'DELETE'
    })
}

export const locationService = {
    getLocationsService,
    createLocationService,
    updateLocationService,
    deleteLocationService,
    createBulkLocationService,
    updateBulkLocationService
}