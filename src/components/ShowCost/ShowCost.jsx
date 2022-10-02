import React, { useContext } from 'react'
import { MyContext } from '../App/context'
import './ShowCost.css'

const ShowCost = () => {
    let { price, payment, term, submitBtn, load } = useContext(MyContext)
    // console.log('price:' + price);
    // console.log('payment:' + payment);
    // console.log('term:' + term);

    let monthPay = Math.round((price - payment) * ((0.035 * Math.pow((1 + 0.035), term)) / (Math.pow((1 + 0.035), term) - 1)))
    let moneyPrice = +payment + +term * +monthPay
    return (
        <div className='show-all-price'>
            <div className='count-price'>
                <p className='title-item'>Сумма договора лизинга</p>
                <div className='money-price-wrapper'>
                    <p className='money-price'>{moneyPrice} ₽</p>
                </div>
            </div>
            <div className='count-price'>
                <p className='title-item'>Ежемесячный платеж от</p>
                <div className='money-price-wrapper'>
                    <p className='money-price'>{monthPay} ₽</p>
                </div>
            </div>
            <input type="button"
                value={load ? '' : "Оставить заявку"}
                className={load ? 'submit submit-load' : 'submit'}
                disabled={load}
                onClick={submitBtn} />
        </div>
    )
}

export default ShowCost
