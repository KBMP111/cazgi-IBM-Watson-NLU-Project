import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
    return (
      <div>
      let emotionsArray = Object.entries(this.props.emotions)  ;
      let tableEmotions = emotionsArray.map((tableEmotion)=>{
      Object.entries(this.props.emotions).map(function(mapentry) {

          return (

              <tr>
              <td>{mapentry[0]}</td>
              <td>{mapentry[1]}</td>
              </tr>

          )
          })
    });
    </div>)}}
export default EmotionTable;
