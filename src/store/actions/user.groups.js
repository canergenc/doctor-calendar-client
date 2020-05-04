import * as actionTypes from './actionTypes';
import { groupService } from "../../services/group";
import { userGroupService } from "../../services/user.group";
import { helperService } from '../../services';
import history from "../../hoc/Config/history"
import { constants } from '../../variables/constants';

const createUserGroup = (groupName) => {
    return dispatch => {
        dispatch(createUserGroupRequest());
        var name = "";
        if (groupName) {
            name = groupName
        } else {

            name = helperService.generateRndStr(10);
        }
        groupService.createGroup(name)
            .then((response) => {
                var groupId = response.id;
                localStorage.setItem(constants.GROUPID, groupId)
                var userId = helperService.getUserId();
                userGroupService.createUserGroup(userId, groupId)
                    .then((response) => {
                        
                        dispatch(createUserGroupSuccess(response,groupId));
                        if (response) {
                            history.push({
                                pathname: '/splash/location',
                                state: { groupId: groupId }
                            })
                        }

                    })
                    .catch((error) => {
                        dispatch((createUserGroupFailure(error)));

                    });
            })
            .catch((error) => {
                dispatch((createUserGroupFailure));
            })
    }
}


const createUserGroupRequest = () => {
    return {
        type: actionTypes.CREATE_USER_GROUP_REQUEST,
    };
};

const createUserGroupSuccess = (response,groupId) => {
    return {
        type: actionTypes.CREATE_USER_GROUP_SUCCESS,
        response: response,
        groupId:groupId
        // id: response.id,
        // groupId: response.groupId,
    };
}


const createUserGroupFailure = (err) => {

    return {
        type: actionTypes.CREATE_USER_GROUP_FAILURE,
        erorObj: err,
    };
}




export const userGroupActions = {
    createUserGroup
};





