class formValidate {
    constructor(){
        this.form = document.querySelector('.form');
        this.events();
    }

    // To catch the submit event on front-End.
    events(){
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }


    // This method is useful to catch the inputs, and to send finally the form.

    handleSubmit(e){
        e.preventDefault();
        const validFields = this.checkFields();
        const validPasswords = this.checkPasswords();

        if(validFields && validPasswords){
            alert('Sended!');
            this.form.submit();
        }
    }

    // Its a function necessary for check the passwords. 

    checkPasswords(){
        let valid = true;

        // Here I create variables who ware responsible for select the HTML elements. 

        const password = this.form.querySelector('.password');
        const repPassword = this.form.querySelector('.repeat-password');

        // A test to know if passowrd and the confirmation are equal.

        if(password.value !== repPassword.value){
            valid = false;
            this.throwError(password, 'Both passowrd and password confirm needs to be equal');
            this.throwError(repPassword, 'Both passowrd and password confirm needs to be equal')
        }

        if(password.value.length < 6){
            valid = false;
            this.throwError(password, 'At least 6 characters for password')
        }
        
        if(password.value.length > 12){
            valid = false;
            this.throwError(password, 'At most 12 characters for password')
        }

        return valid;
    }

    // That method checks if all fields were correctly filled.

    checkFields(){
        let valid = true;

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll('.validates')){
            const label = field.previousElementSibling.innerText;
            if(!field.value) {
                this.throwError(field, `The field ${label} is Empty. Those values aren't allowed`);
                valid = false;
            }

            if(field.classList.contains('cpf')){
                if(!this.validatesCPF(field)) valid = false;
            } 
            if(field.classList.contains('user')){
                if(!this.validatesUser(field)) valid = false;
            } 
        }

        return valid;
    }


     validatesCPF(field) {
        const cpf = new Validate(field.value);

        if(!cpf.validates()){
            this.throwError(field, 'Invalid CPF!');
            return false;
        }
        return true;
    } 

    validatesUser(field){
        const user = field.value;
        let valid = true; 

        if(user.length < 3){
            this.throwError(field, 'Invalid user. 3 characters at least');
            valid = false;
        }
        if(user.length > 12){
            this.throwError(field, 'Invalid user. 12 characters at most');
            valid = false;
        }

        if(!user.match(/^[a-zA-Z0-9]+$/g)){
            this.throwError(field, 'Only numbers or letters');
            valid = false;
        }


        return valid;
    }


    throwError(field, message){

        const div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }

}

const validation = new formValidate();