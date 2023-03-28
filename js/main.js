

function hash_text(text){
    const myPassword = cipher('morganamx')
     return myPassword(text)
}

const close_modal_mgn = (id) => {
    const modal_mgn = document.getElementById(id);  
    modal_mgn.style.display = 'none';
}

const open_modal_mgn = (id) => {
    const modal_mgn = document.getElementById(id);
    modal_mgn.style.display = 'flex'
}


const handle_modal_width = (id) => {

}

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}
    
const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
}

const put_params_bulding = (data) => {
    let { username ,id, price, ubication, email, name, phone } = data;

    let div_ifrm = document.getElementById(id);
    let params = `${username?`username=${username}`:''}${price?`&price=${price}`:''}${ubication?`&ubication=${ubication}`:''}${email?`&email=${email}`:''}${name?`&name=${name}`:''}${phone?`&phone=${phone}`:''}`;
    params = hash_text(params);
    div_ifrm.innerHTML = `
    <div class="d-flex justify-content-end pb-2" id="id_container_close">
        <img src="./img/ICONO_CLOSE.svg" class="cursor-pointer" onclick="close_modal_mgn('id_fiv_frm_mgn')">
    </div>
    <iframe class="" src="https://uat.morgana.mx/lola/registra_cotiza/${params.length>0 ? `?${params}`:''}" id="id_ifm_mgn" width=""></iframe>
    `
    open_modal_mgn(id);handle_modal_width(id);
}

const get_params_bulding = () => {
    let url = window.location.href;
    let params = url.split('?').length > 1 ? url.split('?')[1] : url;
    if( params !== url){
        let mydescrip = decipher('morganamx');
        params = mydescrip(params);
        injection_data(params);
        return   
    }
}

const injection_data = (params) => {
    const urlParams = new URLSearchParams(params); const precio = urlParams.get('price'); const ubicacion = urlParams.get('ubication');
    const email = urlParams.get('email');const name = urlParams.get('name');const phone = urlParams.get('phone');
      
  if(document.getElementById('id_valor') ){
    document.getElementById('id_valor').value = precio !== null ? parseInt(precio).toLocaleString('MXN') : '';
  }
  if(document.getElementById('id_ubication')){
    document.getElementById('id_ubication').value = ubicacion !== null ? ubicacion : '9';
  }

}

window.addEventListener("load", (event) => {
    get_params_bulding();
  });



  const handle_link_oferts = () => {
    let url = window.location.href = './oferts_request.html'
  }

function switch_logged (e){
    const {value} = e; 
    let logged = document.querySelector('#id_div_logged');
    let not_logged = document.querySelector('#id_div_not_logged');
    if( value === 'si' ){
        logged.classList.remove('d-none');
        not_logged.classList.add('d-none');
    }else{
        logged.classList.add('d-none');
        not_logged.classList.remove('d-none');
    }
}