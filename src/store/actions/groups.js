import * as actionTypes from './actionTypes';
import api from '../../api';

export const setGroups = (groups) => {
    return {
        type: actionTypes.SET_GROUPS,
        groups: groups
    };
};

export const fetchGroupsFailed = (error) => {
    return {
        type: actionTypes.FETCH_GROUPS_FAILED
    };
};

export const initGroups = () => {
    return dispatch => {
        api.get('/groups')
            .then(res => {
                const groups = [];
                res.data.forEach(element => {
                    groups.push({ ...element });
                });
                dispatch(setGroups(groups));
            })
            .catch(err => {
                dispatch(fetchGroupsFailed());
            })
    }
}