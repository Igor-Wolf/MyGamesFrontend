


export const conversor = ( lang, cr, value ) => {
 
    const formatedValue = new Intl.NumberFormat(lang, {
        style:'currency',
        currency: cr
    }).format(value)
    
    return formatedValue

}