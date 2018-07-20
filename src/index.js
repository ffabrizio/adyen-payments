import {loadPayments} from './payments';
import data from './data.json';

window.adyenPayments = loadPayments(data);
console.log('Ready...');