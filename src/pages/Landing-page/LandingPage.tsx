import styles from './LandingPage.module.css';


const Dashboard = () => {
  const formattedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    const dateDormat = date.toLocaleDateString('hu-HU', options);
    return dateDormat.charAt(0).toUpperCase() + dateDormat.slice(1);
  }
  

  return (
    <>
    <div className={`${styles.dashboard} container vh-100`}>
      {/* Közelgő események */}
      <div className={`${styles.header} d-flex justify-content-between align-items-center`}>
        <h1 className='fw-semibold mx-1'>Családi Központ</h1>
        <i className={`${styles.bellIcon} fa-regular fa-bell mx-3`}></i>
      </div>
      {/* Naptár kártya */}
      <div className={`container-fluid`}>
        <div className='d-flex align-items-center'>
          <i className={`${styles.calendarIcon} fa-regular fa-calendar`}></i>
          <h2 className='mx-2'>Közelgő Események</h2>
        </div>
        <div className='card my-3'>
          <h2 className={`card-title mx-2 my-1`}>{formattedDate(new Date())}</h2>
          <div className='card-body'>
            <p className='card-text'>Nincs esemény a mai napra.</p>
          </div>
        </div>
      </div>


    </div>
    </>
  );
};

export default Dashboard;
