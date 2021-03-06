import * as environment from '../environments/environment';

export default class Utils {

    public static END_POINT_BASE_URL = environment.environment.url;

    // USERS
    public static END_POINT_USERS = Utils.END_POINT_BASE_URL + "/user";
    public static END_POINT_USER_PERMISSIONS = Utils.END_POINT_USERS + "/permissions";
    public static END_POINT_USER_LOGGED_PROFILE = Utils.END_POINT_USERS + "/profile";

    // FILTERS
    public static END_POINT_FILTERS = Utils.END_POINT_BASE_URL + "/filter";
    public static END_POINT_FILTER = Utils.END_POINT_FILTERS + "/%s";

    // FILTERS
    public static END_POINT_ORDERS = Utils.END_POINT_BASE_URL + "/order/all";

    // COMPANIES
    public static END_POINT_COMPANIES = Utils.END_POINT_BASE_URL + "/company";
    public static END_POINT_COMPANY = Utils.END_POINT_COMPANIES + "/%s";
    public static END_POINT_COMPANY_DATA_USER_LOGGED = Utils.END_POINT_COMPANIES + "/data";
    public static END_POINT_COMPANIES_BY_DISTRICT = Utils.END_POINT_COMPANIES + "/district/%s";

    public static END_POINT_COMPANY_IMAGE = Utils.END_POINT_BASE_URL + "/upload/company/%s";

    // WORKED DAYS
    public static END_POINT_WORKED_DAYS = Utils.END_POINT_BASE_URL + "/worked_day";
    public static END_POINT_COMPANY_WORKED_DAYS = Utils.END_POINT_WORKED_DAYS + "/%s";

    // CATEGORIES
    public static END_POINT_CATEGORIES = Utils.END_POINT_BASE_URL + "/category";

    // DISTRICTS
    public static END_POINT_DISTRICTS = Utils.END_POINT_BASE_URL + "/district";
    public static END_POINT_COMPANY_DISTRICTS = Utils.END_POINT_DISTRICTS + "/%s";

    // PRODUCTS
    public static END_POINT_PRODUCTS = Utils.END_POINT_BASE_URL + "/product";
    public static END_POINT_COMPANY_PRODUCTS = Utils.END_POINT_PRODUCTS + "/%s";
    public static END_POINT_PRODUCT = Utils.END_POINT_PRODUCTS + "/%s";
    public static END_POINT_PRODUCT_DATA = Utils.END_POINT_PRODUCT + "/data";

    public static END_POINT_PRODUCT_IMAGE = Utils.END_POINT_BASE_URL + "/upload/product/%s";

    // AUTH
    public static END_POINT_AUTH_USER = Utils.END_POINT_BASE_URL + "/login";

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
