/** 浅拷贝
 * 用法：浅拷贝是指，一个新的对象对原始对象的属性值进行精确地拷贝，如果拷贝的是基本数据类型，
 * 拷贝的就是基本数据类型的值，如果是引用数据类型，拷贝的就是内存地址。
 * 如果其中一个对象的引用内存地址发生改变，另一个对象也会发生变化。
 * 思路：
 *  1、判断是否为对象
 *  2、根据obj类型创建一个新的对象
 *  3、for in 遍历对象 拿到 key
 *  4、判断 key 是否在 obj 中
 *  5、将 key 作为新对象的key 并赋值 value
 *
 * @param {*} obj
 * @return {*} 
 */

function shallowCopy(obj){
  if (obj !== 'object' || obj === null){
    return obj
  }

  let clone = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)){
      clone[key] = obj[key]
    }
  }
  return clone
}

const original = { a: 1, b: { c: 2, d: [3, 4] } };
const copy = shallowCopy(original);

copy.a = 10;
console.log(original.a); // 10，原对象被修改
console.log(copy.a);     // 10，拷贝对象被修改