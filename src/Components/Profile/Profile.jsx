import './Profile.css';
import loader from '../../images/loader.gif';
import { ReactComponent as ArrowBack } from '../../images/arrow-back-icon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR_DISPLAY_OFF, getProfile, SET_PROFILE } from '../../redux/actions';

const Profile = () => {
    let { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profile = useSelector(state => state.mainReducer.profile);
    const error = useSelector(state => state.appReducer.error);
    const loading = useSelector(state => state.appReducer.loading);

    const goBack = () => {
        dispatch({ type: SET_PROFILE, data: null });
        dispatch({ type: ERROR_DISPLAY_OFF });
        navigate('/');
    }

    useEffect(() => {
        dispatch(getProfile(id));
    }, [id]) // eslint-disable-line

    return(
        <div className='profile-wrap'>
            <button onClick={goBack} className='profile-back-button'>
                <ArrowBack />
                <span>GO BACK</span>
            </button>
            {!error && profile &&
                <div className='profile'>
                    <img src={profile?.image} alt="" />
                    <h1>{profile?.name}</h1>

                    <div className='profile-info'>
                        <span>Informations</span>

                        <h2>Gender</h2>
                        <div>{profile?.gender || 'unknown'}</div>

                        <h2>Status</h2>
                        <div>{profile?.status || 'unknown'}</div>

                        <h2>Specie</h2>
                        <div>{profile?.specie || 'unknown'}</div>

                        <h2>Origin</h2>
                        <div>{profile?.origin.name || 'unknown'}</div>

                        <h2>Type</h2>
                        <div>{profile?.type || 'unknown'}</div>
                    </div>
                </div>
            }
            {loading && <img className='loader' src={loader} alt="" />}
        </div>
    )
}

export default Profile;