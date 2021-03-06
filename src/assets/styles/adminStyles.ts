import { drawerWidth, transition, container } from './material-dashboard-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appStyle = (theme: any): any => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
  },
  container,
  map: {
    marginTop: '70px',
  },
});

export default appStyle;
