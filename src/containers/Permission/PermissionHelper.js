import { helperService } from "../../services/helper";
import { CalendarTypes, CalendarStatus, constants } from '../../variables/constants';


const getApprovedFilter = (index, searchParam = '') => {
    let approvedFilter;
    if (searchParam) {

        approvedFilter = {
            filter: {

                skip: index * constants.PAGESIZE_INPERMISSION_PAGE,
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
                        status: CalendarStatus.Approve,
                        // description: {
                        //     like: searchParam
                        // }
                    }]
                },

                include: [
                    {
                        relation: "group"
                    },
                    {
                        relation: "user",
                        scope: {
                            where: {
                                or: [
                                    {
                                        fullName: {
                                            like: searchParam
                                        }
                                    }, {
                                        email: {
                                            like: searchParam
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        relation: "location"
                    }
                ]
            }

        }

    } else {

        approvedFilter = {
            filter: {
                skip: index * constants.PAGESIZE_INPERMISSION_PAGE,
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

    }





    return approvedFilter;
}

// const getApprovedSearchFilter = (searchParam ) => {

//     let approvedFilter = {
//         filter: {

//             where: {

//                 groupId: {
//                     like: helperService.getGroupId()
//                 },

//                 type: {
//                     neq: CalendarTypes.Nobet
//                 },
//                 status: CalendarStatus.Approve,

//                 include: [
//                     {
//                         relation: "group"
//                     },
//                     {
//                         relation: "user",
//                         scope: {
//                             where: {
//                                 or: [
//                                     {
//                                         fullName: {
//                                             like: searchParam
//                                         }
//                                     }, {
//                                         email: {
//                                             like: searchParam
//                                         }
//                                     }
//                                 ]
//                             }
//                         }
//                     },
//                     {
//                         relation: "location"
//                     }
//                 ]
//             }

//         }
//     }

//     return approvedFilter;
// }

const getApprovedSearchFilter = (searchParam = '') => {
    let waitingForApproveFilter;
    if (searchParam) {
        waitingForApproveFilter = {
            filter: {
                where: {

                    groupId: {
                        like: helperService.getGroupId()
                    },

                    type: {
                        neq: CalendarTypes.Nobet
                    },
                    status: CalendarStatus.Approve,

                    // description: {
                    //     like: searchParam
                    // }


                },
                include: [
                    {
                        relation: "group"
                    },
                    {
                        relation: "user",
                        scope: {
                            where: {
                                or: [
                                    {
                                        fullName: {
                                            like: searchParam
                                        }
                                    }, {
                                        email: {
                                            like: searchParam
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        relation: "location"
                    }
                ]
            }
        }

    } else {

        waitingForApproveFilter = {
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
                        status: CalendarStatus.WaitingForApprove,

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

    }



    return waitingForApproveFilter;
}



const getApprovedCountFilter = () => {
    let approvedFilter = {
        where: {

            groupId: {
                like: helperService.getGroupId()
            },

            type: {
                neq: CalendarTypes.Nobet
            },

            status: CalendarStatus.Approve
        }
    }
    return approvedFilter;
}

const getWaitingForApproveFilter = (searchParam = '') => {
    let waitingForApproveFilter;
    if (searchParam) {
        waitingForApproveFilter = {
            filter: {
                where: {

                    groupId: {
                        like: helperService.getGroupId()
                    },

                    type: {
                        neq: CalendarTypes.Nobet
                    },
                    status: CalendarStatus.WaitingForApprove,

                    // description: {
                    //     like: searchParam
                    // }


                },
                include: [
                    {
                        relation: "group"
                    },
                    {
                        relation: "user",
                        scope: {
                            where: {
                                or: [
                                    {
                                        fullName: {
                                            like: searchParam
                                        }
                                    }, {
                                        email: {
                                            like: searchParam
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        relation: "location"
                    }
                ]
            }
        }

    } else {

        waitingForApproveFilter = {
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
                        status: CalendarStatus.WaitingForApprove,

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

    }



    return waitingForApproveFilter;
}

const getWaitingForApproveCountFilter = () => {
    const waitingForApproveFilter = {
        where: {
            groupId: {
                like: helperService.getGroupId()
            },

            type: {
                neq: CalendarTypes.Nobet
            },
            status: CalendarStatus.WaitingForApprove
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

const getInitialUserFilter = () => {
    const filterData = {
        filter: {
            where: {
                groupId: {
                    like: helperService.getGroupId()
                }
            },
            include: [
                {
                    relation: "user"
                }
            ]
        }
    };

    return filterData;
}

export const permissionHelper = {
    getApprovedFilter,
    getApprovedSearchFilter,
    getWaitingForApproveFilter,
    getUniqGroupIds,
    getPermissionRejectData,
    getPermissionRejectFilter,
    getWaitingForApproveCountFilter,
    getApprovedCountFilter,
    getInitialUserFilter

};