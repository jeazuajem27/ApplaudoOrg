import { LightningElement, api, wire} from 'lwc';
import getExpenses from '@salesforce/apex/ExpenseController.getExpenses';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import categoryField from '@salesforce/schema/Expense__c.Category__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import EXPENSE_OBJECT from '@salesforce/schema/Expense__c';

export default class ExpenseCreator extends LightningElement {
    @api recordId;
    @wire(getObjectInfo, { objectApiName: EXPENSE_OBJECT })
    expenseInfo;

    @wire(getPicklistValues,
        {
            recordTypeId: '$expenseInfo.data.defaultRecordTypeId',
            fieldApiName: categoryField
        }
    )
    categoryFieldValues;

    expense = {};

    connectedCallback() {
        this.getExpenses();

    }

    getExpenses(){
        console.log('print this.recordId ' + this.recordId);
        getExpenses({
            recordId : this.recordId,
        }).then(result => {
            console.log('print result ' + result);
            this.expense = result;
        }).catch(error => {
            window.console.error(error);
        })
    }

    handleChangeCategory(event) {
        this.expense.Category__c = event.target.value;
    }

}