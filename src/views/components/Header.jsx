
import { createPortal } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../assets/styles/Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import weatherIcon from '../../assets/icons/weather-forecast.png';

export const Header = ({ address, setAddress, fetchData, metrics, setMetrics, recentSearches, bg, hasData, onReset }) => {
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }

    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <>
            {createPortal(
                <div id="mySidenav" className="sidenav">
                    <a className="closebtn" onClick={closeNav}>&times;</a>
                    <div style={{ display: 'flex', flexDirection: 'row', color: 'white', justifyContent: 'center' }}>
                        <i className='bi bi-gear-fill' style={{ color: 'white', fontSize: '3vh' }}></i>
                        <h3 style={{ padding: '0 2vh', textAlign: 'center' }}>Settings</h3>
                    </div>
                    <hr />
                    <label>Change metrics system</label>
                    <select value={metrics} onChange={(e) => setMetrics(e.target.value)}>
                        <option disabled>Select an option</option>
                        <option value={"metric"}>Metric</option>
                        <option value={"imperial"}>Imperial</option>
                        <option value={"standard"}>Standard</option>
                    </select>
                    <hr />
                    <div className='recent-searches'>
                        <h2>Recent Searches</h2>
                        <ul>
                            {recentSearches.map((search, index) => (
                                <li key={index}>{search}</li>
                            ))}
                        </ul>
                    </div>
                </div>,
                document.body
            )}

            <nav
                className="navbar navbar-expand-lg glass shadow-sm"
                style={{
                    backgroundColor: !hasData ? 'rgba(3,2,10,0.5)' : 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: !hasData ? '1px solid rgba(126,179,255,0.08)' : 'none',
                    padding: '6px 16px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <div className="container-fluid" style={{ padding: 0 }}>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <span
                            className="navbar-brand"
                            onClick={onReset}
                            style={{
                                color: !hasData ? '#dde8ff' : 'var(--text-primary)',
                                fontSize: '16px',
                                fontWeight: '600',
                                margin: 0,
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <img src={weatherIcon} alt="App Icon" style={{ width: '22px', height: '22px', marginRight: '8px' }} />
                            Weather App
                        </span>
                        <form className="d-flex ms-auto" role="search" onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter the city name"
                                className="form-control me-2"
                                style={{ padding: '4px 10px', fontSize: '14px' }}
                            />
                            <button className="btn btn-outline-success" type="submit" style={{ padding: '4px 12px', fontSize: '14px' }}>
                                Search
                            </button>
                            <div id="main" style={{ textAlign: "right", padding: "0 2vh" }}>
                                <i className="bi bi-gear-fill" onClick={openNav} style={{ fontSize: '18px', color: !hasData ? '#7eb3ff' : 'black', cursor: 'pointer' }}></i>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};