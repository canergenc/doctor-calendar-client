import { constants } from '../../../variables/constants';

import { helperService } from "../../../services/helper";



const getSearchFilter = (searchParam) => {
    const filterData = {
        filter: {
            where: {
                groupId: {
                    like: helperService.getGroupId()
                }
            },
            include: [
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
                            ],
                            
                        }
                    }
                }
            ]
        }
    }


    return filterData

}


const getInitCountFilter = () => {

    const filterData = {
        where: {
            groupId: {
                like: helperService.getGroupId()
            }
        },
        include: [
            {
                relation: "user",
            }
        ]
    }
    return filterData
}


const getFilter = () => {

    const filterData = {
        filter: {
            // skip: index* constants.PAGESIZE_INPERMISSION_PAGE,
            // limit: constants.PAGESIZE_INPERMISSION_PAGE,
            where: {
                groupId: {
                    like: helperService.getGroupId()
                }
            },
            include: [
                {
                    relation: "user",
                    
                        order:'workStartDate DESC'
                    
                }
            ]
        }

    }
    return filterData
}


export const personHelper = {
    //getSearchFilter,
    //getInitCountFilter,
    getFilter
};