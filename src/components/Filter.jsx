import React from 'react';
import '../css/Filter.css';

const Filter = ({ filterBy, changeFilter }) => {

    return (
        <div className='filter'>
            <div className="heading">
                <h3>Tasks</h3>
            </div>
            <div className="filter-btns">
                <label htmlFor="status-selector">Filter by: </label>
                <select name="" id="status-selector" onChange={(e) => { changeFilter(e) }}>
                    <option value="none">None</option>
                    <option value="complete">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>
        </div>
    )
}

export default Filter