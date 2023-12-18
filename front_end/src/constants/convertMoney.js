export const convertMoneyToVND = (money) => {
    return money?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}