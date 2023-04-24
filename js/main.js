

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
    

const put_params_bulding = (data) => {
    let { username ,id, price, ubication, email, name, phone } = data;
    let width_container = '';
    let width_iframe = '';
    let div_ifrm = document.getElementById(id);
    let params = `${username?`username=${username}`:''}${price?`&price=${price}`:''}${ubication?`&ubication=${ubication}`:''}${email?`&email=${email}`:''}${name?`&name=${name}`:''}${phone?`&phone=${phone}`:''}`;
    params = hash_text(params);

    if (/Mobile/i.test(navigator.userAgent)) {
        let params_mob = params.length > 0 ? `?${params}` : ''
      let lnk = `https://morgana.mx/lola/registra_cotiza/${params_mob}`;
      window.open(lnk, '_blank');
    } else {
      width_container = 'div-width'
      width_iframe = 'iframe-width'
      // El código se está ejecutando en un dispositivo de escritorio

      div_ifrm.innerHTML = `
      <div class="d-flex justify-content-end pb-2 ${width_container}" id="id_container_close">
          <img src="./img/ICONO_CLOSE.svg" class="cursor-pointer" onclick="close_modal_mgn('id_fiv_frm_mgn')">
      </div>
      <iframe class="${width_iframe}" src="https://morgana.mx/lola/registra_cotiza/${params.length>0 ? `?${params}`:''}" id="id_ifm_mgn" width=""></iframe>
      `
      open_modal_mgn(id);
    }
}



