const ConvertEmailToUsername = name =>{
    let convertUsrN = name.indexOf('@');
    convertUsrN = name.slice(0, convertUsrN);
    return convertUsrN;
}

export default ConvertEmailToUsername;