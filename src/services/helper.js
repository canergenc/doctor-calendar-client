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
        '#DB2828',
        '#F2711C',
        '#FBBD08',
        '#B5CC18',
        '#21BA45',
        '#00B5AD',
        '#2185D0',
        '#6435C9',
        '#A333C8',
        '#E03997',
        '#5e72e4',
        '#f7fafc',
        '#2dce89',
        '#11cdef',
        '#fb6340',
        '#f5365c',
        '#adb5bd',
        '#bfc0c2',
        '#fff',
        

    ]

    if(index<listOfColorName.length){
        item = listOfColorName[index];
    }else{
        item = listOfColorName[index%listOfColorName.length];
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
