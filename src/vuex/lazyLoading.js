// 懒加载组件
function lazy(name) {
  let file = name.split('-')[0];

  if (name === 'Home') {
    // return () => import(`@/views/${file}/${name}.vue`)
      return () => import(`@/views/${name}.vue`)  //todo: 当name !== home的时候，模块未引入
  } else{
    return () => import(`@/views/${file}/${name}.vue`)   // 添加成功
  }

}
export {lazy}

