function randomString(length) {
    let setStr = '';
    const allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = allCharacters.length;
    for ( let i = 0; i < length; i++ ) {
        setStr += allCharacters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return setStr;
}

export { randomString };