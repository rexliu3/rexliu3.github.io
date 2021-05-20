import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Extracurricular = (props) => {
  const { data } = props; 

  return (
    <Card className="extracurricular">
      <img className="extracurricular__img"  src={data.logo} />
      <div>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4" component="h2">
              {data.company}
            </Typography>
            <Typography variant="h5" component="h3">
              &nbsp; <strong style={{color:"#63A9AE", fontWeight: "normal"}} >{data.title}</strong> | {data.date}
            </Typography>
            <ul>
            {data.description.map(point =>
            <li style={{"list-style-type": "circle", "margin-left": '1vw'}}>
              <Typography style={{fontSize:"1.25rem"}} color="textSecondary">
                {point}
              </Typography> 
              </li>              
              )}
              </ul>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <a href={data.website} target="_blank" style={{textDecoration:'None'}}>
            <Button style={{marginTop:"-1vw"}} className="extracurriculars__button" size="large" variant="text">
              Learn More
            </Button>
          </a>
        </CardActions>
      </div>
    </Card>
  );
};

export default Extracurricular;
