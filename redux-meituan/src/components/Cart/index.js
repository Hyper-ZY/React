import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Count from '../Count';
import { decreCount, increCount, clearCart} from '../../store/modules/takeaway'
import './index.scss';

const Cart = () => {
  const { cartList } = useSelector(state => state.foods)

  // 商品总数
  const totalCount = cartList.reduce((sum, item) => sum + item.count, 0)
  // 计算总价
  const totalPrice = cartList.reduce((sum, item) => sum + item.count * item.price, 0)

  const dispatch = useDispatch()

  // 购物车是否可见
  const [visible, setVisible] = useState(false)
  const onShow = () =>{
    if (totalCount > 0){
      setVisible(!visible)
    }
  }

  // const cart = []
  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div
        className={classNames('cartOverlay', totalCount > 0 && visible && 'visible')}
        onClick={onShow}
      />
      <div className="cart">
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div className={classNames('icon', totalCount > 0 && 'fill')} onClick={onShow}>
          {/* {totalCount > 0 && <div className="cartCornerMark">{totalCount}</div>} */}
          <div className="cartCornerMark">{totalCount}</div>
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totalPrice.toFixed(2)}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {totalCount > 0 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel', totalCount > 0 && visible && 'visible')}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={() => dispatch(clearCart())}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cartList.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  {/* 数量组件 */}
                  <Count
                    count={item.count}
                    onPlus={() => dispatch(increCount(item))}
                    onMinus={() => dispatch(decreCount(item))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart
