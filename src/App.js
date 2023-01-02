import React, { useState, useEffect, useRef } from "react";
import { useMetaMask } from "metamask-react";
import { Button } from "antd";
import {contract, web3} from './useWeb3';

import "./App.css";

const ModelViewer = require('@metamask/logo');

function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  let [address0, setAddress0] = useState("");
  let [address1, setAddress1] = useState("");
  let [address2, setAddress2] = useState("");
  let [address3, setAddress3] = useState("");
  let [address4, setAddress4] = useState("");
  let [address5, setAddress5] = useState("");
  let [address6, setAddress6] = useState("");
  let [surveyId, setSurveyId] = useState("");
  let [surveyId1, setSurveyId1] = useState("");
  let [surveyId2, setSurveyId2] = useState("");
  let [surveyId3, setSurveyId3] = useState("");
  let [ipfshash, setIpfshash] = useState("");
  let [surveydeadline, setSurveydeadline] = useState("");
  let [numchoices, setNumchoices] = useState("");
  let [atmostchoice, setAtmostchoice] = useState("");
  let [projectId, setProjectId] = useState("");
  let [choices, setChoices] = useState("");
  let [myGovTokenAmount, setMyGovTokenAmount] = useState("");
  let [myGovTokenAmount1, setMyGovTokenAmount1] = useState("");
  let [myGovTokenAmount2, setMyGovTokenAmount2] = useState("");

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

  const str2arr = (str) => str.substring(1,str.length -1).split(",").map(s=>parseInt(s))
  const handleFunctionCall = async (functionName) => {
    if(functionName === "getNoOfSurveys") {
      contract.methods.getNoOfSurveys().call().then(function(result) {
        setResults(results => ({ ...results, getNoOfSurveys: result }));
      });
    }

    if(functionName === "totalSupply") {
      contract.methods.totalSupply().call().then(function(result) {
        setResults(results => ({ ...results, totalSupply: result }));
      });
    }

    if(functionName === "getNoOfFundedProjects") {
      contract.methods.getNoOfFundedProjects().call().then(function(result) {
        setResults(results => ({ ...results, getNoOfFundedProjects: result }));
      });
    }

    if(functionName === "balanceOf") {
      if(address0 === "") {
        setResults((results)=>({...results, balanceOf: null}))
        return
      }
      contract.methods.balanceOf(address0).call().then(function(result) {
        setResults(results => ({ ...results, balanceOf: result }));
        setAddress0("")
      })
    }

    if(functionName === "getSurveyInfo") {
      contract.methods.getSurveyInfo(surveyId).call().then(function(result) {
        setResults(results => ({ ...results, getSurveyInfo: result }));
        setSurveyId("")
      });
    }

    if(functionName === "getSurveyOwner") {
      contract.methods.getSurveyOwner(surveyId1).call().then(function(result) {
        setResults(results => ({ ...results, getSurveyOwner: result }));
        setSurveyId1("")
      });
    }

    if(functionName === "getProjectNextPayment") {
      contract.methods.getProjectNextPayment(projectId).call().then(function(result) {
        setResults(results => ({ ...results, getProjectNextPayment: result }));
        setProjectId("")
      });
    }


    if(functionName === "faucet") {
      contract.methods.faucet().send({from: account, gas:4700000},(err) => {
        if(err) {
          console.error(err);
          setResults(results => ({ ...results, faucet: "False" }));
        } else {
          setResults(results => ({ ...results, faucet: "True" }));
        }
      })

    }

    if(functionName === "transfer") {
      contract.methods.transfer(address1, parseInt(myGovTokenAmount)).send({from: account, gas:4700000},(err) => {
        if(err) {
          console.error(err);
          setResults(results => ({ ...results, transfer: "False" }));
        } else {
          setResults(results => ({ ...results, transfer: "True" }));
        }
        setAddress1("")
        setMyGovTokenAmount("")
      })
    }

    if(functionName === "transferFrom") {
      contract.methods.transferFrom(address2, address3, parseInt(myGovTokenAmount1)).send({from: account, gas:4700000},(err) => {
        if(err) {
          console.error(err);
          setResults(results => ({ ...results, transferFrom: "False" }));
        } else {
          setResults(results => ({ ...results, transferFrom: "True" }));
        }
        setAddress2("")
        setAddress3("")
        setMyGovTokenAmount1("")
      })
    }

    if(functionName === "approve") {
      contract.methods.approve(address4, parseInt(myGovTokenAmount2)).send({from: account, gas:4700000},(err) => {
        if(err) {
          console.error(err);
          setResults(results => ({ ...results, approve: "False" }));
        } else {
          setResults(results => ({ ...results, approve: "True" }));
        }
        setAddress4("")
        setMyGovTokenAmount2("")
      })
    }

    if(functionName === "allowance") {
      contract.methods.allowance(address5, address6).send({from: account, gas:4700000},(err) => {
        if(err) {
          console.error(err);
          setResults(results => ({ ...results, allowance: results }));
        } else {
          setResults(results => ({ ...results, allowance: results }));
        }
        setAddress4("")
        setMyGovTokenAmount2("")
      })
    }

    if(functionName === "submitSurvey") {
      contract.methods.submitSurvey(ipfshash, parseInt(surveydeadline), parseInt(numchoices), parseInt(atmostchoice)).send({from: account, gas:web3.utils.toWei("0.05","ether")},(err) => {
        if(err) {
          console.error(err);
          setResults(results => ({ ...results, submitSurvey: results }));
        } else {
          setResults(results => ({ ...results, submitSurvey: results }));
        }
        setAddress4("")
        setMyGovTokenAmount2("")
      })
    }

    if(functionName === "takeSurvey") {
      contract.methods.takeSurvey(surveyId2, str2arr(choices)).send({from: account, gas:4700000},(err) => {
        if(err) {
          console.error(err);
          setResults(results => ({ ...results, takeSurvey: results }));
        } else {
          setResults(results => ({ ...results, takeSurvey: results }));
        }
        setSurveyId3("")
        setChoices("")
      })
    }

    if(functionName === "getSurveyResults") {
      contract.methods.getSurveyResults(surveyId3).send({from: account, gas:4700000},(err) => {
        if(err) {
          console.error(err);
          setResults(results => ({ ...results, getSurveyResults: results }));
        } else {
          setResults(results => ({ ...results, getSurveyResults: results }));
        }
        setSurveyId3("")
      })
    }
  }

  return (
    <div className="App">
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("getNoOfSurveys")}>Get Number Of Surveys</Button>
        {results?.getNoOfSurveys && <span>Number Of Surveys: <span className="bold">{results?.getNoOfSurveys}</span></span>}
      </div>

      <div className="function-container">
        <Button onClick={() => handleFunctionCall("totalSupply")}>Get Total Supply</Button>
        {results?.totalSupply && <span>Total Supply: <span className="bold">{results?.totalSupply}</span></span>}
      </div>

      <div className="function-container">
        <Button onClick={() => handleFunctionCall("getNoOfFundedProjects")}>Get Number Of Funded Projects</Button>
        {results?.getNoOfFundedProjects && <span>Number Of Funded Projects: <span className="bold">{results?.getNoOfFundedProjects}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={address0}
            onChange={(e) => setAddress0(e.target.value)}
            placeholder="Address"
        />
        <Button onClick={() => handleFunctionCall("balanceOf")}>Get Balance of a User</Button>
        {results?.balanceOf && <span>Balance of a User: <span className="bold">{results?.balanceOf}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={surveyId}
            onChange={(e) => setSurveyId(e.target.value)}
            placeholder="Survey Id"
        />
        <Button onClick={() => handleFunctionCall("getSurveyInfo")}>Get Survey Info</Button>
        {results?.getSurveyInfo && <span>Survey Info: <span className="bold">{results?.getSurveyInfo}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={surveyId1}
            onChange={(e) => setSurveyId1(e.target.value)}
            placeholder="Survey Id"
        />
        <Button onClick={() => handleFunctionCall("getSurveyOwner")}>Get Survey Owner</Button>
        {results?.getSurveyOwner && <span>Survey Owner: <span className="bold">{results?.getSurveyOwner}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Project Id"
        />
        <Button onClick={() => handleFunctionCall("getProjectNextPayment")}>Get Project Next Payment</Button>
        {results?.getProjectNextPayment && <span>Project Next Payment: <span className="bold">{results?.getProjectNextPayment}</span></span>}
      </div>

      <div className="function-container">
        <Button onClick={async () => await handleFunctionCall("faucet")}>Faucet</Button>
        {results?.faucet && <span>Faucet: <span className="bold">{results?.faucet}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="Destination Address"
        />
        <input
            type="text"
            value={myGovTokenAmount}
            onChange={(e) => setMyGovTokenAmount(e.target.value)}
            placeholder="Amount"
        />
        <Button onClick={() => handleFunctionCall("transfer")}>Transfer MyGov Token</Button>
        {results?.transfer && <span>Result: <span className="bold">{results?.transfer}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Source Address"
        />
        <input
            type="text"
            value={address3}
            onChange={(e) => setAddress3(e.target.value)}
            placeholder="Destination Address"
        />
        <input
            type="text"
            value={myGovTokenAmount1}
            onChange={(e) => setMyGovTokenAmount1(e.target.value)}
            placeholder="Amount"
        />
        <Button onClick={() => handleFunctionCall("transfer")}>Transfer Token F. Another Account</Button>
        {results?.transferFrom && <span>Result: <span className="bold">{results?.transferFrom}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={address4}
            onChange={(e) => setAddress4(e.target.value)}
            placeholder="Spender Address"
        />
        <input
            type="text"
            value={myGovTokenAmount2}
            onChange={(e) => setMyGovTokenAmount2(e.target.value)}
            placeholder="Amount"
        />
        <Button onClick={() => handleFunctionCall("approve")}>Approve</Button>
        {results?.approve && <span>Result: <span className="bold">{results?.approve}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={address5}
            onChange={(e) => setAddress5(e.target.value)}
            placeholder="Owner Address"
        />
        <input
            type="text"
            value={address6}
            onChange={(e) => setAddress6(e.target.value)}
            placeholder="Spender Address"
        />
        <Button onClick={() => handleFunctionCall("allowance")}>Allowance</Button>
        {results?.allowance && <span>Result: <span className="bold">{results?.allowance}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={ipfshash}
            onChange={(e) => setIpfshash(e.target.value)}
            placeholder="Ipfshash"
        />
        <input
            type="text"
            value={surveydeadline}
            onChange={(e) => setSurveydeadline(e.target.value)}
            placeholder="Survey Deadline"
        />
        <input
            type="text"
            value={numchoices}
            onChange={(e) => setNumchoices(e.target.value)}
            placeholder="Num Choices"
        />
        <input
            type="text"
            value={atmostchoice}
            onChange={(e) => setAtmostchoice(e.target.value)}
            placeholder="At Most Choice"
        />
        <Button onClick={() => handleFunctionCall("submitSurvey")}>Submit Survey</Button>
        {results?.submitSurvey && <span>Result: <span className="bold">{results?.submitSurvey}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={surveyId2}
            onChange={(e) => setSurveyId2(e.target.value)}
            placeholder="Survey Id"
        />
        <input
            type="text"
            value={choices}
            onChange={(e) => setChoices(e.target.value)}
            placeholder="Choices"
        />
        <Button onClick={() => handleFunctionCall("takeSurvey")}>Take Survey</Button>
        {results?.takeSurvey && <span>Result: <span className="bold">{results?.takeSurvey}</span></span>}
      </div>

      <div className="function-container">
        <input
            type="text"
            value={surveyId3}
            onChange={(e) => setSurveyId3(e.target.value)}
            placeholder="Survey Id"
        />
        <Button onClick={() => handleFunctionCall("getSurveyResults")}>Get Survey Results</Button>
        {results?.getSurveyResults && <span>Survey Results: <span className="bold">{results?.getSurevyResults}</span></span>}
      </div>
    </div>
  );
}

export default App;
