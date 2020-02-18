import React from 'react'

import './ComparisonFrequency.css'

let ComparisonFrequency = (props) => {
    return (
        <div className='comparison-container'>
            <p className='frequency-title'>Comparison Frequency</p>
            <div className='frequency-selector'>
                <p className='frequency month' onClick={() => props.handleFrequencyClick('lastMonth')}>month</p>
                <p className='frequency quarter' onClick={() => props.handleFrequencyClick('lastQuarter')}>quarter</p>
                <p className='frequency year' onClick={() => props.handleFrequencyClick('lastYear')}>year</p>
            </div>
        </div>
    )
}

export default ComparisonFrequency