export default class Utils {

    public static END_POINT_BASE_URL = "http://localhost:8080";

    // USERS
    public static END_POINT_USERS = Utils.END_POINT_BASE_URL + "/user";

    // COMPANIES
    public static END_POINT_COMPANIES = Utils.END_POINT_BASE_URL + "/company";

    // AUTH
    public static END_POINT_AUTH_USER = Utils.END_POINT_BASE_URL + "/auth";

    /**
     * Generates phone mask to use in forms.
     * @returns (rawData:any)
     */
    public static getPhoneMask() {
        return function (rawData) {
            const treatedPhone = rawData.replace(/\D+/g, '');
            if (treatedPhone.length == 11) {
                return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
            } else if (treatedPhone.length == 0) {
                return '';
            } else {
                return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
            }
        };
    }

    /**
     * Generates phone mask to use in forms.
     * @returns (rawData:any)
     */
    public static getHourMask() {
        return function (rawData) {
            return [/\d/, /\d/, ':', /\d/, /\d/];
        };
    }

    /**
     * Generates money mask to use in forms.
     * @returns {(rawData:any)=>Array<any>}
     */
    public static getMoneyMask() {
        return function (rawData) {
            const staticMask: Array<string> = ['R', '$', ' '];
            const moneyMask: Array<any> = ['R', '$', ' '];
            let qtdAfterDot = 2;
            let alreadyAddedDot = false;
            if (rawData) {
                for (let i = 0; i < rawData.length; i++) {
                    if (staticMask.indexOf(rawData[i]) >= 0) {
                        continue;
                    }

                    if (rawData[i] == ',') {
                        if (!alreadyAddedDot) {
                            moneyMask.push(',');
                            alreadyAddedDot = true;
                        }
                    } else {
                        if (alreadyAddedDot) {
                            if (qtdAfterDot > 0) {
                                moneyMask.push(/\d/);
                                qtdAfterDot--;
                            }
                        } else {
                            moneyMask.push(/\d/);
                        }
                    }
                }
                return moneyMask;
            }
            return '';

        };
    }

    /**
     * Fix phone number with 9th digit.
     * @param phoneNumber - Phone number entered by user.
     * @returns {string} - Fixed 9th digit phone number.
     */
    public static adjustPhoneNumber(phoneNumber): string {
        if (phoneNumber == null) {
            return null;
        }

        phoneNumber = phoneNumber.replace(/\D+/g, '');
        if (phoneNumber.length == 10) {
            // Fix number without country code
            return phoneNumber.substring(0, 2) + '9' + phoneNumber.substring(2);
        } else if (phoneNumber.length == 12 && phoneNumber.indexOf('55') == 0) {
            // Fix Brazil number with country code
            return phoneNumber.substring(0, 4) + '9' + phoneNumber.substring(4);
        } else {
            return phoneNumber;
        }
    }

    /**
     * Generates phone id based on mask input data.
     * @param phoneNumber
     * @returns {string}
     */
    public static generatePhoneId(phoneNumber) {
        let adjustedNumber = Utils.adjustPhoneNumber(phoneNumber);
        if (adjustedNumber == null) {
            adjustedNumber = '';
        }
        return '55' + adjustedNumber.substr(0, 11);
    }
}
