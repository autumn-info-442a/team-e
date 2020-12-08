import React from 'react'
import { GetCookie } from '../GetCookie'
import { Container, Typography, CardContent } from '@material-ui/core';
export class Comment extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        data: '',
      };
    }

    componentDidMount () {
      this.getGroupComments(this.props.auth, this.props.groupId, 1);
    }

    render() {

        return (
          <div>
            {this.state.data 
            ?(<div>
              {this.state.data.map((card) => (
            <CardContent style={{ padding: "5px", borderBottom:"0.5px solid #ebebeb" }}>
            <Typography component="p" variant="p" style={{fontSize:"13px"}}>
                {card.commentContent}</Typography>
                <Typography component="p" variant="p"color="textSecondary" style={{fontSize:"11px"}}>
                {Date(card.createdAt).substring(0, 16)}</Typography>
        </CardContent>))}</div>)     
            : (<Container style={{
              Width: "100%",
              Height: "20x",
            }} maxWidth="md"> 
            <h4 id="title">No comments yet...</h4>
          </Container>)}
          </div>
            
          )
    }

    getGroupComments = (auth, groupId, page) => {
      setTimeout(() => {
        var url =
          "https://groups.cahillaw.me/v1/groups/" + groupId + "/comments?";
        if (page !== "") {
          url = url + "page=" + page;
        }
  
        fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        }).then((response) => {
          if (response.status <= 201) {
            response.json().then((data) => {
              console.log("GET COMMENTS", data);
              this.setState({
                data: data
              })
            });
          } else {
            console.log("failed :(");
          }
        });
      }, 0);
    };

}

export default Comment
