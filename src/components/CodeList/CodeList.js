import React from 'react';
import classes from './CodeList.module.css';

const CodeList = props => {    
    const itemClickedHandler = (e) => {
        e.target.childElementCount > 0 && e.target.querySelector('input').click();
    }

    const list = props.list.map(item => {
        return (
            <div onClick={itemClickedHandler} className={item.id===props.selected ? `${classes.codeItem} ${classes.selected}` : classes.codeItem} key={item.id}>
                <input type="radio" name='code-list' id={item.id} onClick={(e) => props.onSelection(e, item.id)}/>
                <label htmlFor={item.id}>{item.title}</label>
            </div>
        )})

    return (
        <React.Fragment>
            <div className={classes.results}>
                <h4>{props.list.length>0 ? props.list.length: 'No'} {props.list.length==1 ? 'Result' : 'Results'}</h4>
            </div>
            <div className={classes.listContainer}>
                {list}
            </div>
        </React.Fragment>
    )
};






export default CodeList;