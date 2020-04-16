import { customVariables } from "../hoc/Config/customVariables";





const getErrorMessage = (err) => {

    let errorMessage = "";
    let statusCode = "";
    if (err && err.status) {
        statusCode = err.status.toString();
    }
    switch (statusCode) {
        case customVariables.ERRORCODE[422]:
            errorMessage = err.data.error.details.length > 0 ? err.data.error.details[0].message : 'İşlem sırasında hata oluştu'
            return errorMessage;

        case customVariables.ERRORCODE[400]:
            errorMessage = err.data.error.message;
            return errorMessage;
        default:
            return "İşlem başarısız. Lütfen tekrar deneyiniz.";
    }
}


const getUserId = () => {
    return localStorage.getItem(customVariables.USERID);
}


const getGroupId = () => {
    return localStorage.getItem(customVariables.GROUPID);
}


const getColorName = (index) => {
    var item = "";
    console.log(index);
    let listOfColorName = [
        "red",
        "orange",
        "yellow",
        "olive",
        "green",
        "teal",
        "blue",
        "violet",
        "purple",
        "pink",
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "light",
        "dark",
        "default",
        "white",
        "darker",
        "indigo",
        "cyan",
        "gray",
        "gray-dark",
        "lighter"
    ]

    if (index < listOfColorName.length) {
        item = listOfColorName[index];
    } else {
        item = listOfColorName[index % listOfColorName.length];
    }

    return item;
}

const generateRndStr = (length) => {

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "GRUP_" + result;
}


const GUID4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};


const countOfInWeekOrWeekend = (reminders) => {
    const result = { countOfOnWeekend: 0, countOfInWeek:0 }
    for (let index = 0; index < reminders.length; index++) {
        const reminder = reminders[index];
        if (reminder.isWeekend) {
            result.countOfOnWeekend += 1;
        } else {
            result.countOfInWeek += 1;
        }
    }
    return result;
}





const uniqGroupName = () => {
    return "";
}


const getPaginationItemCount=(totalListCount,pageSize)=>{
    let result= Math.ceil(totalListCount/pageSize)
    return  result;
}

export const helperService = {
    getErrorMessage,
    getGroupId,
    uniqGroupName,
    getUserId,
    generateRndStr,
    getColorName,
    countOfInWeekOrWeekend,
    GUID4,
    getPaginationItemCount

};
