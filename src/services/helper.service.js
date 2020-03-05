import request from "../hoc/Config/apiCentral";
import { customVariables } from "../hoc/Config/customVariables";


const getErrorMessage = (err) => {

    console.log("foo", err);
    let errorMessage = "";
    let statusCode = err.status.toString();
    switch (statusCode) {
        case customVariables.ERORCODE[422]:
            errorMessage = err.data.error.details[0].message;
            return errorMessage;

        case customVariables.ERORCODE[400]:
            errorMessage = err.data.error.message;
            return errorMessage;

        default:
            return "İşlem başarısız. Lütfen tekrar deneyiniz.";
    }


}


export const helperService = {
    getErrorMessage
};
