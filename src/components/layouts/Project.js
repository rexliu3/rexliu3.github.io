import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import FavoriteIcon from '@material-ui/icons/Favorite';
import GitHubIcon from '@material-ui/icons/GitHub';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LinkIcon from '@material-ui/icons/Link';
import Chip from "@material-ui/core/Chip"


const useStyles = makeStyles((theme) => ({
  root: {
    width: '30vw',
    margin:'initial',
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
  project: {
    fontSize: '2rem',
    fontFamily: 'Times New Roman'
  },
  summary: {
    fontSize: '1.5rem',
    fontWeight: '500',
    fontFamily: 'Times New Roman'
  },
  list: {
    listStyleType: 'circle',
    fontSize: '1.5rem',
    listStylePosition: 'outside',
    background: 'green',
    lineHeight: '2rem',
    marginTop:'-3vw'
  },
  list_item: {
    marginLeft: '1rem',
    marginTop: '0.5rem'
  },
  inner: {
    marginLeft: '-1rem'
  },
  chip: {
    margin: '0.25rem',
    fontSize: '1rem'
  }
}));

const Project = (props) => {
  const { data } = props; 
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikedClick = () => {
    setLiked(!liked);
  }

  const handleClick = () => {};


/*
[0] : Project Name
[1] : Image Location
[2] : Description
[3] : Tools
[4] : github link
[5] : date
[6] : Short Summary
[7] : Big Image
[8] : Link
 */

  return (
    <Card className='project' className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className='project__logo' className={classes.avatar}
          src={data[1]}>
          </Avatar>
        }
        title={<h2 className={classes.project}>{data[0]}</h2>}
        className={classes.title}
      />
      <CardMedia
        className='project__media'
        className={classes.media}
        image={data[7]}
      />

      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p" className={classes.summary}>
          {data[6]}
        </Typography>
      </CardContent>

      <CardContent>
        {data[3].map(tool => 
          <Chip className={classes.chip} onClick={handleClick} variant="outlined" size="small" label={tool}/>
          )}
      </CardContent>


      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLikedClick}>
          {!liked &&  <FavoriteIcon />}
          {liked && <FavoriteIcon color='secondary'/>}
        </IconButton>

        <IconButton aria-label="github" href={data[4]} target="_blank">
          <GitHubIcon />
        </IconButton>

        {data.length == 9 && 
        <IconButton aria-label="link" href={data[8]} target="_blank">
          <LinkIcon />
        </IconButton>
        }

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ui className={classes.list} className='listy'>
            {data[2].map(descript =>
              <li className={classes.list_item}><span className={classes.inner}>{descript}</span></li>
              )}
          </ui>
        </CardContent>
      </Collapse>
    </Card>

    /*<section className="project__grid__item">
        <img className="project__grid__item__image" src={data[1]}></img>
        <div className="project__grid__item__content">
          <h3 className="project__grid__item__content__header">{data[0]}</h3>
          <a href={data[4]} target="_blank">
            <img className="project__grid__item__content__github" src="assets/GitHub-Logo.png"></img>
          </a>
          <p className="project__grid__item__content__date">{data[5]}</p>
          <br></br>
          <p className="project__grid__item__content__descriptor">Description:</p>
          <ul className="project__grid__item__content__description">
            {data[2][0] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][0]}</li>
            )}
            {data[2][1] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][1]}</li>
            )}
            {data[2][2] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][2]}</li>
            )}
            {data[2][3] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][3]}</li>
            )}
            {data[2][4] !== "" && (
               <li className="project__grid__item__content__description__item">{data[2][4]}</li>
            )}
          </ul>
          <br></br>
          <p className="project__grid__item__content__descriptor">Tools:&nbsp;</p>
          <p className="project__grid__item__content__tools">{data[3]}</p>
      </div>
            </section>*/
  );
};

export default Project;
