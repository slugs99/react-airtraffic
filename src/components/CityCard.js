/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import imgHiking from '../assets/img/hiking-by-golden-gate-bridge.jpg';
import imgSkyscrapers from '../assets/img/skyscrapers-looking-up.jpg';
import imgTokyo from '../assets/img/tokyo-at-night.jpg';
import imgWhiteBridge from '../assets/img/white-bridge-over-calm-lake.jpg';

const randomImages = [imgHiking, imgSkyscrapers, imgTokyo, imgWhiteBridge];
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 430,
  },
  header: {
    height: 50,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CityCard = ({ city }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    // setExpanded(!expanded);
  };

  const cityAndState = city.city !== city.state ? `${city.city} - ${city.state}` : city.city;

  const title = `${cityAndState} (${city.count})`

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={city.name}
      />
      <CardMedia
        className={classes.media}
        image={randomImages[Math.floor(Math.random() * 4)]}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Arrival count: {city.arrivalCount}
          <br />
          Departure count: {city.count - city.arrivalCount}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CityCard;

CityCard.propTypes = {
  city: {
    name: PropTypes.string,
    count: PropTypes.number,
    arrivalCount: PropTypes.number,
  },
};
