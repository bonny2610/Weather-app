
import LocationIcon from '../../assets/icons/icons8-location-50.png';
import { TimeConverter } from '../../utils/TimeConverter';

const LocationContainter = ({ address, lat, lon, timeUnix, timezone }) => {
    return (
        <div
            className="glass glass-strong"
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '2vh',
                color: 'var(--text-primary)'
            }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Location Details</h2>
            <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.2)', margin: '0.5rem 0 1rem 0' }} />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                <img src={LocationIcon} alt="location" style={{ width: '2.5vh', height: '2.5vh' }} />
                <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{address}</div>
            </div>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
                <li>Time: {TimeConverter(timeUnix, timezone).substring(11, 16)}</li>
                <li>Latitude: {lat}</li>
                <li>Longitude: {lon}</li>
            </ul>
        </div>
    )
}

export default LocationContainter