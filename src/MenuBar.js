import React, { useState } from 'react';
import './MenuBar.css';  // Import external CSS file
import { Link } from 'react-router-dom';
import './css/quiz.css';
import { db, auth } from './Firebase.js';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";


function ShowQuiz({ show, onExit }) {
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [rgb, setRgb] = useState("");
  const [cooling, setCooling] = useState("");
  const [refuse, setRefuse] = useState("");
  if (show === false) return null;

  //this function will take the survey results and give them a preset build based on their needs
  //budget is the main divisor
  //they cannot submit without answering all questions
  const handleSubmit = async () => {
    if (budget === "" || purpose === "" || rgb === "" || cooling === "") {
      setRefuse("Please answer all questions");
      return;
    }
    setRefuse("");

    const auth = getAuth();
    const user = auth.currentUser;
    const userDocRef = doc(db, "users", user.uid);
    let updateData = {};

    if (budget === "$500-$700") {

      if (purpose === "gaming") {
        updateData.cpu = "B09VCHR1VH";
        updateData.gpu = "B09HHLX543"
      } else {
        updateData.cpu = "B09NMPD8V2";
        updateData.gpu = "B0C7BV8RJR";
      }

      updateData.motherboard = "B089D1YG11";
      updateData.storage = "B0B25NXWC7";
      updateData.power = "B014W3EMAO";

      if (rgb === "yes") {
        updateData.ram = "B07D1XCKWW";
        updateData.case = "B0D79GC358";
        if (cooling === "air") {
          updateData.cooler = "B09LHLS4V4";
        } else {
          updateData.cooler = "B0BLJHRVF5";
        }

      } else {
        updateData.ram = "B0143UM4TC";
        updateData.case = "B0D2MK6NML";
        if (cooling === "air") {
          updateData.cooler = "B09LHBFPJ6";
        } else {
          updateData.cooler = "B0BLS3372N";
        }

      }
    } else if (budget === "$800-$1200") {
      if (purpose === "gaming") {
        updateData.cpu = "B0BBJDS62N";
        updateData.gpu = "B0C7W8GZMJ";
        updateData.storage = "B0CRCC9863"
      } else {
        updateData.cpu = "B0BQ6CSY9C";
        updateData.gpu = "B0C7W8GZMJ";
        updateData.storage = "B0DBR6TRZQ";

      }
      updateData.motherboard = "B0CB6XZ7RH";
      updateData.power = "B0CQMSTN94";
      if (rgb === "yes") {
        updateData.ram = "B0BZHTVHN5";
        updateData.case = "B0DCJLJXKQ";
        if (cooling === "air") {
          updateData.cooler = "B0B7NVZFDM";
        } else {
          updateData.cooler = "B0BLJHRVF5";
        }
      } else {
        updateData.ram = "B0CTHXMYL8";
        updateData.case = "B0D2MK6NML";
        if (cooling === "air") {
          updateData.cooler = "B09LGY38L4";
        } else {
          updateData.cooler = "B0DF7DH5Z5";
        }
      }
    } else if (budget === "$1300-$1700") {
      if (purpose === "gaming") {
        updateData.cpu = "B0BBJDS62N";
        updateData.gpu = "B0BNWBJ8Z6";
        updateData.storage = "B08GLX7TNT";
        if (rgb === "yes") {
          updateData.ram = "B09PTGZM6Y";
          updateData.motherboard = "B0BHMW8R6S";
          updateData.case = "B08CSQPBFJ";
          if (cooling === "liquid") {
            updateData.cooler = "B0D6RPDG9G";
          } else {
            updateData.cooler = "B0DQFYBSD6";

          }
        } else {
          updateData.ram = "B0CCK7DWLT";
          updateData.motherboard = "B0BHBT5BD3";
          updateData.storage = "B08GLX7TNT";
          if (cooling === "liquid") {
            updateData.cooler = "B0DVNKR4L9";

          } else {
            updateData.cooler = "B0C5MBLHD2";

          }

        }
      } else {
        updateData.cpu = "B0CGJ41C9W";
        updateData.gpu = "B0BNWBJ8Z6";
        updateData.storage = "B08GLX7TNT";
        if (rgb === "yes") {
          updateData.ram = "B09PTGZM6Y";
          updateData.motherboard = "B0BHMW8R6S";
          updateData.case = "B08CSQPBFJ";
          if (cooling === "liquid") {
            updateData.cooler = "B0D6RPDG9G";
          } else {
            updateData.cooler = "B0DQFYBSD6";

          }
        } else {
          updateData.ram = "B0CCK7DWLT";
          updateData.motherboard = "B0BHBT5BD3";
          updateData.case = "B08Z4DPG8B";
          if (cooling === "liquid") {
            updateData.cooler = "B0DVNKR4L9";
          } else {
            updateData.cooler = "B0C5MBLHD2";
          }
        }

      }
      updateData.power = "B07B72D43N";

    } else if (budget === "$1800+") {
      if (purpose === "gaming") {
        updateData.cpu = "B0DVZSG8D5";
        updateData.gpu = "B0CS3TDV19";
        updateData.storage = "B0BHJJ9Y77";
        if (rgb === "yes") {
          updateData.ram = "B09Z1Z9H2Z";
          updateData.motherboard = "B0BDTN8SNJ";
          updateData.case = "B09SFFSC9D";
          updateData.cooler = "B0BQJ6QL7L";
        } else {
          updateData.ram = "B0C5M7J967";
          updateData.motherboard = "B0BDTN8SNJ";
          updateData.case = "B08146X79Y";
          updateData.cooler = "B098XP1Y38";
        }

      } else {
        updateData.cpu = "B0CGJDKLB8";
        updateData.gpu = "B0CS3TDV19";
        updateData.storage = "B0BHJJ9Y77";
        if (rgb === "yes") {
          updateData.ram = "B0C5M7J967";
          updateData.motherboard = "B0BQD69ZSF";
          updateData.case = "B07NQ6X3X";
          updateData.cooler = "B08C51JX3R";
        } else {
          updateData.ram = "B0C5M7J967";
          updateData.motherboard = "B0BQD69ZSF";
          updateData.case = "B07B2Y4N5N";
          updateData.cooler = "B07Y87YHRH";
        }
      }
      updateData.power = "B07WDQTTWH";
    }
    await updateDoc(userDocRef, updateData);
    onExit();
    window.location.reload();

  }

  return (
    <div className="quiz-overlay">
      <div className="quiz">
        <label>What is your budget?</label>
        <div className="radio">
          <label>
            <input type="radio" name="budget" value="$500-$700" checked={budget === "$500-$700"} onChange={(e) => setBudget(e.target.value)} />
            $500-$700
          </label>
          <label>
            <input type="radio" name="budget" value="$800-$1200" checked={budget === "$800-$1200"} onChange={(e) => setBudget(e.target.value)} />
            $800-$1200
          </label>
          <label>
            <input type="radio" name="budget" value="$1300-$1700" checked={budget === "$1300-$1700"} onChange={(e) => setBudget(e.target.value)} />
            $1300-$1700
          </label>
          <label>
            <input type="radio" name="budget" value="$1800+" checked={budget === "$1800+"} onChange={(e) => setBudget(e.target.value)} />
            $1800+
          </label>
        </div>
        <label>What will the PC be used for</label>
        <div className="radio">
          <label>
            <input type="radio" name="purpose" value="gaming" checked={purpose === "gaming"} onChange={(e) => setPurpose(e.target.value)} />
            Gaming
          </label>
          <label>
            <input type="radio" name="purpose" value="content" checked={purpose === "content"} onChange={(e) => setPurpose(e.target.value)} />
            Content Creation
          </label>
        </div>
        <label>Do you want RGB?</label>
        <div className="radio">
          <label>
            <input type="radio" name="rgb" value="yes" checked={rgb === "yes"} onChange={(e) => setRgb(e.target.value)} />
            Yes
          </label>
          <label>
            <input type="radio" name="rgb" value="no" checked={rgb === "no"} onChange={(e) => setRgb(e.target.value)} />
            No
          </label>
        </div>
        <label>Do you want liquid or air cooling?</label>
        <div className="radio">
          <label>
            <input type="radio" name="cooling" value="liquid" checked={cooling === "liquid"} onChange={(e) => setCooling(e.target.value)} />
            Liquid
          </label>
          <label>
            <input type="radio" name="cooling" value="air" checked={cooling === "air"} onChange={(e) => setCooling(e.target.value)} />
            Air
          </label>
        </div>
        {refuse && <p className="error">{refuse}</p>}
        <button onClick={handleSubmit}>Submit</button>

      </div>
    </div>
  )
}


const MenuBar = () => {
  const [quiz, setQuiz] = useState(false);
  return (
    <nav className="navbar">
      <h2 className="logo">PC Picker</h2>
      <div className="menu">

        <button className="button" onClick={() => setQuiz(true)}>Take Quiz</button>
        <ShowQuiz show={quiz} onExit={() => setQuiz(false)} />
        <Link to="/">Home</Link>

        <Link to="/">Login</Link>

        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div >
    </nav >
  );
};

export default MenuBar;