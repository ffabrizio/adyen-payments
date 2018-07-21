import { loadPayments } from './payments';
import data from './sampledata.json';

const labels = { "cardDetails.cvc" : "Security Code" };

let payments = loadPayments(data, labels);

window.payments = payments;

/*
console.log(`Loaded ${ payments.length } payments`);
console.log(payments); 
let selectedPayment = payments[0]; 
console.log('selection', selectedPayment); 
console.log('schema', selectedPayment.schema); 
selectedPayment.setValue( { 'cardDetails.cvc' : 'ABCD'} ); 
console.log('value', selectedPayment.getValue()); 
console.log('schema', selectedPayment.schema);
*/