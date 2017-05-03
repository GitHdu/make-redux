## 总结

- 组件之间共享状态
> - 使用 `context` 全局变量让程序不可预测
> - `store` 里面的内容是不可以随意修改的，而是通过`dispatch` 才能变更里面的 `state`

所以我们尝试把 `store` 和 `context` 结合起来使用，可以兼顾组件之间共享状态问题和共享状态可能被任意修改的问题
```

// 创建store
function createStore(reducer){
  let state=null;
  const listeners=[]
  const subscribe=(listener)=>{
    listeners.push(listener)
  }
  const getState=()=>state
  const dispatch=(action)=>{
    state=reducer(state,action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return {
    getState,
    dispatch,
    subscribe
  }
}
const store=createStore(themeReducer)

//设置context
  static childContextTypes={
    store:React.PropTypes.object
  }

  getChildContext(){  //设置并返回context（是个对象）
    return {
      store:this.props.store
    }
  }
```

- 代码复用

> 高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。

可以把一些可复用的逻辑放在高阶组件当中，高阶组件包装的新组件和原来组件之间通过 `props` 传递信息，减少代码的重复程度
通过函数`mapStateToProps` 和 `mapDispatchToProps`，高阶组件才能正确地去取数据和触发`dispatch`

```
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    onSwitchColor:(color)=>{
      dispatch({
        type:'CHANGE_COLOR',
        themeColor:color
      })
    }
  }
}
```
