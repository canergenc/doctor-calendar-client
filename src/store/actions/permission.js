import * as actionTypes from "./actionTypes";
import { calendarService } from "../../services/calendar"


const createPermission = (data) => {
    return dispatch => {
        dispatch(createPermissionRequest());
        calendarService.createReminderService(data)
            .then(response => {
                dispatch(createPermissionSuccess(response));


            })
            .catch(err => {
                dispatch(createPermissionFailure(err));
            });
    }
}

const createPermissionRequest = () => {
    return {
        type: actionTypes.CREATE_PERMISSION_REQUEST,
    };
};

const createPermissionSuccess = (response) => {
    return {
        type: actionTypes.CREATE_PERMISSION_SUCCESS,
        response: response
    };
}

const createPermissionFailure = (err) => {
    return {
        type: actionTypes.CREATE_PERMISSION_FAILURE,
        errorObj: err,
    };
}




const updatePermission = (id,data, filterOrWaitingFor ,fiterOfApproved) => {
    return dispatch => {
        dispatch(updatePermissionRequest());
        calendarService.updateReminderService(id,data)
            .then(response => {
                dispatch(updatePermissionSuccess(response));
                dispatch(getPermissions(filterOrWaitingFor)); 
                dispatch(getApprovedPermissions(fiterOfApproved));     

            })
            .catch(err => {
                dispatch(updatePermissionFailure(err));
            });
    }
}

const updatePermissionRequest = () => {
    return {
        type: actionTypes.CREATE_PERMISSION_REQUEST,
    };
};

const updatePermissionSuccess = (response) => {
    return {
        type: actionTypes.CREATE_PERMISSION_SUCCESS,
        response: response
    };
}

const updatePermissionFailure = (err) => {
    return {
        type: actionTypes.CREATE_PERMISSION_FAILURE,
        errorObj: err,
    };
}


const getPermissions = (filterData) => {
    return dispatch => {
        dispatch(getPermissionsRequest());
        calendarService.getReminderService(filterData)
            .then(res => {
                let permissions = []
                if (res) {
                    res.forEach(element => {
                        if (element !== null) {
                            permissions.push(element);
                        }
                    });
                    dispatch(getPermissionsSuccess(permissions));
                }
            })
            .catch(err => {
                dispatch(getPermissionsFailed(err));
            });
    }
}

const getPermissionsRequest = () => {
    return {
        type: actionTypes.GET_PERMISSIONS_REQUEST
    };
};

const getPermissionsSuccess = (reminders) => {
    return {
        type: actionTypes.GET_PERMISSIONS_SUCCESS,
        response: reminders
    };
};

const getPermissionsFailed = (error) => {
    return {
        type: actionTypes.GET_PERMISSIONS_FAILURE,
        errorObj: error
    };
};




const getApprovedPermissions = (filter) => {
    return dispatch => {
        dispatch(getApprovedPermissionsRequest());
        calendarService.getReminderService(filter)
            .then(res => {
                const reminders = []
                if (res) {
                    res.forEach(element => {
                        if (element !== null) {
                            reminders.push(element);
                        }
                    });
                    dispatch(getApprovedPermissionsSuccess(reminders));
                }
            })
            .catch(err => {
                dispatch(getApprovedPermissionsFailure(err));
            });
    }
}



const getApprovedPermissionsRequest = () => {
    return {
        type: actionTypes.GET_APPROVED_PERMISSIONS_REQUEST,
    };
};

const getApprovedPermissionsSuccess = (reminders) => {
    return {
        type: actionTypes.GET_APPROVED_PERMISSIONS__SUCCESS,
        response: reminders
    };
}

const getApprovedPermissionsFailure = (err) => {
    return {
        type: actionTypes.GET_APPROVED_PERMISSIONS__FAILURE,
        errorObj: err,
    };
}







export const permission = {
    createPermission,
    getPermissions,
    getApprovedPermissions,
    updatePermission
};

