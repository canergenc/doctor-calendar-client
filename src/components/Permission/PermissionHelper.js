import { helperService } from "../../services/helper";
import { CalendarTypes, CalendarStatus, constants } from '../../variables/constants';


const getApproveFilter = (index) => {
    let approvedFilter = {
        filter: {
            skip: index*constants.PAGESIZE_INPERMISSION_PAGE,
            limit: constants.PAGESIZE_INPERMISSION_PAGE,

            where: {
                and: [{
                    groupId: {
                        like: helperService.getGroupId()
                    }
                }, {
                    type: {
                        neq: CalendarTypes.Nobet
                    },
                    status: CalendarStatus.Approve
                }]
            },

            include: [
                {
                    relation: "group"
                },
                {
                    relation: "user"
                },
                {
                    relation: "location"
                }
            ]
        }
    }
    return approvedFilter;
}


const getWaitingForApproveFilter = () => {
const  waitingForApproveFilter = {
        filter: {
            where: {
                and: [{
                    groupId: {
                        like: helperService.getGroupId()
                    }
                }, {
                    type: {
                        neq: CalendarTypes.Nobet
                    },
                    status: CalendarStatus.WaitingForApprove
                }]
            },
            include: [
                {
                    relation: "group"
                },
                {
                    relation: "user"
                },
                {
                    relation: "location"
                }
            ]
        }
    }

    return waitingForApproveFilter;
}


const getUniqGroupIds = (list) => {
    const uniqueTags = [];
    list.map(cal => {
        if (uniqueTags.indexOf(cal.calendarGroupId) === -1) {
            uniqueTags.push(cal.calendarGroupId)
        }
    });
    console.log(uniqueTags);
    return uniqueTags;
}

const getPermissionRejectFilter = (item) => {
    const filter = {
        where: {
            calendarGroupId: {
                like: item.calendarGroupId
            }
        }
    }

    return filter;
}

const getPermissionRejectData = () => {
    const data = {
        status: CalendarStatus.WaitingForApprove
    }

    return data;
}


export const permissionHelper = {
    getApproveFilter,
    getWaitingForApproveFilter,
    getUniqGroupIds,
    getPermissionRejectData,
    getPermissionRejectFilter

};