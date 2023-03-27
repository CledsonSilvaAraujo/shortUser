
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateString = (shortLinkLength: number ) =>  {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < shortLinkLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export default {
  generateString
}