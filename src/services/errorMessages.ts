const ERROR_MESSAGES: {[key: string]: string} = {
    INSTALLMENT_COUNT_MORE_THAN_ALL: "Liczba pozostałych rat jest większa od liczby wszystkich rat!",
    NEGATIVE_INSTALLMENT_VALUE: "Wartość raty jest mniejsza od 0. Wysyłanie powiadomienia e-mail...",
    HIGH_INTEREST_RATE: "Oprocentowanie jest zbyt wysokie.",
    NULL_RATE_PARAMETER: "Parametr rate zawiera wartość null!",
    REFERENCE_RATE_NOT_SET: "Wartość referencyjnej stopy procentowej nie została jeszcze pobrana.",
    REFERENCE_RATE_NOT_SET_MESSAGE: "Referencyjna stopa procentowa nie została ustawiona.",
    RATE_BELLOW_ZERO: "Wartość raty jest mniejsza od 0.",
    WRONG_AMOUNT: "Wartość nie może być poniżej zera!",
};
  
export default ERROR_MESSAGES;