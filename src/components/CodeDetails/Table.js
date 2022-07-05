import React, { useState } from 'react';
import classes from './Table.module.css';
import {FcOk} from 'react-icons/fc'
const Table = props => {
    let rows= props.definition.split('\n');
    rows = rows.map(str => str.replace('-','|'))
    rows = rows.map(str => str.split('|'));
    const [copied,setCopied] = useState(false);
    const copyTable = () => {
        const elTable = document.querySelector('table');
        
        let range, sel;
        
        // Ensure that range and selection are supported by the browsers
        if (document.createRange && window.getSelection) {
        
          range = document.createRange();
          sel = window.getSelection();
          // unselect any element in the page
          sel.removeAllRanges();
        
          try {
            range.selectNodeContents(elTable);
            sel.addRange(range);
          } catch (e) {
            range.selectNode(elTable);
            sel.addRange(range);
          }
        
          document.execCommand('copy');
          setCopied(true);
        }
        
        sel.removeAllRanges();
        setTimeout(()=>{
            setCopied(false);
        },2500)
    }


    return (
        <React.Fragment>
        {!copied ? <button className={classes.copyButton} onClick={copyTable}>Copy</button>: <div className={classes.copied}><FcOk/> Copied</div>}

        <table className={classes.Table}>
            <thead>
                <tr>
                    <th className={classes.theader}>{props.title}</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row,ind) => <tr key={ind}><td>{row[1].trim()}</td><td></td><td>{row[0].trim()}</td></tr>)}
            </tbody>
        </table>
        </React.Fragment>
    );
}

export default Table;