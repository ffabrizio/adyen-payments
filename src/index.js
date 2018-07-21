import { loadPayments } from './payments';
import data from './sampledata.json';

const labels = { "cardDetails.cvc" : "Security Code" };

let payments = loadPayments(data, labels);

window.payments = payments;

console.log(`Loaded ${ payments.length } payments`);