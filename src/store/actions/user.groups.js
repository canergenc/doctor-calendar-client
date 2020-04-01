import * as actionTypes from './actionTypes';
import { groupService } from "../../services/group";
import { userGroupService } from "../../services/user.group";
import { helperService } from '../../services';
import history from "../../hoc/Config/history"
import { customVariables } from '../../hoc/Config/customVariables';

const createUserGroup = (groupName) => {
    return dispatch => {
        dispatch(createUserGroupRequest());
        var name = "";
        if (groupName) {
            name = groupName
        } else {

            name = helperService.generateRndStr(10);
        }
        console.log(name);
        debugger;
        groupService.createGroup(name)
            .then((response) => {
                console.log('cg-s', response);
                var groupId = response.id;
                localStorage.setItem(customVariables.GROUPID,groupId)
                var userId = helperService.getUserId();
                userGroupService.createUserGroup(userId, groupId)
                    .then((response) => {
                        console.log("ug", response);
                        dispatch(createUserGroupSuccess(response));
                        history.push({
                            pathname: '/splash/location',
                            state: { groupId: response.id }
                        })



                    })
                    .catch((error) => {
                        dispatch((createUserGroupFailure(error)));

                    });
            })
            .catch((error) => {
                console.log('cg-e', error);
                dispatch((createUserGroupFailure));
            })
    }
}


const createUserGroupRequest = () => {
    return {
        type: actionTypes.CREATEUSERGROUP_REQUEST,
    };
};

const createUserGroupSuccess = (response) => {
    return {
        type: actionTypes.CREATEUSERGROUP_SUCCESS,
        id: response.id,
        groupId: response.groupId,
        status: true
    };
}


const createUserGroupFailure = (err) => {

    return {
        type: actionTypes.CREATEUSERGROUP_FAILURE,
        erorObj: err,
        statusCode: err.data.error.statusCode,
        statusText: err.data.error.message,
        statusName: err.data.error.name,
        status: false
    };
}


const createUserGroupBulk = (userGroupBulk) => {
    return dispatch => {
        dispatch(createUserGroupBulkRequest());

        userGroupService.createUserGroupBulk(userGroupBulk)
            .then((response) => {
                dispatch(createUserGroupBulkSuccess(response));
            })
            .catch((error) => {
                dispatch((createUserGroupBulkFailure(error)));
            });
    }
}


const createUserGroupBulkRequest = () => {
    return {
        type: actionTypes.CREATE_USERGROUPBULK_REQUEST,
    };
};

const createUserGroupBulkSuccess = (response) => {
    return {
        type: actionTypes.CREATE_USERGROUPBULK_SUCCESS,
        status: true
    };
}

const createUserGroupBulkFailure = (err) => {

    return {
        type: actionTypes.CREATE_USERGROUPBULK_FAILURE,
        erorObj: err,
        statusCode: err.data.error.statusCode,
        statusText: err.data.error.message,
        statusName: err.data.error.name,
        status: false
    };
}

export const userGroupActions = {
    createUserGroup,
    createUserGroupBulk
};





