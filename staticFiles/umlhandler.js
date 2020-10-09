var getUml = document.getElementById("getUml");
var umltxt = document.getElementById("umltxt");
var convertImpUML = document.getElementById("convertUML");
var convertIntUML = document.getElementById("convertUML2");
getUml.addEventListener("click", (e) => {
    try {

        var textuml = umltxt.textContent;
        var rexg = new RegExp(/[^a-zA-Z\d\s:\(\)\+\#\-\/,]/g);
        textuml = textuml.substr().replace(rexg, "");
        
        ClassNamet = textuml.split("\n")[0];
        rexg = new RegExp(/^ +/); ClassNamet = ClassNamet.replace(rexg, "");
        rexg = new RegExp(/ +$/); ClassNamet = ClassNamet.replace(rexg, "");
        textuml = textuml.slice(ClassNamet.length + 1);
        textuml = textuml.split("/");

        attuml =textuml[0].split("\n");
        opuml = textuml[1].split("\n");
        var textit={
            attr: { priv: [], pub: [], prot: []},
            op: { priv: [], pub: [], prot: [] }
        }
       
        for (let i = 0; i < attuml.length; i++) {
            var element = attuml[i];
            if(element){
            element = element.replaceAll(/ {2,}/g, " ");
            rexg = new RegExp(/^ +/); element = element.replace(rexg, "");
            rexg = new RegExp(/ +$/); element = element.replace(rexg, "");
                element=element.split(":");
                if(element[0][0]==='+'){textit.attr.pub.push(`${element[1]} ${element[0].slice(1)};`);}
                if (element[0][0] === '-') { textit.attr.priv.push(`${element[1]} ${element[0].slice(1)};`);}
                if (element[0][0] === '#') { textit.attr.prot.push(`${element[1]} ${element[0].slice(1)};`);}
            }
        }
        
        for (let i = 0; i < opuml.length; i++) {
            var element = opuml[i];
            element = element.replaceAll(/ {2,}/g, " ");
            if(element){
                rexg = new RegExp(/^ +/); element = element.replace(rexg, "");
                rexg = new RegExp(/ +$/); element = element.replace(rexg, "");
                element = element.split(":");        
                var methodt = {im: "", inter: ""}
                methodt.inter = `${element[1] ? element[1]:""} ${element[0].slice(1)};`;
                methodt.im = `${element[1] ? element[1]:""} ${ClassNamet}::${element[0].slice(1)}{}`;
                if (element[0][0] === '+') {textit.op.pub.push(methodt);}
                if (element[0][0] === '-') { textit.op.priv.push(methodt); }
                if (element[0][0] === '#') { textit.op.prot.push(methodt); }
                
            }
            
        }
        for (let i = 0; i < textit.attr.priv.length; i++) {
            var element = textit.attr.priv[i];
            textit.op.pub.push(GNS(element,ClassNamet));
        }/*
        for (let i = 0; i < textit.attr.prot.length; i++) {
            var element = textit.attr.prot[i];
            textit.op.pub.push(GNS(element, ClassNamet));
        }*/
       
        var methodst=[];
        fillMet("im", textit.op.priv, methodst); fillMet("im",textit.op.prot, methodst);
        fillMet("im",textit.op.pub, methodst);
        convertImpUML.textContent = `${ClassNamet}::${ClassNamet}(){}\n${ClassNamet}::~${ClassNamet}(){}\n`+
            `${methodst.join("\n")}`;
        convertImpUML.innerHTML = Prism.highlight(convertImpUML.innerText, Prism.languages.cpp, "cpp");
        var intpub = [], intprot = [],intpriv = [];
        fillMet("ia", textit.attr.priv, intpriv); fillMet("ia", textit.attr.prot, intprot);
        fillMet("ia", textit.attr.pub, intpub);
        fillMet("i", textit.op.priv, intpriv); fillMet("i", textit.op.prot, intprot);
        fillMet("i", textit.op.pub, intpub);
        
        convertIntUML.textContent=`class ${ClassNamet}{`+
            `${intpriv.length ? "\n private:\n" + intpriv.join("\n") : ""}${intprot.length ? "\n protected:\n" + intprot.join("\n") : ""}`+
            `\n public:\n\t${ClassNamet}();\n\t~${ClassNamet}();\n${intpub.length ?intpub.join("\n"):""}\n};`;
        convertIntUML.innerHTML=Prism.highlight(convertIntUML.innerText, Prism.languages.cpp, "cpp");
        } catch (error) {
        console.log("error:",error);
        umltxt.value="invalid UML";
    }

});
getUml.click();
function fillMet(tp,arr,met) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if(tp==="im"){
            met.push(element.im);
        }
        if(tp==="i"){
            met.push("\t"+element.inter);
        }
        if(tp==="ia"){
            met.push("\t" +element);
        }
    }
}
