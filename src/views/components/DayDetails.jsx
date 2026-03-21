
import SunsetIcon from '../../assets/icons/icons8-sunset-50.png';
import SunriseIcon from '../../assets/icons/icons8-sunrise-50.png';
import { TimeConverter } from '../../utils/TimeConverter';

export const DayDetails = ({ sunrise, sunset, timezone }) => {
    return (
        <div className="glass glass-strong" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '2vh', color: 'var(--text-primary)' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Day Details</h2>
            <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.2)', margin: '0.5rem 0 1rem 0' }} />

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                <img src={SunriseIcon} alt="sunrise" style={{ width: '4vh', height: '4vh' }} />
                <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div>Sun rises</div>
                    <div style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>
                        {sunrise ? TimeConverter(sunrise, timezone).substring(11, 16) : '--:--'}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                <img src={SunsetIcon} alt="sunset" style={{ width: '4vh', height: '4vh' }} />
                <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div>Sun sets</div>
                    <div style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>
                        {sunset ? TimeConverter(sunset, timezone).substring(11, 16) : '--:--'}
                    </div>
                </div>
            </div>
        </div>
    )
}