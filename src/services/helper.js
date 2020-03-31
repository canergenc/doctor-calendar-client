import { customVariables } from "../hoc/Config/customVariables";





const getErrorMessage = (err) => {

    let errorMessage = "";
    let statusCode = err.status.toString();
    switch (statusCode) {
        case customVariables.ERRORCODE[422]:
            errorMessage = err.data.error.details.length>0 ? err.data.error.details[0].message:'İşlem sırasında hata oluştu'
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
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark'
    ]

    item=listOfColorName[Math.floor(Math.random()*listOfColorName.length)];

    // if (index > listOfColorName.length) {
    //     item = listOfColorName[Math.floor(index / listOfColorName.length)];
    // } else {
    //     item = listOfColorName[index];
    // }
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





const uniqGroupName = () => {
    return "";
}

export const helperService = {
    getErrorMessage,
    getGroupId,
    uniqGroupName,
    getUserId,
    generateRndStr,
    getColorName

};
