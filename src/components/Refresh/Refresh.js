import React from 'react'

import './Refresh.css'

const Refresh = (props) => {

    const handleRefreshClick = () => {
        props.setFetching(true)
        props.fetchData()
    }
    return (
        <div className='refresh' title='refresh data' onClick={handleRefreshClick}>
            ⟳
        </div>
    )
}

export default Refresh