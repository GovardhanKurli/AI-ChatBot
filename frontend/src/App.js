import React, { useRef, useState } from "react";
import { Send } from "react-feather";

import robotIcon from "./robot.png";
import logo from "./lgg.png"



import styles from "./App.module.css";

function App() {
  const lastMsg = useRef();

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi there! I'm you AI assistant, I'm here to help you out with your questions. Ask me anything you want.",
    },
  ]);
  const [processing, setProcessing] = useState(false);

  const handleSubmission = async () => {
    if (!messageText.trim() || processing) return;

    const tempMessages = [
      ...messages,
      {
        from: "human",
        text: messageText,
      },
    ];
    setMessages(tempMessages);
    setMessageText("");

    setTimeout(() =>
      lastMsg.current.scrollIntoView({
        behavior: "smooth",
      })
    );
    try {
      setProcessing(true);
      const res = await fetch(`http://localhost:5000/chat`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          messages: tempMessages.slice(-6),
        }),
      });
      setProcessing(false);

      const data = await res.json();
      console.log(data); 
      const ans = data.data;

      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: ans,
        },
      ]);
    } catch (err) {
      const error = "Error processing this message, please try in sometime.";
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: error,
        },
      ]);
    }

    setTimeout(() =>
      lastMsg.current.scrollIntoView({
        behavior: "smooth",
      })
    );
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.image}>
            <img  className={styles.image}src={logo} alt="AI" />
            {/* <img src='https://in.images.search.yahoo.com/images/view;_ylt=AwrPpQzRbFVnauAlfE29HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzdmZDM1MzNmZmJiMzBiMjM4ZjQyMjM0OTA4MTMzNWI5BGdwb3MDMTUEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dai%2Banimetion%2Bimages%26type%3DE210IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D15&w=1920&h=1080&imgurl=dm0qx8t0i9gc9.cloudfront.net%2Fthumbnails%2Fvideo%2FYWAdzU2%2Fvideoblocks-artificial-intelligence-104-a-3d-animated-head-rotates-loop_sfukzfikw_thumbnail-1080_01.png&rurl=https%3A%2F%2Fwww.storyblocks.com%2Fvideo%2Fstock%2Fartificial-intelligence-104-a-3d-animated-head-rotates-loop-stjlfyojdkcmb2c5i&size=1354KB&p=ai+animetion+images&oid=7fd3533ffbb30b238f422349081335b9&fr2=piv-web&fr=mcafee&tt=Artificial+Intelligence+104%3A+3d+Animated+Stock+Motion+Graphics+SBV+...&b=0&ni=21&no=15&ts=&tab=organic&sigr=Mtp_EZL20XrE&sigb=8nIlWvyxy9zf&sigi=MF4HaENe5dMd&sigt=2K4uKf95cXuK&.crumb=mcJT6Hhp9wq&fr=mcafee&fr2=piv-web&type=E210IN826G0' alt="AI" /> */}
          </div>
          <p>AI Assistant</p>
        </div>
      </div>

      <div className={styles.body}>
        {messages.map((msg, index) => (
          <div
            className={`${styles.message} ${
              msg.from === "ai" ? styles.mLeft : styles.mRight
            }`}
            key={index}
          >
            {msg.from == "ai" ? (
              <div>
                <div className={styles.image}>
                <img  className={styles.image}src={logo} alt="AI" />
                </div>


                
              </div>
            ) : (
              ""
            )}
            <p className={styles.text}>{msg.text}</p>
          </div>
        ))}

        {processing ? (
          <div className={styles.typing}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        ) : (
          ""
        )}

        <div ref={lastMsg} />
      </div>

      <div className={styles.footer}>
        <input
          placeholder="Type here..."
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          onKeyUp={(event) => (event.key === "Enter" ? handleSubmission() : "")}
        />

        <div className={styles.btn} onClick={handleSubmission}>
          <div className={styles.icon}>
            <Send />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
