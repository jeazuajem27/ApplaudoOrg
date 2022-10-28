public class ExpenseController {

    @AuraEnabled
    public static Expense__c getExpenses(Id recordId){
        try{
            Expense__c expense = [SELECT Amount__c, Category__c, Expense_Date__c,  Name FROM Expense__c WHERE Id =: recordId ]; 
            return expense;    
        }
        catch (Exception ex){
            System.debug('Exception: ' + ex.getMessage());
            throw ex;
        }
    }

    @AuraEnabled
    public static list<Expense__c> getAllExpenses(){

            return [SELECT Amount__c, Category__c, Expense_Date__c,  Name FROM Expense__c ];
    }
}