import React, { useEffect, useState } from 'react';
import {createPortal} from 'react-dom';
import classes from './Table.module.css';
import {FcOk} from 'react-icons/fc'
const Table = props => {
    const [tableData, setTableData] = useState([]);
    const [copied,setCopied] = useState(false);
    const copyTable = () => {
        
        let range, sel;
        // Ensure that range and selection are supported by the browsers
        const elTable = document.querySelector('#copyTable');
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

    useEffect(() => {
        let rows = props.definition.split('\n');
        if(rows.length>1){
            let header=rows[0];
            rows.splice(0,1);
            rows = rows.map(str => str.replace('-','|'))
            rows = rows.map(str => str.split('|'));
            rows.splice(0,0,header);
        }
        setTableData(rows);
    },[props.definition,props.id])

        
    return (
        <React.Fragment>
        {!copied ? <button className={classes.copyButton} onClick={copyTable}>Copy</button>: <div className={classes.copied}><FcOk/> Copied</div>}
        <table className={classes.Table}>
            <thead>
                {tableData.length>1 && <tr>
                    <th className={classes.theader}>{tableData[0]}</th>
                    <th></th>
                    <th></th>
                </tr>}
            </thead>
            <tbody>
                { tableData.length>1 ? tableData.slice(1).map((row,ind) => { 
                    return (tableData.length>1 ? 
                    ((row.length>1) ? <tr key={ind}><td>{row[1].trim()}</td><td></td><td>{row[0].trim()}</td></tr> : 
                    (row[0] ? <tr key={Math.random().toString()}><td>{row[0].trim()}</td><td></td><td></td></tr> : null)) : 
                    <tr key={Math.random().toString()}><td>{tableData[0]}</td></tr>)}) : <tr key={Math.random().toString()}><td>{tableData[0]}</td></tr>
                }
            </tbody>
        </table>
        <table id='copyTable' style={{
            position:'absolute',
            top:0,zIndex:-1000,
            opacity:0,
            fontSize:'11pt',
            border:'none',
            backgroundColor:'transparent',
            fontFamily:'Calibri, sans-serif'}}>
            <thead>
                {tableData.length>1 && <tr>
                    <th style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}>{tableData[0]}</th>
                    <th style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}></th>
                    <th style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}></th>
                </tr>}
            </thead>
            <tbody>
                { tableData.length>1 ? 
                tableData.slice(1).map((row,ind) => { return (tableData.length>1 ? ((row.length>1) ? <tr key={ind}><td style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}>{row[1].trim()}</td><td style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}></td><td style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}>{row[0].trim()}</td></tr> : 
                (row[0] ? <tr style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}><td style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}>{row[0].trim()}</td><td style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}></td><td style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}></td></tr> : null)) 
                : <tr key={1}><td style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}>{tableData[0]}</td></tr>)}) : <tr key={1}><td style={{whiteSpace: 'nowrap',fontSize:'11pt',border:'none',backgroundColor:'transparent'}}>{tableData[0]}</td></tr>}
            </tbody>
        </table>
        </React.Fragment>
    );
}

export default Table;