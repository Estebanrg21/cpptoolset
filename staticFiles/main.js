var helpgs= document.getElementById("helpgs");
var igys = document.getElementById("ingys");
var gys = document.getElementById("imgys");
var convertImpUML = document.getElementById("convertUML");
var convertIntUML = document.getElementById("convertUML2");
var copy1 = document.getElementById("copy1");
var copy2 = document.getElementById("copy2");
var copy3 = document.getElementById("copy3");
var copy4 = document.getElementById("copy4");

copy1.addEventListener("click",copyt);
copy2.addEventListener("click", copyt);
copy3.addEventListener("click", copyt);
copy4.addEventListener("click", copyt);

helpgs.addEventListener("click",(e)=>{
   alert("Attributes: attributes to generate their setters and getters\n"+
   "UML Class Diagram: the class diagram needed to generate the code for implementation and the interface\n"+
   "Class Name input: Only works in getters and setters generator, it is an option if the user wants to include "+
   "the class name within the implementation methods");
})
function copyt(e) {
    tid = e.target.id;
    if (tid === "copy1") { copyToClip(gys) }
    if (tid === "copy2") { copyToClip(igys)}
    if (tid === "copy3") { copyToClip(convertImpUML)}
    if (tid === "copy4") { copyToClip(convertIntUML)}
}
function copyToClip(obj) {
    var range = document.createRange();
    range.selectNodeContents(obj);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");
   /* console.log([obj]);
    var p=document.createElement("input");
    p.value = obj.innerText;
   // console.log(p.value);
    obj.select();
    obj.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied the text: " + obj.texContent);*/
}