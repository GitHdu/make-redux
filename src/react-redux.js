import React, { Component } from 'react';

export const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes={
      store:React.PropTypes.object
    }

    constructor(){
      super()
      this.state={
        allProps:{}
      }
    }
    
    componentWillMount() {
      const {store}=this.context
      this._updateProps()
      store.subscribe(()=>this._updateProps())
    }

    _updateProps(){
      const {store}=this.context
      let stateProps=mapStateToProps
          ? mapStateToProps(store.getState(),this.props)
          : {}
      let dispatchProps=mapDispatchToProps
        ? mapDispatchToProps(store.dispatch,this.props)
        : {}
      this.setState({
        allProps: { // 整合普通的 props 和从 state 生成的 props
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }

    render() {
      return (
        <WrappedComponent {...this.state.allProps}></WrappedComponent>
      );
    }
  }
  return Connect
}

export class Provider extends Component {
  static PropTypes={
    store:React.PropTypes.object,
    children:React.PropTypes.any
  }
  static childContextTypes={
    store:React.PropTypes.object
  }

  getChildContext(){  //设置并返回context（是个对象）
    return {
      store:this.props.store
    }
  }

  render(){
    return(
      <div>{this.props.children}</div>
    )
  }
}