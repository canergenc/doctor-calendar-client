import * as actionTypes from "./actionTypes";
import { calendarService } from "../../services/calendar";
import { permissionHelper } from "../../containers/Permission/PermissionHelper";


const getPermissionsCount = (filterData) => {
    return dispatch => {
        dispatch(getPermissionsCountRequest());
        calendarService.getReminderService(filterData)
            .then(res => {

                let permissions = []
                let permissionCount = 0;
                if (res) {
                    res.forEach(element => {
                        if (element !== null && element.user && element.startDate && element.endDate) {
                            permissions.push(element);
                        }
                    });
                    permissionCount = permissions.length;
                }

                dispatch(getPermissionsCountSuccess(permissionCount));

            })
            .catch(err => {
                dispatch(getPermissionsCountFailure(err));
            });
    }
}

const getPermissionsCountRequest = () => {
    return {
        type: actionTypes.GET_PERMISSION_COUNT_REQUEST,
    };
};

const getPermissionsCountSuccess = (permissionCount) => {
    return {
        type: actionTypes.GET_PERMISSION_COUNT_SUCCESS,
        permissionCount: permissionCount
    };
}

const getPermissionsCountFailure = (err) => {
    return {
        type: actionTypes.GET_PERMISSION_COUNT_FAILURE,
        errorObj: err,
    };
}


const createPermission = (data) => {
    return dispatch => {
        dispatch(createPermissionRequest());
        calendarService.createReminderService(data)
            .then(response => {
                calendarService.getReminderService(permissionHelper.getWaitingForApproveFilter(0))
                    .then(res => {

                        let permissions = []
                        let permissionCount = 0;
                        if (res) {
                            res.forEach(element => {
                                if (element !== null && element.user && element.startDate && element.endDate) {
                                    permissions.push(element);
                                }
                            });
                            permissionCount = permissions.length;
                        }

                        dispatch(createPermissionSuccess(response, permissionCount));

                    })
                    .catch(err => {
                        dispatch(getPermissionsCountFailure(err));
                    });

            })
            .catch(err => {
                dispatch(createPermissionFailure(err));
            });
    }
}

const createPermissionRequest = () => {
    return {
        type: actionTypes.CREATE_PERMISSION_REQUEST
    };
};

const createPermissionSuccess = (response, permissionCount) => {
    return {
        type: actionTypes.CREATE_PERMISSION_SUCCESS,
        response: response,
        permissionCount: permissionCount
    };
}

const createPermissionFailure = (err) => {
    return {
        type: actionTypes.CREATE_PERMISSION_FAILURE,
        errorObj: err,
    };
}


const updatePermission = (id, data, filterOrWaitingFor, fiterOfApproved) => {
    return dispatch => {
        dispatch(updatePermissionRequest());
        calendarService.updateReminderService(id, data)
            .then(response => {

                calendarService.getReminderService(permissionHelper.getWaitingForApproveFilter(0))
                    .then(res => {

                        let permissions = []
                        let permissionCount = 0;
                        if (res) {
                            res.forEach(element => {
                                if (element !== null && element.user && element.startDate && element.endDate) {
                                    permissions.push(element);
                                }
                            });
                            permissionCount = permissions.length;
                        }

                        dispatch(updatePermissionSuccess(response, permissionCount));
                        dispatch(getPermissions(filterOrWaitingFor));
                        dispatch(getApprovedPermissions(fiterOfApproved));

                    })
                    .catch(err => {
                        dispatch(getPermissionsCountFailure(err));
                    });




            })
            .catch(err => {
                dispatch(updatePermissionFailure(err));
            });
    }
}

const updatePermissionRequest = () => {
    return {
        type: actionTypes.UPDATE_PERMISSION_REQUEST,
    };
};

const updatePermissionSuccess = (response, permissionCount) => {
    return {
        type: actionTypes.UPDATE_PERMISSION_SUCCESS,
        response: response,
        permissionCount: permissionCount
    };
}

const updatePermissionFailure = (err) => {
    return {
        type: actionTypes.UPDATE_PERMISSION_FAILURE,
        errorObj: err,
    };
}


const getPermissions = (filterData) => {
    return dispatch => {
        dispatch(getPermissionsRequest());
        calendarService.getReminderService(filterData)
            .then(res => {
                let permissions = []
                let permissionCount = 0;
                if (res) {
                    res.forEach(element => {
                        if (element !== null && element.user && element.startDate && element.endDate) {
                            permissions.push(element);
                        }
                    });
                    permissionCount = permissions.length;
                }
                dispatch(getPermissionsSuccess(permissions, permissionCount));
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

const getPermissionsSuccess = (permissions, permissionCount) => {
    return {

        type: actionTypes.GET_PERMISSIONS_SUCCESS,
        response: permissions,
        permissionCount: permissionCount
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
                let permissions = []
                let permissionCount = 0;
                if (res) {
                    if (res) {
                        res.forEach(element => {
                            if (element !== null && element.user && element.startDate && element.endDate) {
                                permissions.push(element);
                            }
                        });

                        permissionCount = permissions.length;
                    }
                }
                dispatch(getApprovedPermissionsSuccess(permissions, permissionCount));
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

const getApprovedPermissionsSuccess = (permissions, permissionCount) => {
    return {
        type: actionTypes.GET_APPROVED_PERMISSIONS__SUCCESS,
        response: permissions,
        permissionCount: permissionCount
    };
}

const getApprovedPermissionsFailure = (err) => {
    return {
        type: actionTypes.GET_APPROVED_PERMISSIONS__FAILURE,
        errorObj: err,
    };
};

const cleanFlagsPermissions = () => {
    return {
        type: actionTypes.PERMISSIONS_CLEAN_FLAGS
    }
};


export const permission = {
    getPermissionsCount,
    createPermission,
    getPermissions,
    getApprovedPermissions,
    updatePermission,
    cleanFlagsPermissions
};

