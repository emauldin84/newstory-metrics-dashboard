import React from 'react'

import './ComparisonFrequency.css'

let ComparisonFrequency = (props) => {
    let monthClass = props.frequency === 'lastMonth' ? 'active frequency month' : 'frequency month'
    let quarterClass = props.frequency === 'lastQuarter' ? 'active frequency quarter' : 'frequency quarter'
    let yearClass = props.frequency === 'lastYear' ? 'active frequency year' : 'frequency year'
    return (
        <div className='comparison-container'>
            <p className='frequency-title'>Comparison Frequency</p>
            <div className='frequency-selector'>
                <p className={monthClass} onClick={() => props.handleFrequencyClick('lastMonth')}>month</p>
                <p className={quarterClass} onClick={() => props.handleFrequencyClick('lastQuarter')}>quarter</p>
                <p className={yearClass} onClick={() => props.handleFrequencyClick('lastYear')}>year</p>
            </div>
        </div>
    )
}

export default ComparisonFrequency