import './Main.css'
import { useState } from 'react';
import logo from '../../images/logo.png';
import loader from '../../images/loader.gif';
import { ReactComponent as SearchIcon } from '../../images/search-icon.svg';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {  
    const [loaded, setLoaded] = useState(false)  
    const [searchName, setSearchName] = useState('');

    const navigate = useNavigate();

    const allProfiles = useSelector(state => state.mainReducer.allProfiles);
    const loading = useSelector(state => state.appReducer.loading);

    const searchedProfiles = allProfiles?.filter(object => object.name.startsWith(searchName));

    const navigateToProfile = (profile) => {
        navigate(`/${profile.id}/${profile.name.replace(/ /g,'')}`);
    }

    return(
        <div className="main-wrap">
            <div className="main-logo">
                <img onLoad={() => setLoaded(true)} src={logo} alt="" />
                {!loaded && <div className='gag'></div>}
            </div>
            <div className="main-search-profile">
                <SearchIcon />
                <input onChange={e => setSearchName(e.target.value)} placeholder="Filter by name..." type="text" />
            </div>
            {loading ? 
                <img className='loader' src={loader} alt="" />
                : <div className='main-profiles'>
                    {searchedProfiles.map(profile => 
                        <div className='main-card' onClick={() => navigateToProfile(profile)}>
                            <img src={profile.image} alt="profile-avatar" />
                            <div className='main-card-text-block'>
                                <div className='main-card-title'>
                                    <h1>{profile.name}</h1>
                                </div>
                                <div className='main-card-subtitle'>
                                    <span>{profile.species}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default Navbar;