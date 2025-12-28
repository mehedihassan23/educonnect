export function formatAmoutForStripe(amount, currency){
    let numberFormat = Intl.NumberFormat(["en-IN"], {
        currency: currency,
        style: "currency",
        currencyDisplay: "symbol"
    })

    const parts = numberFormat.formatToParts(amount)

    let zeroDecimal = true
    for(let part of parts){
        if(part.type === "decimal"){
             zeroDecimal = false
        }
    }

    return zeroDecimal ? amount : Math.round(amount * 100)

}