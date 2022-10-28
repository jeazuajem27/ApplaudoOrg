import { LightningElement, api, track } from 'lwc';
//import Account_List from '@salesforce/label/c.Account_List'
import getAllExpenses from '@salesforce/apex/ExpenseController.getAllExpenses';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Amount', fieldName: 'Amount__c', type: 'currency' },
    { label: 'Expense Date', fieldName: 'Expense_Date__c', type: 'date' },
    { label: 'Category', fieldName: 'Category__c', type: 'picklist' },
];

export default class ExpenseList extends LightningElement {

    allExpenses = [];
    mainAllExpenses = [];
    country;
    state;
    columns = columns;
    AccountList = 'listAccount';

    connectedCallback() {
        this.getAllExpenses();
    }

    getAllExpenses(){
        getAllExpenses()
            .then(response => {
                this.allExpenses = response;
                this.mainAllExpenses = response;
                let Column = [];
                for(let item in response[0]){
                    Column.push({label : `${item}`, fieldName:`${item}`});
                }
                this.columns = Column;
            })
    }

}