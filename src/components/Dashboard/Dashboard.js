import classes from './Dashboard.module.css';
import RSelect from '../UI/RSelect';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../UI/Spinner';
import urls from '../../store/urls';
import AuthContext from '../../store/auth-context';
import Feed from '../Feed/Feed';
import {MdOutlineCategory, MdOutlinePersonSearch, MdOutlineLocationOn, MdLink} from 'react-icons/md';
import {MdOutlineRefresh} from 'react-icons/md';
import {FcHighPriority} from 'react-icons/fc';


const Dashboard = () => {

  const[clients,setClients] = useState(null);
  const[vendors,setVendors] = useState(null);
  const[categories,setCategories] = useState(null);
  const[states,setStates] = useState(null);
  const[error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const [currentClient,setCurrentClient] = useState('');
  const [currentVendor,setCurrentVendor] = useState('');
  const [currentCategory,setCurrentCategory] = useState('');
  const [currentState,setCurrentState] = useState('');
  const headers = {'Authorization': `Bearer ${authCtx.token}`,'Content-Type':'application/json'}
  const transformer = arr => {
    if (arr){
      const fetchCopy = arr.data.length>0 && arr.data.map((obj) => ({key:obj.id,value:obj.attributes.title}));
      return arr.data.length>0 && [...fetchCopy];
    }else{
      
    }
  }

  const categorySort = (arr) => {
    if(arr){
      // console.log(arr);
      let sortedArr = [];
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'name'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'email'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'token'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'phone & phonetype'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'phonetype'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'cluster'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'gender'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'age'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'party'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'ethnicity'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'mode'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'sampletype'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      sortedArr=[...sortedArr,...arr];
      return sortedArr;
    }
  }

  const stateSort = (arr) => {
    if(arr){
      // console.log(arr);
      let sortedArr = [];
      for(let i=0; i<arr.length; i++){
        if(arr[i].value.toLowerCase() === 'national'){
          sortedArr.push(arr[i]);
          arr.splice(i,1);
        }
      }
      sortedArr=[...sortedArr,...arr];
      return sortedArr;
    }
  }

  const initialValues = {
    client:transformer(clients),
    vendor:transformer(vendors),
    category:categorySort(transformer(categories)),
    state:stateSort(transformer(states))
  }

  useEffect(() => {
    const fetchState = async urls => {
      let checkClients,checkVendors,checkCategories,checkStates;
      try{
        const[fetchedClients,fetchedVendors,fetchedCategories,fetchedStates] = await Promise.all([
          fetch((urls.getClients+`?sort=title`),{method:'GET', headers:headers}).then(response => response.json()).catch(e => e),
          fetch((urls.getVendors+`?sort=title`),{method:'GET', headers:headers}).then(response => response.json()).catch(e => e),
          fetch((urls.getCategories+`?sort=title`),{method:'GET', headers:headers}).then(response => response.json()).catch(e => e),
          fetch((urls.getStates+`?sort=title`),{method:'GET', headers:headers}).then(response => response.json()).catch(e => e),
        ])
        setClients(fetchedClients);
        checkClients=fetchedClients;
        setVendors(fetchedVendors);
        checkVendors=fetchedVendors;
        setCategories(fetchedCategories);
        checkCategories=fetchedCategories;
        setStates(fetchedStates);
        checkStates=fetchedStates;
        setError(null);
      }catch(err){
        setError(err);
      }finally{
        if((checkClients.error || checkCategories.error || checkVendors.error || checkStates.error)){
          authCtx.logout();
        }
      }
    }
    if(!(clients && categories && vendors && states))
    fetchState(urls);
  },[clients,categories,vendors,states])

  useEffect(() => {
    currentCategory && currentCategory.value!=='Region' && setCurrentState('') 
  },[currentCategory]); 

  const resetHandler = () => {
    setClients(null);
    setVendors(null);
    setCategories(null);
    setStates(null);
    setCurrentClient('');
    setCurrentVendor('');
    setCurrentCategory('');
    setCurrentState('');
  }

  const dropDowns = (
    <React.Fragment>
      <RSelect name="category" icon={<MdOutlineCategory/>} autoFocus={true} isClearable={false} placeholder="Select Flag" onChange={setCurrentCategory} className={classes.categoryInput} label="Flag" options={initialValues.category} />
      <RSelect name="client" icon={<MdOutlinePersonSearch/>}isClearable={true} placeholder="Select Client" onChange={setCurrentClient}  className={classes.clientInput} label="Client" options={initialValues.client} />
      <RSelect name="vendor" icon={<MdLink/>} isClearable={true} placeholder="Select Vendor" onChange={setCurrentVendor} className={classes.vendorInput} label="Vendor" options={initialValues.vendor} />
      {currentCategory && currentCategory.value==='Region' && <RSelect icon={<MdOutlineLocationOn/>} name="state" isClearable={false} placeholder="Select State" onChange={setCurrentState} className={classes.stateInput} label="State" options={initialValues.state} />}
    </React.Fragment>
    );

  return (
    <React.Fragment>
    <section className={classes.dashContainer}>
      <form className={classes.formContainer}>
        {!error && clients && vendors && categories ? dropDowns : (!error ? <Spinner/> : <div className={classes.error}> <FcHighPriority/> Something went wrong!</div>)}
      </form>
      {(currentCategory || currentClient || currentVendor) && <div className={classes.reset} onClick={resetHandler}><MdOutlineRefresh/> Reset</div>}
    </section>
    <Feed client={currentClient && currentClient.value} vendor={currentVendor && currentVendor.value} category={currentCategory && currentCategory.value} state={currentState && currentState.value}/>
    </React.Fragment>
  );
};

export default Dashboard;
