funcs:
module.exports = {
   $: async function (selector){
     let elements = await driver.findElement(by.xpath(selector));
     if(elements.length === 0){
       return null;
     }
     if(elements.length === 1){
       return elements[0];
     }
     return elements;
   },
   sleep: function(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
   }
 }