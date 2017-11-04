function winpopupGen(page, title, combo, txtBox, secCombo, secTxtBox) {    
    page = page + "&combo=" + combo + "&txtBox" + txtBox + "&secCombo" + secCombo + "&secTxtBox" + secTxtBox + "&pos=" + lastTop;
    OpenModelPopup(page);
}