import React, { useState, useRef, useEffect } from "react";
import {
  Braces,
  Terminal,
  Palette,
  Layout,
  FileText,
  Music,
  Globe,
  LogOut
} from "lucide-react";

import AuthPage from './components/AuthPage';
import { observeAuthState, logOut } from './firebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [typedText, setTypedText] = useState("");
  const [activeTab, setActiveTab] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const unsubscribe = observeAuthState(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (comment) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(comment.slice(0, i + 1));
        i++;
        if (i === comment.length) clearInterval(interval);
      }, 30);

      return () => clearInterval(interval);
    } else {
      setTypedText("");
    }
  }, [comment]);

  const playMusic = () => {
    audioRef.current = new Audio(process.env.PUBLIC_URL + "/music.mp3");
    audioRef.current.play();
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const tabs = [
    { label: "JS",      icon: <Braces size={24} />,   comment: "#здесь вы можете ознакомиться с примерами вёрстки и JSX#",  url: "https://react.dev/" },
    { label: "Python",  icon: <Terminal size={24} />, comment: "#здесь вы можете попрактиковаться в решении задач на питон#", url: "https://pythonexamples.org/python-exercises/", withMusic: true },
    { label: "CSS",     icon: <Palette size={24} />,  comment: "#обалдеть какая красота#", url: "https://uiverse.io/" },
    { label: "HTML",    icon: <Layout size={24} />,   comment: "#частные случаи синтаксиса, интересные шаблоны#", url: "https://html5up.net/" },
    { label: "Резюме",  icon: <FileText size={24} />, comment: "#здесь можно ознакомиться с примерами работ#", url: null },
    // 🔥 новые вкладки:
    { label: "Музыка",  icon: <Music size={24} />,    comment: "#relax & listen#", url: "https://soundcloud.com/" },
    { label: "AI Fun",  icon: <Globe size={24} />,    comment: "#искусственный интеллект — генераторы, игры #", url: "https://openai.com/" }
  ];

  if (!user) return <AuthPage />;

  return (
    <div className="wrapper">
      <button className="logout-btn" onClick={logOut}>
        <LogOut size={18} /> Logout
      </button>

      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`tab ${activeTab === tab.label ? "active" : ""}`}
            onMouseEnter={() => {
              setComment(tab.comment);
              if (tab.withMusic) playMusic();
            }}
            onMouseLeave={() => {
              setComment("");
              if (tab.withMusic) stopMusic();
            }}
            onClick={() => {
              setActiveTab(tab.label);
              if (tab.url) window.open(tab.url);
            }}
          >
            {tab.icon}&nbsp;{tab.label}
          </div>
        ))}
      </div>

      {typedText && <div className="comment">{typedText}</div>}
    </div>
  );
};

export default App;