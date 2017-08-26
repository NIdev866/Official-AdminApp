import React from 'react'

class workBox extends React.Component {

  render() {

    const MainBoxStylingOuter = {
      overflow: "hidden",
      width: "270px",
      height: "60px",
      border: "1px solid",
      background: "white",
      fontSize: "13px"
    }

    const MainBoxStylingMiddle = {
      height: "100%",
      width: "100%",
      overflow: "hidden"
    }

    const MainBoxStylingInner = {
      height: "100%",
      width: "100%",
      overflow: "auto",
      paddingRight: "20px"

    }

    const workStyling = {
      cursor: "default",
      userSelect: "none",
      color: "rgb(109, 109, 109)",
      position: "relative",
      marginLeft: "1px",
      overflow: "hidden",
      width: "268px",
      height: "40px", //perfect height
      borderBottom: "1px solid rgb(200, 200, 200)"
    }



    let workSections = []

    if(this.props.durations){

      workSections = this.props.durations.map((duration, i)=>{





        const workNameStyle = {
          position: "absolute",
          marginLeft: "10px",
          marginTop: "12px",
        }

        const durationResultStyle = {
          position: "absolute",
          marginLeft: "140px",
          marginTop: "12px",
        }

        const cancelButtonStyle = {
          cursor: "pointer",
          fontSize: "20px",
          position: "absolute",
          marginLeft: "235px",
          marginTop: "7px",
          width: "23px",
          height: "23px",
          border: "1px solid"
        }


/*        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(JSON.stringify(duration));         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("root").appendChild(node);     // Append <li> to <ul> with id="myList"*/

        let durationResult = ""
        let workName = this.props.workMarkers[i].name

        if(workName.length >= 15){
          workName = workName.substring(0, 15) + "..."
        }


        if(duration.rows[0].elements[0].duration){
          durationResult = duration.rows[0].elements[0].duration.text
        }
        //const workName = SOMEHOW CONNECT IT TO name PROPERTY OF EACH workMarker

    
        return(
          <div style={workStyling}>
            <div style={workNameStyle}>{workName}</div>
            <div style={durationResultStyle}>{durationResult}</div>
            <div style={cancelButtonStyle}>X</div>
          </div>
        )
    
    
      })
    }






    return (
      <div style={MainBoxStylingOuter}>
        <div style={MainBoxStylingMiddle}>
          <div style={MainBoxStylingInner}>
            {workSections}
          </div>
        </div>
      </div>
    )
  }
}

export default workBox