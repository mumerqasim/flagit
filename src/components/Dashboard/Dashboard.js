import classes from './Dashboard.module.css';
import SelectInput from '../UI/SelectInput';
import RSelect from '../UI/RSelect';
import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../UI/Spinner';
import urls from '../../store/urls';
import AuthContext from '../../store/auth-context';
import Feed from '../Feed/Feed';
import {MdOutlineCategory, MdOutlinePersonSearch, MdOutlineLocationOn, MdLink} from 'react-icons/md';
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

  const initialValues = {
    client:transformer(clients),
    vendor:transformer(vendors),
    category:transformer(categories),
    state:transformer(states)
  }

  useEffect(() => {
    const fetchState = async urls => {
      try{
        const[fetchedClients,fetchedVendors,fetchedCategories,fetchedStates] = await Promise.all([
          fetch(urls.getClients,{method:'GET', headers:headers}).then(response => response.json()),
          fetch(urls.getVendors,{method:'GET', headers:headers}).then(response => response.json()),
          fetch(urls.getCategories,{method:'GET', headers:headers}).then(response => response.json()),
          fetch(urls.getStates,{method:'GET', headers:headers}).then(response => response.json()),
        ])
        setClients(fetchedClients);
        setVendors(fetchedVendors);
        setCategories(fetchedCategories);
        setStates(fetchedStates);
        setError(null);
      }catch(err){
        setError(err);
        console.log(error);
      }
    }
    fetchState(urls);
  },[])

  
  console.log(currentCategory,currentClient,currentVendor,currentState);


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
    </section>
    <Feed client={currentClient && currentClient.value} vendor={currentVendor && currentVendor.value} category={currentCategory && currentCategory.value} state={currentState && currentState.value}/>
    </React.Fragment>
  );
};

export default Dashboard;
