import './ProjectListPage.css';
import {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {type RootState} from '../../app/store';
import {Input, Title, IconButton, AnimatedBlock} from '../../shared/ui';
import Lottie from 'lottie-react';
import ReactConfetti from 'react-confetti';
import Bomb from '../../shared/assets/imgs/cs-bomb.webp';
// import Noob from '../../shared/assets/imgs/noob.gif';
import rabbit from '../../shared/assets/tgs/thinkingRabbit.json';

const createAudio = (src: string, volume = 0.5): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.volume = volume;
  return audio;
};

export default function ProjectListPage() {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLInputElement>(null);
  const consoleOutputRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [consoleValue, setConsoleValue] = useState('');
  const [loopRabbit, setLoopRabbit] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBomb, setShowBomb] = useState(false);
  // const [showNoob, setShowNoob] = useState(false);
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
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSearch = (value: string) => setSearchValue(value);
  const handleConsole = (value: string) => setConsoleValue(value);
  const handleConsoleEnter = () => {
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

    // if (!showNoob && !showBomb && consoleValue.toLowerCase() === 'noob') {
    //   setShowNoob(true)
    //
    //   const audio1 = createAudio('/sounds/noob-saibot.mp3');
    //   const audio2 = createAudio('/sounds/shaos-laughter.mp3');
    //
    //   audio1.play()
    //
    //   setTimeout(() => {
    //     audio1.pause();
    //     audio1.currentTime = 0;
    //
    //     audio2.play();
    //   }, 1750);
    // }
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
    const content = document.querySelector('#root');
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
      const el = consoleOutputRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
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
      <div className="projects-list">
        <div className="projects-header">
          <Title
            text="not faq"
            subtitle="there's nothing here ¯\_(ツ)_/¯"
            size="4xl"
            shadow
            shadowText="[n:fə]"
          />
          <NavLink to="/project/create">
            <IconButton
              // text="[n:fə]"
              className="b-radius blur-bg"
              iconId="plus-lg"
              variant="dark-alpha"
            />
          </NavLink>
        </div>
        <div className="project-search dark-bg-wrapper">
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
          {/*<Lottie*/}
          {/*  className="absolute"*/}
          {/*  style={{*/}
          {/*    maxWidth: '2rem',*/}
          {/*    left: '.9rem',*/}
          {/*    top: '-7.7rem',*/}
          {/*  }}*/}
          {/*  animationData={pepe}*/}
          {/*  loop={false}*/}
          {/*/>*/}
          <Input
            ref={inputRef}
            value={searchValue}
            iconId="search"
            placeholder="search..."
            onChange={handleSearch}
          />
        </div>
        <div className="projects-grid">
          {
            filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Link
                  className="project-card"
                  to={`/project/${project.id}`}
                  key={project.id}
                >
                  <img
                    className="b-radius"
                    src={
                      project.image
                        ? project.image.startsWith('data:image')
                          ? project.image
                          : `${import.meta.env.BASE_URL}${project.image}`
                        : `${import.meta.env.BASE_URL}imgs/no_image.png`
                    }
                    style={!project.image ? {opacity: 0.025} : undefined}
                  />
                  <Title text={project.title} size="l" />
                </Link>
              ))
            ) : (
              <div>Nothing found :(</div>
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
      {/*{*/}
      {/*  // showNoob && (*/}
      {/*  <div className={`noob-saibot ${showNoob && 'launch'}`}>*/}
      {/*    <img src={Noob} alt="NOOB!" />*/}
      {/*  </div>*/}
      {/*  // )*/}
      {/*}*/}
      <AnimatedBlock
        className="console shadow matrix-input"
        visible={showConsole}
        direction="bottom"
        // preserveMount={false}
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
          className="matrix-input"
          iconId="code-slash"
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
          className="console-close"
          // variant="success"
          onClick={() => {
            setShowConsole(false)
            consoleRef.current?.blur()
          }}
          iconId="x-lg"
        />
      </AnimatedBlock>
    </>
  );
}

