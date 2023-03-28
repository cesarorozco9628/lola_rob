const validate_fields = (e) => {
    const {id, value} = e;
    let pro = 0, price = 0, porcent_enganche = 0, values = {};
    let enganche = parseInt(document.querySelector('#id_enganche').value.split('').filter((el) => el >= 0  || el <= 9).join(''));
    let mensual = parseInt(document.querySelector('#id_ingreso_mensual').value.split('').filter((el) => el >= 0  || el <= 9).join(''));
    if(id === 'id_valor' || id === 'id_enganche'){
        handle_income_pay()
        e.value = put_format_money(value) !== NaN ? put_format_money(value) : '' ;
    }
    if(id  === 'id_ingreso_mensual' || id === 'id_ingreso_mensual_extra'){
        handle_income();
        pro = parseInt(document.querySelector('#id_ingreso_mensual').value.split('').filter((el) => el >= 0  || el <= 9).join(''));
        e.value = put_format_money(value);
    }

    price = parseInt(document.querySelector('#id_valor').value.split('').filter((el) => el >= 0  || el <= 9).join(''));
    porcent_enganche =  Math.ceil(enganche*100/price);

    if( price >= 500000 && porcent_enganche >= 10 && mensual >= 10000 ){
        document.querySelector('#id_ctz_mgn').classList.remove('disabled');
        document.querySelector('#id_ctz_mgn').disabled = false
    }else{
        document.querySelector('#id_ctz_mgn').classList.add('disabled');
        document.querySelector('#id_ctz_mgn').disabled = true
    }

}

function put_format_money(e) {
    let value = e.split('').filter((el) => el >= 0  || el <= 9).join('');
    return value !== '' ? parseInt(value).toLocaleString('MXN') : '0'
}

function handle_income_pay(){
    let price = parseInt(document.querySelector('#id_valor').value.split('').filter((el) => el >= 0  || el <= 9).join(''));
    let enganche = parseInt(document.querySelector('#id_enganche').value.split('').filter((el) => el >= 0  || el <= 9).join(''));
    let amount_credit = price - enganche;
    let porcent_enganche = Math.ceil(enganche*100/price);
    document.querySelector('#loan_amount').innerHTML = amount_credit > 0 ? `$ ${amount_credit.toLocaleString('MXN')} MXN` :'0'
    document.querySelector('#id_enganche_percent').innerHTML = porcent_enganche < 90 ? `${porcent_enganche} %` : '0%'

    if(!(porcent_enganche >= 10)){
        document.querySelector('#enganche_error').classList.remove('d-none');
    }else{
        document.querySelector('#enganche_error').classList.add('d-none');
    }

    if(amount_credit >= 500000){
        document.querySelector('#loan_amount_error').classList.add('d-none');
    }else{
        document.querySelector('#loan_amount_error').classList.remove('d-none');
    }
    if(price >= 500000){
        document.querySelector('#valor_error').classList.add('d-none');
    }else{
        document.querySelector('#valor_error').classList.remove('d-none');
    }
    return {price:price, enganche:enganche, amount_credit:amount_credit,porcent_enganche:porcent_enganche}
}


function handle_income(){
    let mensual = parseInt(document.querySelector('#id_ingreso_mensual').value.split('').filter((el) => el >= 0  || el <= 9).join(''));
    if(mensual >= 10000){
        document.querySelector('#ingreso_mensual_error').classList.add('d-none');
    }else{
        document.querySelector('#ingreso_mensual_error').classList.remove('d-none');
    }

}