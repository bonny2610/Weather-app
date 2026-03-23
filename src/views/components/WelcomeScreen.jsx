import '../../assets/styles/WelcomeScreen.css';
import weatherIcon from '../../assets/icons/weather-forecast.png';

export const WelcomeScreen = ({ randomTip }) => {
    return (
        <div className="weather-tips-container">
            <div className="ws-sun-ray" />
            <div className="ws-sun" />

            <div className="ws-cloud ws-c1">
                <svg width="220" height="70" viewBox="0 0 220 70" fill="none">
                    <ellipse cx="110" cy="50" rx="100" ry="22" fill="rgba(255,255,255,0.82)"/>
                    <ellipse cx="80"  cy="38" rx="55"  ry="28" fill="rgba(255,255,255,0.88)"/>
                    <ellipse cx="130" cy="34" rx="48"  ry="26" fill="rgba(255,255,255,0.9)"/>
                    <ellipse cx="160" cy="42" rx="38"  ry="20" fill="rgba(255,255,255,0.8)"/>
                </svg>
            </div>
            <div className="ws-cloud ws-c2">
                <svg width="300" height="80" viewBox="0 0 300 80" fill="none">
                    <ellipse cx="150" cy="60" rx="140" ry="22" fill="rgba(255,255,255,0.7)"/>
                    <ellipse cx="110" cy="44" rx="70"  ry="32" fill="rgba(255,255,255,0.75)"/>
                    <ellipse cx="175" cy="40" rx="65"  ry="30" fill="rgba(255,255,255,0.78)"/>
                    <ellipse cx="230" cy="52" rx="50"  ry="22" fill="rgba(255,255,255,0.68)"/>
                </svg>
            </div>
            <div className="ws-cloud ws-c3">
                <svg width="180" height="60" viewBox="0 0 180 60" fill="none">
                    <ellipse cx="90"  cy="44" rx="82"  ry="18" fill="rgba(255,255,255,0.65)"/>
                    <ellipse cx="65"  cy="32" rx="44"  ry="22" fill="rgba(255,255,255,0.7)"/>
                    <ellipse cx="115" cy="30" rx="40"  ry="20" fill="rgba(255,255,255,0.72)"/>
                </svg>
            </div>
            <div className="ws-cloud ws-c4">
                <svg width="260" height="75" viewBox="0 0 260 75" fill="none">
                    <ellipse cx="130" cy="55" rx="120" ry="20" fill="rgba(255,255,255,0.55)"/>
                    <ellipse cx="95"  cy="40" rx="60"  ry="28" fill="rgba(255,255,255,0.6)"/>
                    <ellipse cx="155" cy="37" rx="55"  ry="25" fill="rgba(255,255,255,0.62)"/>
                </svg>
            </div>
            <div className="ws-cloud ws-c5">
                <svg width="150" height="55" viewBox="0 0 150 55" fill="none">
                    <ellipse cx="75"  cy="40" rx="68"  ry="16" fill="rgba(255,255,255,0.5)"/>
                    <ellipse cx="55"  cy="28" rx="36"  ry="20" fill="rgba(255,255,255,0.55)"/>
                    <ellipse cx="95"  cy="26" rx="32"  ry="18" fill="rgba(255,255,255,0.58)"/>
                </svg>
            </div>

            <div className="ws-bird">
                <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                    <path d="M2 10 Q10 2 18 10 Q26 18 34 10 Q42 2 50 10 Q54 6 58 10" stroke="rgba(30,60,100,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
            </div>
            <div className="ws-bird2">
                <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
                    <path d="M2 7 Q7 2 12 7 Q17 12 22 7 Q27 2 32 7 Q35 4 38 7" stroke="rgba(30,60,100,0.45)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                </svg>
            </div>

            <p className="ws-badge">✦ Ultimate Legit Weather Forecast ✦</p>

            <div className="ws-icon-wrap">
                <div className="ws-orbit" />
                <div className="ws-ring" />
                <div className="ws-ring ws-ring2" />
                <div className="ws-icon-circle">
                    <img src={weatherIcon} alt="Weather Icon" style={{ width: '46px', height: '46px' }} />
                </div>
            </div>

            <h1 className="ws-headline">Hi, Welcome to the</h1>
           <h1 className="ws-headline"><em>Ultimate Weather System</em></h1> 
            <p className="ws-subline">Search any city across the globe</p>

            <div className="ws-tip-card">
                <div className="ws-card-inner">
                    <div className="ws-card-row">
                        <div className="ws-tip-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L12.4 7.5H18L13.8 11.2L15.5 17L10 13.5L4.5 17L6.2 11.2L2 7.5H7.6L10 2Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" fill="rgba(255,255,255,0.1)" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <div className="ws-tip-label">Weather Tips</div>
                            <p className="ws-tip-text">{randomTip}</p>
                        </div>
                    </div>
                    <div className="ws-divider" />
                    <div className="ws-card-footer">
                        <div><span className="ws-live-dot" /><span className="ws-cf-label">Live data ready</span></div>
                        <span className="ws-cf-hint">Enter a city to begin →</span>
                    </div>
                </div>
            </div>
        </div>
    );
};