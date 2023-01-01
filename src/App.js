import React, { useState, useEffect, useRef } from "react";
import { useMetaMask } from "metamask-react";
import { Button } from "antd";
import contract from './useWeb3';

import "./App.css";

const ModelViewer = require('@metamask/logo');

function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const [results, setResults] = useState({});

  const logoRef = useRef();
  const [refState, setRefState] = useState();

  useEffect(() => {
    if(refState) {
      const viewer = ModelViewer({
        // Dictates whether width & height are px or multiplied
        pxNotRatio: true,
        width: 300,
        height: 300,
        followMouse: true,
      });
    
      const container = document.getElementById('logo-container');
      console.log(container)
      container.appendChild(viewer.container);
    }
  }, [refState])

  if(status === "unavailable") {
    return(<h2>Please use another browser with MetaMask extension</h2>)
  }
  
  if (status === "notConnected" || status === "connecting") {
    return(
      <div className="connect-button-container">
        <div id="logo-container" ref={el => {
          logoRef.current = el;
          if(!refState) setRefState(true);
        }}></div>
        <Button 
          className="connect-button" 
          type="primary" 
          onClick={connect} 
          loading={status === "connecting"} 
          disabled={status === "connecting"}
        >
          {status === "connecting" ? "Connecting" : "Connect to MetaMask"}
        </Button>
      </div>
    );
  }

  const handleFunctionCall = async (functionName, arguements) => {
    if(functionName === "getNoOfSurveys") {
      contract.methods.getNoOfSurveys().call().then(function(result) {
        setResults(results => ({ ...results, noOfSurveys: result }));
      });
    }

    if(functionName === "totalSupply") {
      contract.methods.totalSupply().call().then(function(result) {
        setResults(results => ({ ...results, totalSupply: result }));
      });
    }
  }

  return (
    <div className="App">
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("getNoOfSurveys")}>Get Number Of Surveys</Button>
        {results?.noOfSurveys && <span>Number Of Surveys: <span className="bold">{results?.noOfSurveys}</span></span>}
      </div>

      <div className="function-container">
        <Button onClick={() => handleFunctionCall("totalSupply")}>Get Total Supply</Button>
        {results?.totalSupply && <span>Total Supply: <span className="bold">{results?.totalSupply}</span></span>}
      </div>
    </div>
  );
}

export default App;
