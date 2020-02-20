import React from 'react'

import './ComparisonFrequency.css'

let ComparisonFrequency = (props) => {
    let monthClass = props.frequency[1] === 'lastMonth' ? 'active frequency month' : 'frequency month'
    let quarterClass = props.frequency[1] === 'lastQuarter' ? 'active frequency quarter' : 'frequency quarter'
    let yearClass = props.frequency[1] === 'lastYear' ? 'active frequency year' : 'frequency year'
    return (
        <div className='comparison-container'>
            <p className='frequency-title'>Comparison Frequency</p>
            <div className='frequency-selector'>
                <p className={monthClass} onClick={() => props.handleFrequencyClick(['currentMonth', 'lastMonth'])}>month</p>
                <p className={quarterClass} onClick={() => props.handleFrequencyClick(['currentQuarter', 'lastQuarter'])}>quarter</p>
                <p className={yearClass} onClick={() => props.handleFrequencyClick(['currentYear', 'lastYear'])}>year</p>
            </div>
        </div>
    )
}

export default ComparisonFrequency