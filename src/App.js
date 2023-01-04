import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Web3 from 'web3';
import { contract_address, my_gov_abi } from "./useWeb3";

import "./App.css";

const ModelViewer = require('@metamask/logo');

function App() {
  const [account, setAccount] = useState();
  const [web3State, setWeb3State] = useState();
  const [contractState, setContractState] = useState();

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
  let [projectId2, setProjectId2] = useState("");
  let [projectId3, setProjectId3] = useState("");
  let [projectId4, setProjectId4] = useState("");
  let [projectId5, setProjectId5] = useState(""); 
  let [projectId6, setProjectId6] = useState("");
  let [projectId7, setProjectId7] = useState("");
  let [projectId99, setProjectId99] = useState("");
  let [projectId98, setProjectId98] = useState("");
  let [projectId97, setProjectId97] = useState("");
  let [choices, setChoices] = useState("");
  let [choice1, setChoice1] = useState("");
  let [choice2, setChoice2] = useState("");
  let [myGovTokenAmount, setMyGovTokenAmount] = useState("");
  let [myGovTokenAmount1, setMyGovTokenAmount1] = useState("");
  let [myGovTokenAmount2, setMyGovTokenAmount2] = useState("");
  let [donateEtherAmount, setDonateEtherAmount] = useState("");
  let [donateMyGovTokenAmount, setDonateMyGovTokenAmount] = useState("");
  let [ipfshash2, setIpfshash2] = useState("");
  let [voteDeadline, setVoteDeadline] = useState("");
  let [paymentAmounts, setPaymentAmounts] = useState("");
  let [paySchedule, setPaySchedule] = useState("");
  let [memberAddress, setMemberAddress] = useState("");

  const [results, setResults] = useState({});

  const logoRef = useRef();
  const [refState, setRefState] = useState();

  let selectedAccount;
  let provider = window.ethereum;

  const handleConnect = () => {
    if (typeof provider !== 'undefined') {
      // Metamask is installed.
      provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
        selectedAccount = accounts[0];
        setAccount(selectedAccount);
        console.log(`SelectedAccount is: ${selectedAccount}`);
      }).catch(err => {
        console.log(err);
        return;
      })
    }
  
    window.ethereum.on('accountsChanged', function (accounts) {
      selectedAccount = accounts[0];
      console.log(`SelectedAccount changed to: ${selectedAccount}`);
    });
  
    const web3 = new Web3(provider);
    setWeb3State(web3);

    const contract = new web3.eth.Contract(my_gov_abi, contract_address);
    setContractState(contract);
  }

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
  
  if (!account) {
    return(
      <div className="connect-button-container">
        <div id="logo-container" ref={el => {
          logoRef.current = el;
          if(!refState) setRefState(true);
        }}></div>
        <Button 
          className="connect-button" 
          type="primary" 
          onClick={() => handleConnect()} 
        >
          Connect to MetaMask
        </Button>
      </div>
    );
  }

  const str2arr = (str) => str.substring(1,str.length -1).split(",").map(s=>parseInt(s))
  const str2WeiArr = (str) => str.substring(1,str.length -1).split(",").map(s=>web3State.utils.toWei(s, "wei"))
  const str2bool = (str) => str === "true" ? true : false
  const handleFunctionCall = async (functionName) => {
    if(functionName === "getNoOfSurveys") {
      contractState.methods.getNoOfSurveys().call().then(function(result) {
        setResults(results => ({ ...results, getNoOfSurveys: result }));
      });
    }

    if(functionName === "totalSupply") {
      contractState.methods.totalSupply().call().then(function(result) {
        setResults(results => ({ ...results, totalSupply: result }));
      });
    }

    if(functionName === "getNoOfFundedProjects") {
      contractState.methods.getNoOfFundedProjects().call().then(function(result) {
        setResults(results => ({ ...results, getNoOfFundedProjects: result }));
      });
    }

    if(functionName === "getNoOfProjectProposals") {
      contractState.methods.getNoOfProjectProposals().call().then(function(result) {
        setResults(results => ({ ...results, getNoOfProjectProposals: result }));
      });
    }

    if(functionName === "balanceOf") {
      contractState.methods.balanceOf(address0).call().then(function(result) {
        setResults(results => ({ ...results, balanceOf: result }));
      })
    }

    if(functionName === "getSurveyInfo") {
      contractState.methods.getSurveyInfo(surveyId).call().then(function(result) {
        setResults(results => ({ ...results, getSurveyInfo: result }));
      });
    }

    if(functionName === "getSurveyOwner") {
      contractState.methods.getSurveyOwner(surveyId1).call().then(function(result) {
        setResults(results => ({ ...results, getSurveyOwner: result }));
      });
    }

    if(functionName === "getProjectNextPayment") {
      contractState.methods.getProjectNextPayment(projectId).call().then(function(result) {
        setResults(results => ({ ...results, getProjectNextPayment: result }));
      });
    }

    if(functionName === "getProjectNextPaySchedule") {
      contractState.methods.getProjectNextPaySchedule(projectId2).call().then(function(result) {
        setResults(results => ({ ...results, getProjectNextPaySchedule: result }));
      });
    }


    if(functionName === "faucet") {
      contractState.methods.faucet().send({from: account, gas:4700000})
      .then(result => {
        console.log(result);
        setResults(results => ({ ...results, faucet: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, faucet: "False" }));
      })
    }

    if(functionName === "transfer") {
      contractState.methods.transfer(address1, parseInt(myGovTokenAmount)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, transfer: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, transfer: "False" }));
      })
    }

    if(functionName === "transferFrom") {
      contractState.methods.transferFrom(address2, address3, parseInt(myGovTokenAmount1)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, transferFrom: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, transferFrom: "False" }));
      })
    }

    if(functionName === "approve") {
      contractState.methods.approve(address4, parseInt(myGovTokenAmount2)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, approve: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, approve: "False" }));
      })
    }

    if(functionName === "allowance") {
      contractState.methods.allowance(address5, address6).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, allowance: 'True' }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, allowance: 'False' }));
      })
    }

    if(functionName === "submitSurvey") {
      contractState.methods.submitSurvey(ipfshash, parseInt(surveydeadline), parseInt(numchoices), parseInt(atmostchoice)).send({from: account, gas: 5000000 , value:web3State.utils.toWei("0.04","ether")})
      .then(result => {
        setResults(results => ({ ...results, submitSurvey: 'True' }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, submitSurvey: 'False' }));
      })
    }

    if(functionName === "takeSurvey") {
      contractState.methods.takeSurvey(surveyId2, str2arr(choices)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, takeSurvey: 'True' }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, takeSurvey: 'False' }));
      })
    }

    if(functionName === "getSurveyResults") {
      contractState.methods.getSurveyResults(surveyId3).call({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, getSurveyResults: result }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, getSurveyResults: err }));
      })
    }

    if(functionName === "donateEther") {
      contractState.methods.donateEther().send({from: account, gas:4700000, value:web3State.utils.toWei(donateEtherAmount,'wei')})
      .then(result => {
        setResults(results => ({ ...results, donateEtherAmount: 'True' }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, donateEtherAmount: 'False' }));
      })
    }

    if(functionName === "donateMyGovToken") {
      contractState.methods.donateMyGovToken(parseInt(donateMyGovTokenAmount)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, donateMyGovTokenAmount: 'True' }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, donateMyGovTokenAmount: 'False' }));
      })
    }

    if(functionName === "submitProjectProposal") {
      contractState.methods.submitProjectProposal(ipfshash2, parseInt(voteDeadline), str2WeiArr(paymentAmounts), str2arr(paySchedule)).send({from: account, gas: 5000000 , value:web3State.utils.toWei("0.10","ether")})
      .then(result => {
        setResults(results => ({ ...results, submitProjectProposal: 'True' }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, submitProjectProposal: 'False' }));
      })
    }

    if(functionName === "getProjectInfo") {
      contractState.methods.getProjectInfo(projectId3).call().then(function(result) {
        setResults(results => ({ ...results, getProjectInfo: result }));
      });
    }

    if(functionName === "getProjectOwner") {
      contractState.methods.getProjectOwner(projectId4).call().then(function(result) {
        setResults(results => ({ ...results, getProjectOwner: result }));
      });
    }

    if(functionName === "voteForProjectProposal") {
      contractState.methods.voteForProjectProposal(projectId5,str2bool(choice1)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, voteForProjectProposal: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, voteForProjectProposal: "False" }));
      })
    }

    if(functionName === "voteForProjectPayment") {
      contractState.methods.voteForProjectPayment(projectId6,str2bool(choice2)).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, voteForProjectPayment: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, voteForProjectPayment: "False" }));
      })
    }

    if(functionName === "delegateVoteTo") {
      contractState.methods.delegateVoteTo(memberAddress,projectId7).send({from: account, gas:4700000})
      .then(result => {
        setResults(results => ({ ...results, delegateVoteTo: "True" }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, delegateVoteTo: "False" }));
      })
    }

    if(functionName === "withdrawProjectPayment") {
      contractState.methods.withdrawProjectPayment(parseInt(projectId99)).send({from: account, gas: 5000000})
      .then(result => {
        setResults(results => ({ ...results, withdrawProjectPayment: 'True' }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, withdrawProjectPayment: 'False' }));
      })
    }

    if(functionName === "getEtherReceivedByProject") {
      contractState.methods.getEtherReceivedByProject(projectId98).call().then(function(result) {
        setResults(results => ({ ...results, getEtherReceivedByProject: result }));
      });
    }

    if(functionName === "reserveProjectGrant") {
      contractState.methods.reserveProjectGrant(parseInt(projectId97)).send({from: account, gas: 5000000})
      .then(result => {
        setResults(results => ({ ...results, reserveProjectGrant: 'True' }));
      })
      .catch(err => {
        console.error(err);
        setResults(results => ({ ...results, reserveProjectGrant: 'False' }));
      })
    }
    
  }

  return (
    <div className="App">
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("totalSupply")}>Get Total Supply</Button>
        {results?.totalSupply && <span>Total Supply: <span className="bold">{results?.totalSupply}</span></span>}
      </div>
      <br/>
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
      <br/>
      <div className="function-container">
        <Button onClick={async () => await handleFunctionCall("faucet")}>Faucet</Button>
        {results?.faucet && <span>Faucet: <span className="bold">{results?.faucet}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={donateEtherAmount}
            onChange={(e) => setDonateEtherAmount(e.target.value)}
            placeholder="Ether Amount In Wei"
        />
        <Button onClick={() => handleFunctionCall("donateEther")}>Donate Ether</Button>
        {results?.donateEtherAmount && <span>Donated: <span className="bold">{results?.donateEtherAmount}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={donateMyGovTokenAmount}
            onChange={(e) => setDonateMyGovTokenAmount(e.target.value)}
            placeholder="Token Amount"
        />
        <Button onClick={() => handleFunctionCall("donateMyGovToken")}>Donate MyGov Token</Button>
        {results?.donateMyGovTokenAmount && <span>Donated: <span className="bold">{results?.donateMyGovTokenAmount}</span></span>}
      </div>
      <br/>
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
      <br/>
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
      <br/>
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
      <br/>
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
      <br/>
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("getNoOfSurveys")}>Get Number Of Surveys</Button>
        {results?.getNoOfSurveys && <span>Number Of Surveys: <span className="bold">{results?.getNoOfSurveys}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={surveyId}
            onChange={(e) => setSurveyId(e.target.value)}
            placeholder="Survey Id"
        />
        <Button onClick={() => handleFunctionCall("getSurveyInfo")}>Get Survey Info</Button>
        {results?.getSurveyInfo && <span>
          IPFS Hash: <span className="bold">{results?.getSurveyInfo['ipfshash']}</span>
          <br></br>Survey Deadline: <span className="bold">{results?.getSurveyInfo['surveydeadline']}</span>
          <br></br>Number Of Choices: <span className="bold">{results?.getSurveyInfo['numchoices']}</span>
          <br></br>At Most Choices: <span className="bold">{results?.getSurveyInfo['atmostchoice']}</span>
        </span>}
      </div>
      <br/>
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
      <br/>
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
      <br/>
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
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={surveyId3}
            onChange={(e) => setSurveyId3(e.target.value)}
            placeholder="Survey Id"
        />
        <Button onClick={() => handleFunctionCall("getSurveyResults")}>Get Survey Results</Button>
        {results?.getSurveyResults && <span>
          Number of taken survey: <span className="bold">{results?.getSurveyResults['numtaken']}</span> 
          <br></br> Results: <span className="bold">{(results?.getSurveyResults['results']).toString()}</span>
          </span>}
      </div>
      <br/>
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("getNoOfFundedProjects")}>Get Number Of Funded Projects</Button>
        {results?.getNoOfFundedProjects && <span>Number Of Funded Projects: <span className="bold">{results?.getNoOfFundedProjects}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <Button onClick={() => handleFunctionCall("getNoOfProjectProposals")}>Get Number Of Project Proposals</Button>
        {results?.getNoOfProjectProposals && <span>Number Of Project Proposals: <span className="bold">{results?.getNoOfProjectProposals}</span></span>}
      </div>
      <br/>
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
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={projectId2}
            onChange={(e) => setProjectId2(e.target.value)}
            placeholder="Project Id"
        />
        <Button onClick={() => handleFunctionCall("getProjectNextPaySchedule")}>Get Project Next Pay Schedule</Button>
        {results?.getProjectNextPaySchedule && <span>Project Next Schedule: <span className="bold">{results?.getProjectNextPaySchedule}</span></span>}
      </div>
      <div className="function-container">
        <input
            type="text"
            value={projectId3}
            onChange={(e) => setProjectId3(e.target.value)}
            placeholder="Project Id"
        />
        <Button onClick={() => handleFunctionCall("getProjectInfo")}>Get Project Info</Button>
        {results?.getProjectInfo && <span>
          IPFS Hash: <span className="bold">{results?.getProjectInfo['ipfshash']}</span>
          <br></br>Vote Deadline For Proposal: <span className="bold">{results?.getProjectInfo['votedeadline']}</span>
          <br></br>Payment Amounts: <span className="bold">{results?.getProjectInfo['paymentamounts'].toString()}</span>
          <br></br>Payment Schedule: <span className="bold">{results?.getProjectInfo['payschedule'].toString()}</span>
        </span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={projectId4}
            onChange={(e) => setProjectId4(e.target.value)}
            placeholder="Project Id"
        />
        <Button onClick={() => handleFunctionCall("getProjectOwner")}>Get Project Owner</Button>
        {results?.getProjectOwner && <span>Project Owner: <span className="bold">{results?.getProjectOwner}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={projectId98}
            onChange={(e) => setProjectId98(e.target.value)}
            placeholder="Project Id"
        />
        <Button onClick={() => handleFunctionCall("getEtherReceivedByProject")}>Get Ether Received By Project</Button>
        {results?.getEtherReceivedByProject && <span>Received Ether: <span className="bold">{results?.getEtherReceivedByProject}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={ipfshash2}
            onChange={(e) => setIpfshash2(e.target.value)}
            placeholder="Ipfshash"
        />
        <input
            type="text"
            value={voteDeadline}
            onChange={(e) => setVoteDeadline(e.target.value)}
            placeholder="Vote Deadline For Proposal"
        />
        <input
            type="text"
            value={paymentAmounts}
            onChange={(e) => setPaymentAmounts(e.target.value)}
            placeholder="Payment Amounts"
        />
        <input
            type="text"
            value={paySchedule}
            onChange={(e) => setPaySchedule(e.target.value)}
            placeholder="Pay Schedule"
        />
        <Button onClick={() => handleFunctionCall("submitProjectProposal")}>Submit Project Proposal</Button>
        {results?.submitProjectProposal && <span>Result: <span className="bold">{results?.submitProjectProposal}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={projectId5}
            onChange={(e) => setProjectId5(e.target.value)}
            placeholder="Project Id"
        />
        <input
            type="text"
            value={choice1}
            onChange={(e) => setChoice1(e.target.value)}
            placeholder="Choice (true/false)"
        />
        <Button onClick={() => handleFunctionCall("voteForProjectProposal")}>Vote For Project Proposal</Button>
        {results?.voteForProjectProposal && <span>Voted: <span className="bold">{results?.voteForProjectProposal}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={projectId6}
            onChange={(e) => setProjectId6(e.target.value)}
            placeholder="Project Id"
        />
        <input
            type="text"
            value={choice2}
            onChange={(e) => setChoice2(e.target.value)}
            placeholder="Choice (true/false)"
        />
        <Button onClick={() => handleFunctionCall("voteForProjectPayment")}>Vote For Project Payment</Button>
        {results?.voteForProjectPayment && <span>Voted: <span className="bold">{results?.voteForProjectPayment}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={projectId99}
            onChange={(e) => setProjectId99(e.target.value)}
            placeholder="Project Id"
        />
        <Button onClick={() => handleFunctionCall("withdrawProjectPayment")}>Withdraw Project Payment</Button>
        {results?.withdrawProjectPayment && <span>Withdrawed: <span className="bold">{results?.withdrawProjectPayment}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={projectId97}
            onChange={(e) => setProjectId97(e.target.value)}
            placeholder="Project Id"
        />
        <Button onClick={() => handleFunctionCall("reserveProjectGrant")}>Reserve Project Grant</Button>
        {results?.reserveProjectGrant && <span>Reserved: <span className="bold">{results?.reserveProjectGrant}</span></span>}
      </div>
      <br/>
      <div className="function-container">
        <input
            type="text"
            value={memberAddress}
            onChange={(e) => setMemberAddress(e.target.value)}
            placeholder="Member Address to Delegate"
        />
        <input
            type="text"
            value={projectId7}
            onChange={(e) => setProjectId7(e.target.value)}
            placeholder="Project Id"
        />
        <Button onClick={() => handleFunctionCall("delegateVoteTo")}>Delegate Vote</Button>
        {results?.delegateVoteTo && <span>Delegated: <span className="bold">{results?.delegateVoteTo}</span></span>}
      </div>

    </div>
  );
}

export default App;
