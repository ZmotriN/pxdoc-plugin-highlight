(function(){
    const sheetHighlight = new CSSStyleSheet();
    sheetHighlight.replaceSync(`###CSSCONTENT###`);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheetHighlight];

    ###HIGHLIGHTCONTENT###

    ###PLUGINCONTENT###
})();