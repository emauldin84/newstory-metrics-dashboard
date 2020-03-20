import React from 'react'

import './Refresh.css'

const Refresh = (props) => {

    const handleRefreshClick = () => {
        props.setFetching(true)
        props.setProgressWidth(1)
        props.setProgressText('...Fetching')
        props.fetchData()
    }
    return (
        <div className='refresh' title='refresh data' onClick={handleRefreshClick}>
            ⟳
        </div>
    )
}

export default Refresh