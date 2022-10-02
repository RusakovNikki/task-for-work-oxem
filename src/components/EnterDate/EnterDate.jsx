import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../App/context'
import './EnterDate.css'

const EnterDate = () => {
    let { setPrice, setPayment, setTerm, setBet, price, payment, term, bet } = useContext(MyContext)

    useEffect(() => {
        const paymentInit = Math.round(price * bet / 100)
        setPayment(paymentInit)
    }, [])

    const handleChange = (event) => {
        const input = event.target.value
        if (event.target.name === 'priceCar') {
            setPrice(input)
            setPayment(Math.round(input * bet / 100))
        } else if (event.target.name === 'firstPayment') {
            if (event.target.type === 'range')
                setBet(input)
        } else setTerm(input)
    }

    const handleBlurChange = (name, min, max) => {
        if (name === 'priceCar') {
            if (price < min) {
                setPrice(min)
                setPayment(Math.round(min * bet / 100))
            }else if (price > max) {
                setPrice(max)
                setPayment(Math.round(max * bet / 100))
            }
        } else if (name === 'firstPayment') {
            if (payment < min) {
                setPayment(min)
                setBet(Math.round(min / price * 100))
            }else if (payment > max) {
                setPayment(max)
                setBet(Math.round(max / price * 100))
            }
        } else if (name === 'term') {
            if (term < min) {
                setTerm(min)
            }else if (term > max) {
                setTerm(max)
            }
        }

    }

    return (
        <div
            onChange={handleChange}
            className='calculate-container'>
            <div className='item item1'>
                <p className='title-item'>Стоимость автомобиля</p>
                <div className='calculator'>
                    <input type='text'
                        value={price}
                        name='priceCar'
                        onBlur={event => handleBlurChange(event.target.name, 1000000, 6000000)} />
                    <p>₽</p>
                    <input
                        type='range'
                        className='figure sircle'
                        min='1000000' max='6000000'
                        step='1' value={price}
                        name='priceCar' />
                </div>
            </div>
            <div className='item item2'>
                <p className='title-item'>Первоначальный взнос</p>
                <div className='calculator calc2'>
                    <div className='price'>
                        <input type='text'
                            value={payment}
                            name='firstPayment'
                            onChange={event => {
                                setBet(Math.round(event.target.value / price * 100))
                                setPayment(event.target.value)
                            }}
                            onBlur={event =>
                                handleBlurChange(
                                    event.target.name,
                                    Math.round(price * 10 / 100),
                                    Math.round(price * 60 / 100)
                                )} />
                    </div>
                    <div className='percentages'>
                        <p>{bet}%</p>
                    </div>
                    <input
                        type='range'
                        className='figure sircle'
                        min='10'
                        max='60'
                        step='1'
                        value={bet}
                        name='firstPayment'
                        onChange={event => {
                            setPayment(Math.round(price * event.target.value / 100))
                            setBet(Math.round(event.target.value / price * 100))
                        }} />
                </div>
            </div>
            <div className='item item3'>
                <p className='title-item'>Срок лизинга</p>
                <div className='calculator'>
                    <input type='text' value={term} name='term'
                        onBlur={event => handleBlurChange(event.target.name, 1, 60)} />
                    <p>мес.</p>
                    <input
                        type='range'
                        className='figure sircle'
                        min='1'
                        max='60'
                        step='1'
                        value={term}
                        name='term' />
                </div>
            </div>
        </div>
    )
}

export default EnterDate
