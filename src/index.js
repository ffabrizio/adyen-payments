import {configurePayments} from './payments';
import data from './data.json';

window.adyenPayments = configurePayments(data);