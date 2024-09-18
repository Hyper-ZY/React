/** 深拷贝
 * 用法：拷贝一个对象的属性值 如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，
 * 因此对象获得一个新的引用类型而不是一个原有类型的引用
 * 思路：
 *  1、判断是否为对象
//  *  2、判段对象是否在 map 中 如果存在就不需要操作
//  *  3、将 obj 放入 map 中 避免重复引用
 *  4、for in 遍历对象 拿到 key 判断 key 是否在 obj 中
 *  5、value 如果为对象 就递归拷贝 否则就赋值
 * @param {*} obj
 * @param {*} [map=new Map()]
 * @return {*} 
 */

function deepCopy(obj){
  if (typeof(obj) !== 'object' || obj === null){
    return obj;
  }

  let clone = Array.isArray(obj) ? [] : {}
  for (let key in obj){
    if(obj.hasOwnProperty(key)) {
      clone[key] = deepCopy(obj[key])
      // console.log(`${key}: `, obj[key]);
    }
  }
  return clone
}

const original = { a: 1, b: { c: 2, d: [3, 4] } };
const copy = deepCopy(original);

copy.b.c = 10;
console.log(original.b.c); // 2，原对象不受影响
console.log(copy.b.c);     // 10，拷贝对象被修改