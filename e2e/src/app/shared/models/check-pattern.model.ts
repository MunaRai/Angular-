 export class CheckPattern{
    errorPattern: any;
    errorPatternMsg: string;

    
    emailPatternError: any;
    emailPatternErrorMsg: string;

    constructor() {
        this.errorPattern = /^[^<>/=;]+$/;
        
        //testing for beginning white space
        // this.errorPattern = /^[^ ][\w\W ]*[^ ]/;
        this.errorPatternMsg='The operators < > / = ; cannot be used';

        this.emailPatternError = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        this.emailPatternErrorMsg = "Email Should be of format 'example@mail.com'";
    }
     
}