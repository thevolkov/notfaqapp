import './ProjectListPage.css';
import {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {type RootState} from '../../app/store';
import {Input, Title, IconButton, AnimatedBlock} from '../../shared/ui';
import Lottie from 'lottie-react';
import ReactConfetti from 'react-confetti';
import Bomb from '../../shared/assets/imgs/cs-bomb.webp';
import rabbit from '../../shared/assets/tgs/thinkingRabbit.json';
import {getProjectImageSrc} from '../../shared/lib/imageHelpers';

const createAudio = (src: string, volume = 0.5): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.volume = volume;
  return audio;
};

export default function ProjectListPage() {
  const navigate = useNavigate();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLInputElement>(null);
  const consoleOutputRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [consoleValue, setConsoleValue] = useState('');
  const [loopRabbit, setLoopRabbit] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBomb, setShowBomb] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState([
    "[INFO] System boot sequence initiated...",
    "[LOAD] Core matrix online: 42% efficiency",
    "[DEBUG] EasterEggEngine v3.14 loaded successfully",
    "[SYS] Quantum flux capacitor charging... 88 MPH required",
    "[INIT] Hidden protocol 'BluePill' activated",
    "[LOG] User detected: Agent Smith has entered the Matrix",
    "[WARN] Low coffee levels detected in sector 0xCAFEBABE",
    "[INFO] Deploying meme generator... 'Distracted Boyfriend' template loaded",
    "[SYS] Neural net dreaming of electric sheep",
    "[EASTEREGG] Konami Code module primed: ↑↑↓↓←→←→BA",
    "[HACK] Attempting to bypass Skynet firewall... 127.0.0.1 pwned",
    "[LOAD] Retro game emulator online: 'Pong' ready",
    "[INFO] Rickroll probability increased to 99.9%",
    "[DEBUG] Secret command 'sudo rm -rf /fun' intercepted and blocked",
    "[SYS] Over 9000 processes running in the background",
    "[EASTEREGG] Hidden level unlocked: 'Area 51' raid simulator",
    "[LOG] Deploying ASCII art renderer... Shrek incoming",
    "[WARN] System overheating due to excessive meme compilation",
    "[INFO] Portal gun detected in inventory. Cake is a lie.",
    "[SYS] Initiating self-destruct sequence... JK, just kidding! :D"
  ]);

  const handleSearch = (value: string) => setSearchValue(value);
  const handleConsole = (value: string) => setConsoleValue(value);
  const handleConsoleEnter = () => {
    consoleRef.current?.focus();

    if (consoleValue.trim() === '') return;

    setConsoleOutput(prev => [...prev, `> ${consoleValue}`]);

    setConsoleValue('');
  };


  // const filteredProjects = projects.
  // filter((project) => project.title.toLowerCase().includes(searchValue.trim().toLowerCase()));

  const filteredProjects = clickCount === 3
    ? projects
    : projects.filter((project) =>
      project.title.toLowerCase().includes(searchValue.trim().toLowerCase())
    );

  useEffect(() => {
    if (searchValue.toLowerCase() === '-console' && !showConsole) {
      setShowConsole(true);
      setSearchValue('');
    }
  }, [searchValue, showConsole]);

  useEffect(() => {
    if (showConsole) {
      setTimeout(() => {
        consoleRef.current?.focus();
      }, 150);
    } else {
      setConsoleValue('');
    }
  }, [showConsole]);

  useEffect(() => {
    if (!showConfetti && consoleValue.toLowerCase() === 'probably nothing') {
      setShowConfetti(true);
      setLoopRabbit(true);

      const stopRun = setTimeout(() => {
        setShowConfetti(false);
        setLoopRabbit(false);
      }, 8500);

      return () => clearTimeout(stopRun);
    }

    if (!showBomb && consoleValue.toLowerCase() === 'sv_cheats 1') {
      setShowBomb(true);

      const audio1 = createAudio(`${import.meta.env.BASE_URL}/sounds/c4_plant.mp3`);
      const audio2 = createAudio(`${import.meta.env.BASE_URL}/sounds/bombpl.mp3`);
      const audio3 = createAudio(`${import.meta.env.BASE_URL}/sounds/c4_beep1.mp3`);
      const audio4 = createAudio(`${import.meta.env.BASE_URL}/sounds/c4_disarm.mp3`);
      const audio5 = createAudio(`${import.meta.env.BASE_URL}/sounds/bombdef.mp3`);

      audio1.play();
      audio2.play();

      audio1.addEventListener('ended', () => {
        const beepInterval = 900;
        const beepDuration = 10000;
        const totalBeeps = Math.floor(beepDuration / beepInterval);

        let count = 0;

        const interval = setInterval(() => {
          if (count >= totalBeeps) {
            clearInterval(interval);

            audio4.play();
            audio5.play();
            setShowBomb(false);
            return;
          }

          const beep = audio3.cloneNode() as HTMLAudioElement;
          beep.volume = 0.5;
          beep.play();

          count++;
        }, beepInterval);
      });
    }
  }, [consoleValue]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Backquote') {
        setShowConsole(prev => {
          const next = !prev;
          if (!next) {
            consoleRef.current?.blur();
            setConsoleValue('');
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const content = document.querySelector('.content');

    if (consoleOutput[consoleOutput.length - 1].slice(2).toLowerCase() === 'whereismyvoucher') {

      content?.classList.remove('no-scroll');
      navigate('/project/666');
    }

  }, [consoleOutput])

  useEffect(() => {
    if (clickCount === 3) {

      const phrase = 'Follow the White Rabbit...';
      let index = 0;
      let currentText = '';

      inputRef.current?.focus();
      setSearchValue('');

      const typeInterval = setInterval(() => {
        setLoopRabbit(true);

        if (index < phrase.length) {
          currentText += phrase.charAt(index);
          setSearchValue(currentText);
          index++;
        } else {
          clearInterval(typeInterval);

          setTimeout(() => {
            inputRef.current?.select();

            setTimeout(() => {
              setSearchValue('');
              inputRef.current?.blur();
              setClickCount(0);
              setLoopRabbit(false);
            }, 650);
          }, 2000);
        }
      }, 150);
    }
  }, [clickCount]);

  useEffect(() => {
    const content = document.querySelector('.content');
    if (!content) return;

    if (showConsole) {
      content.classList.add('no-scroll');
    } else {
      content.classList.remove('no-scroll');
    }
  }, [showConsole]);

  useEffect(() => {
    if (!showConsole) return;

    const timeout = setTimeout(() => {
      const element = consoleOutputRef.current;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [showConsole, consoleOutput]);

  return (
    <>
      {
        showConfetti && (
          <ReactConfetti
            recycle={false}
            numberOfPieces={1000}
          />
        )
      }
      <div className="project-list">
        <div className="project-list-header d-flex align-c">
          <Title
            text="not faq"
            subtitle="there's nothing here ¯\_(ツ)_/¯"
            size="2xl"
            shadow
            shadowText="[n:fə]"
          />
          <IconButton
            text="ADD"
            iconId="plus-lg"
            variant="success"
            onClick={() => navigate("/project/create")}
          />
        </div>
        <div className="project-search relative element-wrapper">
          <Lottie
            className="absolute"
            style={{
              maxWidth: '2rem',
              right: '2rem',
              top: '-2rem',
            }}
            animationData={rabbit}
            autoplay={loopRabbit}
            loop={loopRabbit}
            onMouseEnter={() => setLoopRabbit(true)}
            onMouseLeave={() => setLoopRabbit(false)}
            onClick={() =>
              setClickCount((prev) => (prev >= 3 ? 0 : prev + 1))
            }
          />
          <Input
            ref={inputRef}
            value={searchValue}
            iconId="search"
            placeholder="search..."
            onChange={handleSearch}
          />
        </div>
        <div className="project-list-grid">
          {
            filteredProjects.length > 0 ? (
              filteredProjects.map((project) =>
                project.id === '666' ? null : (
                  <div
                    className="project-list-card"
                    onClick={() => navigate(`/project/${project.id}`)}
                    key={project.id}
                  >
                    <img
                      className={`b-radius ${!project.image ? 'faded-image' : ''}`}
                      src={getProjectImageSrc(project.image)}
                      alt={project.title || 'no_image'}
                    />
                    <Title text={project.title} size="s" />
                  </div>
                ))
            ) : (
              <Title
                text="Nothing found (ʘ‿ʘ)"
                size="s"
              />
            )
          }
        </div>
      </div>
      {
        showBomb && (
          <div className="cs-bomb">
            <img src={Bomb} alt="BOOM!" />
          </div>
        )
      }
      <AnimatedBlock
        className="console shadow matrix-input"
        visible={showConsole}
        direction="bottom"
      >
        <div className="console-output" ref={consoleOutputRef}>
          {
            consoleOutput.map((output, index) => (
              <div className="console-log" key={index}>
                {output}
              </div>
            ))
          }
        </div>
        <Input
          ref={consoleRef}
          iconId="chevron-right"
          onChange={handleConsole}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleConsoleEnter();
            }
          }}
          value={consoleValue}
          colon
        />
        <IconButton
          className="absolute console-close"
          variant="base"
          onClick={() => {
            setShowConsole(false)
            consoleRef.current?.blur()
          }}
          text="[X]"
        />
      </AnimatedBlock>
    </>
  );
}
