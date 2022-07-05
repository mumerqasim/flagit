import { useState, useEffect, useContext, useRef } from 'react';
import classes from './Feed.module.css';
import urls from '../../store/urls';
import AuthContext from '../../store/auth-context';
import CodeList from '../CodeList/CodeList';
import CodeDetails from '../CodeDetails/CodeDetails';
import {ReactComponent as StartSearch} from '../../store/startSearch.svg';
import {ReactComponent as SelectItem} from '../../store/selectItem.svg';
import {ReactComponent as LandedNowhere} from '../../store/landedNowhere.svg';
import Spinner from '../UI/Spinner';

const Feed = props => {
    const [results,setResults] = useState(null); 
    const [currentItem, setCurrentItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    let listItems=[];
    let totalCount=0;
    const {client,vendor, category, state} = props;
    let url=urls.base+'codes?filters';
    const headers = {'Authorization': `Bearer ${authCtx.token}`,'Content-Type':'application/json'}
    if(category){
        url+=`[category][title][$eq]=${category}`;
        if(client){
            url+=`&filters[client][title][$eq]=${encodeURIComponent(client)}`;
        }
        if(vendor){
            url+=`&filters[vendor][title][$eq]=${encodeURIComponent(vendor)}`;
        }
        if(state){
            url+=`&filters[state][title][$eq]=${encodeURIComponent(state)}`;
        }
        url+=`&populate=*&sort=title`
    }
    useEffect(()=>{
        const fetchCodes = async (url) => {
            try{
                setIsLoading(true)
                const result = await fetch(url, {method:'GET', headers:headers}).then(res => res.json());
                setResults(result);
                setIsLoading(false);
                setCurrentItem(null);
            } catch(err) {

            }
        }
        if(category)
        fetchCodes(url);
    },[props.client, props.vendor, props.category,props.state]);

    listItems = results ? results.data.map(item => ({id:item.id, title:item.attributes.title})) : [];

    const selectionChangedHandler = (e, id) => {
        setCurrentItem(id);
    }


    return (
        <section>
            {results ?  (<div className={classes.feedContainer}>
                <div className={classes.codesList}>
                    {isLoading ? <div className={classes.spinnerContainer}><Spinner/></div> :<CodeList list={listItems} selected={currentItem} onSelection={selectionChangedHandler}/>}
                </div>
                <div className={classes.detailsContainer}>
                    {!currentItem ? ((listItems.length>0) ? <div className={classes.detailFallback}><div className={classes.animationContainer}><SelectItem/></div><div>Select an item from the list ...</div></div>:<div className={classes.detailFallback}><div className={classes.animationContainer}><LandedNowhere/></div><div>Hmm... Our search landed nowhere</div></div>) : <CodeDetails selected={results && results.data.filter((item)=>item.id===currentItem)}/>}
                </div>
            </div>) : <div className={classes.feedContainern}><div className={classes.animationContainer}><StartSearch/></div><div>Start your search by selecting a flag ...</div></div>}
        </section>
    )
}

export default Feed;