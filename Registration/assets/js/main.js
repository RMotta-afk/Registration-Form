class formValidate {
    constructor(){
        this.form = document.querySelector('.form');
        this.events();
    }


    events(){
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const validFields = this.checkFields();
        console.log('Não enviado');
    }

    checkFields(){
        let valid = true;

        for(let field of this.form.querySelectorAll('.validates')){
            const label = field.previousElementSibling.innerText;
            if(!field.value) {
                this.throwError(field, `${label}Empty values aren't allowed`);
                valid = false;
            }
        }
    }

    throwError(field, message){

        const div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }

}

const validate = new formValidate();