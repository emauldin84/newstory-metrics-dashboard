import React from 'react'

import './ComparisonFrequency.css'

import Refresh from '../Refresh/Refresh'

let ComparisonFrequency = (props) => {
    let monthClass = props.frequency[0] === 'month' ? 'active frequency month' : 'frequency month'
    let quarterClass = props.frequency[0] === 'quarter' ? 'active frequency quarter' : 'frequency quarter'
    let yearClass = props.frequency[0] === 'year' ? 'active frequency year' : 'frequency year'
    return (
        <div className='comparison-container'>
            <p className='frequency-title'>Comparison Frequency</p>
            <div className='frequency-selector'>
                <Refresh fetchData={props.fetchData} setFetching={props.setFetching}/>
                <p className={monthClass} onClick={() => props.handleFrequencyClick(['month', 30])}>month</p>
                <p className='divider'>|</p>
                <p className={quarterClass} onClick={() => props.handleFrequencyClick(['quarter', 91])}>quarter</p>
                <p className='divider'>|</p>
                <p className={yearClass} onClick={() => props.handleFrequencyClick(['year', 365])}>year</p>
            </div>
        </div>
    )
}

export default ComparisonFrequency