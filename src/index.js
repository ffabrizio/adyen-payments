import {loadPayments} from './payments';
import data from './data.json';

const labels = {
    "cardDetails.cvc" : "Security Code"
};

window.adyenPayments = loadPayments(data, labels);