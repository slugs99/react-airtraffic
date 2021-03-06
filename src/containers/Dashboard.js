/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import Navbar from '../components/Navbars/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import CityCard from '../components/CityCard';
// import Footer from "components/Footer/Footer.js";

import bgImage from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';

import routes from '../routes';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../assets/styles/adminStyles';
import { getFlights1hourInterval } from '../services/backend';
import ICAO_JSON from '../utils/icao.json';

const useStyles = makeStyles(styles);

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const RenderTopTenBusy = ({ topTenBusy }) => {
  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        {topTenBusy?.slice(0, 3).map((city) => {
          return (
            <Grid item xs={4}>
              <CityCard key={city.city} city={city} />
            </Grid>
          );
        })}
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {topTenBusy?.slice(3, 6).map((city) => {
          return (
            <Grid item xs={4}>
              <CityCard key={city.city} city={city} />
            </Grid>
          );
        })}
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {topTenBusy?.slice(6, 9).map((city) => {
          return (
            <Grid item xs={4}>
              <CityCard key={city.city} city={city} />
            </Grid>
          );
        })}
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {topTenBusy?.slice(9, 10).map((city) => {
          return (
            <Grid item xs={4}>
              <CityCard key={city.city} city={city} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

RenderTopTenBusy.propTypes = {
  topTenBusy: PropTypes.arrayOf({
    name: PropTypes.string,
    count: PropTypes.number,
    arrivalCount: PropTypes.number,
  }),
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ps;

const Dashboard = ({ ...rest }) => {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = createRef();
  // states and functions
  const [image, setImage] = useState(bgImage);
  const [color, setColor] = useState('blue');
  const [fixedClasses, setFixedClasses] = useState('dropdown show');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topTenBusy, setTopTenBusy] = useState([]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== '/admin/maps';
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  
  const asyncFetchFlights = async () => {
    try {
      const record = {};
      const recordArr = [];
      setLoading(true);
      const flights = await getFlights1hourInterval();
      // console.log('flightsflights', flights);
      let flightInfo;
      flights.forEach((flight) => {
        const flightEstDepartureIcao = flight.estDepartureAirport;
        const flightEstArrivalIcao = flight.estArrivalAirport;
        let arrivalIncrement = 0;

        if (flightEstArrivalIcao) {
          flightInfo = ICAO_JSON[flightEstArrivalIcao];
          arrivalIncrement = 1;
        } else if (flightEstDepartureIcao) {
          flightInfo = ICAO_JSON[flightEstDepartureIcao];
          arrivalIncrement = 0;
        }

        if (flightInfo?.city) {
          record[flightInfo.city] = {
            ...flightInfo,
            count: (record?.[flightInfo.city]?.count ?? 0) + 1,
            arrivalCount:
              (record?.[flightInfo.city]?.arrivalIncrement ?? 0) + arrivalIncrement,
          };
          const found = recordArr.find((item) => item.city === flightInfo.city);
          if (!found) {
            recordArr.push(record[flightInfo.city]);
          } else {
            found.count = record[flightInfo.city].count;
            found.arrivalCount = record[flightInfo.city].arrivalCount;
          }
        }
      });

      console.log('recordArr', recordArr)

      setTopTenBusy(
        recordArr
          .sort((a, b) => {
            return a.count > b.count ? -1 : 1;
          })
          .slice(0, 10)
      );
    } catch (e) {
      console.log('asyncFetchFlights e', e)
    }

    setLoading(false);
  }

  // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    asyncFetchFlights();

    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel?.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <div className={classes?.wrapper ?? ''}>
      <Sidebar
        routes={routes}
        logoText={'Air Traffic'}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
            <LoadingOverlay
              active={loading}
              spinner
              text='Loading...'
              >
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
                <RenderTopTenBusy topTenBusy={topTenBusy} />
              </div>
            </LoadingOverlay>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
