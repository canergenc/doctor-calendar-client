import * as actionTypes from './actionTypes';
import api from '../../api';
import { groupService } from "../../services/group";
import { userGroupService } from "../../services/user.group";
import { helperService } from '../../services';
import history from "../../hoc/Config/history"

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

                var userId = helperService.getUserId();
                userGroupService.createUserGroup(userId, groupId)
                    .then((response) => {
                        console.log("ug", response);
                        dispatch(createUserGroupSuccess(response));
                        history.push('/admin/index');

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

export const userGroupActions = {
    createUserGroup
};





