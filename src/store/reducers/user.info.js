import * as actionTypes from '../actions/actionTypes';
import { constants } from '../../variables/constants';
import { helperService } from "../../services/helper";
const initialState = {
    id: null,
    email: "",
    fullName: "",
    title: "",
    deviceId: "",
    createdDate: "",
    updatedDate: "",
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERINFO_REQUEST:
            return {
                isReq: true,
                statusText: "",
                statusOfGetUser:false,
            };
        case actionTypes.USERINFO_SUCCESS:
            return {
                id: action.id,
                email: action.email,
                fullName: action.fullName,
                title: action.title,
                deviceId: action.deviceId,
                createdDate: action.createdDate,
                updatedDate: action.updatedDate,
                statusText: constants.SUCCESS_MESSAGE.loginSuccess,
                statusOfGetUser: true
            };
        case actionTypes.USERINFO_FAILURE:
            return {
                statusOfGetUser: false,
                statusTextInGet: helperService.getErrorMessage(action.erorObj)
            };



        case actionTypes.UPDATE_USERINFO_REQUEST:
            return {
                isReq: true,
            };
        case actionTypes.UPDATE_USERINFO_SUCCESS:
            return {
                isReq:false,
               responseInUpdate:action.response
            };
        case actionTypes.USERINFO_FAILURE:
            return {
                isReq: false,
                statusTextInUpdates: helperService.getErrorMessage(action.erorObj)
            };


        default:
            return state;
    }
}
export default reducer;