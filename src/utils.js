// const isString=(node)=>{
//   return  Object.prototype.toString.call(node)=='[object,String]';
// }
function isString (node) {
  return typeof node === 'string'
}
module.exports={
    isString
}