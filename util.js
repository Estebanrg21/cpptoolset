/*var dtypescpp = ["short int", "unsigned short int", "unsigned int", 
    "int", "long int", "unsigned long int", "long long int","unsigned long long int"
    , "signed char", "unsigned char", "float", "double", "long double","wchar_t"];
*/
var attr=document.getElementById("att");
var classit = document.getElementById("class");
var convertit = document.getElementById("convert");
var igys = document.getElementById("ingys");
var gys=document.getElementById("imgys");
var withClass = document.getElementById("withclass");

/*
igys.addEventListener("click",copyToClip);
gys.addEventListener("click",copyToClip);*/

withClass.addEventListener("change",(e)=>{
    if (e.target.checked){
        classit.removeAttribute("disabled"); 
    }else{
        classit.setAttribute("disabled","true");
    }
})

convertit.addEventListener("click",(e)=>{
    atbs = (attr.textContent).split("\n");
    intgns=[];
    imgns=[];
  //  console.log({withClass});
    for (let i = 0; i < atbs.length; i++) {
        var element = atbs[i];
       // if (element[element.length - 1] === " " || element[element.length - 1] === ";") { element=element.substr(0,element.length-1)}

       if(withClass.checked){
           var rexg = new RegExp(/[^a-zA-Z\d\s:]/g);
           classm = (classit.value).substr().replace(rexg, "");
           classm = classm.charAt(0).toUpperCase() + classm.slice(1);
           classm = classm.split(" ").join("");
       }else{classm=""}

        var result=GNS(element,classm);
        intgns[i] = result.inter;
        imgns[i]=result.im;
    }
    
    igys.textContent = intgns.join("\n\n");
    igys.innerHTML = Prism.highlight(igys.innerText, Prism.languages.cpp, "cpp");
    gys.textContent=imgns.join("\n\n");
    gys.innerHTML = Prism.highlight(gys.innerText, Prism.languages.cpp, "cpp");
});
function init(){
    withClass.click();
    classit.value = "ClassName";
    convertit.click();
}
init();


function GNS(element,classm) {
    var rexg = new RegExp(/[^a-zA-Z\d\s:]/g);
    element = element.substr().replace(rexg, "");
    element = element.replaceAll(/ {2,}/g, " ");
    rexg = new RegExp(/^ /); element = element.replace(rexg, "");
    rexg = new RegExp(/ $/); element = element.replace(rexg, "");
    var indexName = element.search(/ [^ ]*$/);
    var name = element.slice(indexName).trim();
    var dtypecpp = element.slice(0, indexName).trim();
    var instgns = `${dtypecpp} get${name.charAt(0).toUpperCase() + name.slice(1)}();` +
        `\nvoid set${name.charAt(0).toUpperCase() + name.slice(1)}(${dtypecpp} ${name});`;
    var imstgns = `${dtypecpp} ${classm ? classm + "::" : ""}get${name.charAt(0).toUpperCase() + name.slice(1)}(){\n\treturn ${name};\n}` +
        `\nvoid ${classm ? classm + "::" : ""}set${name.charAt(0).toUpperCase() + name.slice(1)}(${dtypecpp} ${name}){\n\tthis->${name}=${name};\r}`
    return {im:imstgns,inter:instgns}
}