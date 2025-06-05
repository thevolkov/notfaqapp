import './ProjectListPage.css';
import {useEffect, useState, useRef} from 'react';
import {useAppSelector, useAppDispatch, type RootState} from '../../app/store';
import {useNavigate} from 'react-router-dom';
import {Input, Title, IconButton, AnimatedBlock} from '../../shared/ui';
import Lottie from 'lottie-react';
import {getProjectImageSrc} from '../../shared/lib/imageHelpers';
import {useDeepSearch} from '../../shared/lib/useDeepSearch';
import rabbit from '../../shared/assets/tgs/thinkingRabbit.json';
import CSBomb from '../../shared/ui/EasterEggs/CSBomb/CSBomb';
import Console from '../../features/Console/Console';
import {setShowBomb, setShowGtaStars} from '../../entities/console/consoleSlice';
import {GtaStars} from '../../shared/ui/EasterEggs/GtaStars/GtaStars';
import {useSelector} from 'react-redux';
import ProjectCard from './ProjectCard';
import travolta from '../../shared/assets/travolta.webm';
import travoltaHVC from '../../shared/assets/travolta-hvc.mp4';

export default function ProjectListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const projects = useAppSelector((state) => state.projects.projects);
  const showBomb = useAppSelector((state) => state.console.showBomb);
  const showVouchers = useAppSelector((state) => state.console.vouchers);
  const showGtaStars = useAppSelector((state) => state.console.showGtaStars);
  const inputRef = useRef<HTMLInputElement>(null);

  const titleText = showVouchers ? 'voucher???' : 'not faq';
  const subtitleText = showVouchers
    ? 'voucher voucher voucher voucher'
    : "there's nothing here ¯\\_(ツ)_/¯";
  const shadowLabel = showVouchers ? 'voucher' : '[n:fə]';
  const inputPlaceholder = showVouchers ? 'voucher voucher voucher' : 'search...';
  const followText = showVouchers ? 'Follow the voucher...' : 'Follow the White Rabbit... -console';
  const rabbitTooltip = showVouchers ? 'voucher voucher voucher' : 'click click click';

  const [searchValue, setSearchValue] = useState('');
  const [loopRabbit, setLoopRabbit] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const results = useDeepSearch(projects, searchValue);

  const handleSearch = (value: string) => {
    if (clickCount === 3) return;
    setSearchValue(value);
  };

  const filteredProjects = (() => {
    if (clickCount === 3) return projects;
    const trimmedSearch = searchValue.trim().toLowerCase();
    if (!trimmedSearch || trimmedSearch.startsWith('-')) return projects;
    return projects.filter(project =>
      project.title.toLowerCase().includes(trimmedSearch)
    );
  })();


  useEffect(() => {
    if (searchValue.toLowerCase() === '-console' && !showConsole) {
      setShowConsole(true);
      setSearchValue('');
    }
  }, [searchValue, showConsole]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Backquote') {
        event.preventDefault();
        event.stopPropagation();
        setShowConsole(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  useEffect(() => {
    return () => {
      if (showBomb) {
        dispatch(setShowBomb(false));
      }
      if (showGtaStars) {
        dispatch(setShowGtaStars(false));
      }
    };
  }, [showBomb, showGtaStars]);

  useEffect(() => {
    if (showVouchers) setLoopRabbit(true);
  }, [showVouchers])

  useEffect(() => {
    if (clickCount === 3) {
      let index = 0;
      let currentText = '';

      inputRef.current?.focus();
      setSearchValue('');

      const typeInterval = setInterval(() => {
        setLoopRabbit(true);
        if (index < followText.length) {
          currentText += followText.charAt(index);
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

  return (
    <>
      <div className="project-list-page d-flex flex-column">
        <Title
          text={titleText}
          subtitle={subtitleText}
          size="2xl"
          shadow
          shadowText={shadowLabel}
          className="project-list-page-title"
        />
        <div className="relative element-wrapper">
          <Lottie
            className="absolute tooltip"
            data-tooltip={rabbitTooltip}
            style={{
              maxWidth: '2rem',
              right: '2rem',
              top: '-2rem',
            }}
            animationData={rabbit}
            autoplay={loopRabbit}
            loop={loopRabbit}
            onMouseEnter={() => {
              if (showVouchers) return
              setLoopRabbit(true)
            }}
            onMouseLeave={() => {
              if (showVouchers) return
              setLoopRabbit(false)
            }}
            onClick={() => setClickCount((prev) => (prev >= 3 ? 0 : prev + 1))}
          />
          {
            showVouchers && (
              <video
                className="travolta absolute"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={travoltaHVC} type='video/mp4;codecs=hvc1' />
                <source src={travolta} type="video/webm" />
              </video>
            )
          }
          <Input
            ref={inputRef}
            value={searchValue}
            iconId="search"
            placeholder={inputPlaceholder}
            onChange={handleSearch}
          />
        </div>
        <div className="project-list-page-grid d-flex flex-wrap">
          {
            filteredProjects.length > 0 ? (
              filteredProjects.map((project) =>
                <ProjectCard key={project.id} project={project} />
              )
            ) : (
              <Title text="Not found (ʘ‿ʘ)" size="s" />
            )
          }
          {
            !searchValue && currentUser?.role === 'godmode' && (
              <div
                className="project-list-page-card d-flex flex-column relative pointer"
                onClick={() => navigate('/project/create')}
              >
                <img
                  loading="lazy"
                  className="b-radius faded-image"
                  src={getProjectImageSrc('')}
                  alt="add project"
                />
                <Title text="+ Add new" size="s" />
              </div>
            )
          }
        </div>
        {
          clickCount !== 3 && searchValue && (
            <div className="d-flex flex-column">
              <Title
                text="Deep Search"
                size="l"
              />
              <ul>
                {
                  results.map(({item, highlights}) => (
                    <li key={item.id}>
                      <div>
                        {
                          Object.entries(highlights).map(([path, parts]) => (
                            <div key={path}>
                              <strong>{path}</strong>:
                              {
                                parts.map((part, i) => (
                                  <span key={i} className={part.match ? 'bg-warn' : ''}>
                                {part.text}
                              </span>
                                ))
                              }
                            </div>
                          ))
                        }
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
        {
          showBomb && (
            <CSBomb
              active={showBomb}
              onEnd={() => dispatch(setShowBomb(false))}
            />
          )
        }
      {
        showGtaStars && (
          <GtaStars active={showGtaStars} />
        )
      }
      <AnimatedBlock
        visible={showConsole}
        direction="bottom"
      >
        <Console showConsole={showConsole} />
        <IconButton
          className="console-close matrix absolute"
          variant="base"
          onClick={() => setShowConsole(false)}
          text="[X]"
        />
      </AnimatedBlock>
    </>
  );
}
