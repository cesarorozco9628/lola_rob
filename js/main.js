

function hash_text(text){
    const myPassword = cipher('morganamx')
     return myPassword(text)
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
    let width_container = '';
    let width_iframe = '';
    let div_ifrm = document.getElementById(id);
    let params = `${username?`username=${username}`:''}${price?`&price=${price}`:''}${ubication?`&ubication=${ubication}`:''}${email?`&email=${email}`:''}${name?`&name=${name}`:''}${phone?`&phone=${phone}`:''}`;
    params = hash_text(params);

    if (/Mobile/i.test(navigator.userAgent)) {
      width_container = 'div-responsive'
      width_iframe = 'iframe-responsive'
    } else {
      width_container = 'div-width'
      width_iframe = 'iframe-width'
      // El código se está ejecutando en un dispositivo de escritorio
    }

    div_ifrm.innerHTML = `
    <div class="d-flex justify-content-end pb-2 ${width_container}" id="id_container_close">
        <img src="./img/ICONO_CLOSE.svg" class="cursor-pointer" onclick="close_modal_mgn('id_fiv_frm_mgn')">
    </div>
    <iframe class="${width_iframe}" src="https://uat.morgana.mx/lola/registra_cotiza/${params.length>0 ? `?${params}`:''}" id="id_ifm_mgn" width=""></iframe>
    `
}
