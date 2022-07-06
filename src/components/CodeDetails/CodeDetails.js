import React, {useState} from "react";
import classes from './CodeDetails.module.css';
import {FcOk} from 'react-icons/fc'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import sas from 'react-syntax-highlighter/dist/esm/languages/hljs/sas';
import a11y from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-light';
import Table from "./Table";
import {MdOutlineCategory, MdOutlinePersonSearch, MdOutlineLocationOn, MdLink} from 'react-icons/md';



const CodeDetails = props => {
    SyntaxHighlighter.registerLanguage('sas', sas);
    const {code,client:clientObj,notes, definition, category:categoryObj,vendor:vendorObj,state:stateObj} = props.selected[0].attributes; 
    const client = clientObj.data ?  clientObj.data.attributes.title : null;
    const vendor = vendorObj.data ?  vendorObj.data.attributes.title:null;
    const state = stateObj.data ?  stateObj.data.attributes.title: null;
    const category = categoryObj.data ?  categoryObj.data.attributes.title : null;
    const [copied,setCopied] = useState(false);

    const copyCode = () => {
        const elCode = document.querySelector('code');
        let range, sel;
        // Ensure that range and selection are supported by the browsers
        if (document.createRange && window.getSelection) {
          range = document.createRange();
          sel = window.getSelection();
          // unselect any element in the page
          sel.removeAllRanges();
        
          try {
            range.selectNodeContents(elCode);
            sel.addRange(range);
            
          } catch (e) {
            range.selectNode(elCode);
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
        <div className={classes.detailsGrid}>
          <div className={classes.codeCard}>
            <h4>Code</h4>
            {!copied ? <button className={classes.copyButton} onClick={copyCode}>Copy</button>: <div className={classes.copied}><FcOk/> Copied</div>}
            <SyntaxHighlighter className={classes.listContainer}
             customStyle={{minHeight:'90%',backgroundColor:'rgb(255,253,254)',maxWidth:'98%'}} 
             language="sas"
             wrapLongLines={true} 
             style={a11y}>
                {code}
            </SyntaxHighlighter>
          </div>
          <div className={classes.detailCard}>
            {category && <div>{<MdOutlineCategory/>}{` `}{category}</div>}
            {client && <div>{<MdOutlinePersonSearch/>}{` `}{client}</div>}
            {vendor && <div>{<MdLink/>}{` `}{vendor}</div>}
            {state && <div>{<MdOutlineLocationOn/>}{` `}{state}</div>}
          </div>
          <div className={classes.definitionCard}>
            <h4>Definition</h4>
            <div className={classes.listContainer}>
                <Table definition={definition} title={category}/>
            </div>
          </div>
          <div className={classes.noteCard}>
            <h4>Notes</h4>
            <div className={classes.listContainer}>
                {notes}
            </div>
          </div>
        </div>
    );
}

export default CodeDetails;
