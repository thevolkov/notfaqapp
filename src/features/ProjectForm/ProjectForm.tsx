import './ProjectForm.css';
import {
  useState, useEffect, useRef, useMemo, useCallback, type FormEvent
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProject,
  updateProject,
  deleteProject,
  type Project,
  type FAQ,
  type Links
} from '../../entities/project/projectSlice';
import {type RootState} from '../../app/store';
import {useNavigate, useParams} from 'react-router-dom';
import {useBackButton} from '../../shared/lib';
import FileInput from '../../shared/ui/FileInput/FileInput';
import Title from '../../shared/ui/Title/Title';
import IconButton from '../../shared/ui/IconButton/IconButton';
import Input from '../../shared/ui/Input/Input';
import Textarea from '../../shared/ui/Textarea/Textarea';
import {linksAlias} from '../../shared/constants';
import {AnimatedBlock} from '../../shared/ui';
import {v4 as uuidv4} from 'uuid';

export default function ProjectForm() {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const {handleBack} = useBackButton();
  const formRef = useRef<HTMLFormElement | null>(null);

  const initialProjectRef = useRef<Project | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFormConfirm, setShowFormConfirm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [published, setPublished] = useState(false);
  const [links, setLinks] = useState<Links>({
    telegram: '', community: '', x: '', web: '', support: ''
  });
  const [faq, setFaq] = useState<FAQ[]>([]);

  const togglePublished = () => setPublished(prev => !prev);

  const handleDelete = () => {
    if (!id) return;
    dispatch(deleteProject(id));
    navigate('/');
  };

  useEffect(() => {
    if (!id) return;

    const project = projects.find(p => p.id === id);
    if (project) {
      initialProjectRef.current = project;
      setTitle(project.title);
      setImage(project.image);
      setDesc(project.desc);
      setPublished(project.published);
      setLinks(project.links);
      setFaq(project.faq.length ? project.faq : [{id: '', published: false, question: '', answer: ''}]);
    }
  }, [id, projects]);

  const updateLink = useCallback((key: string, value: string) => {
    setLinks(prev => ({...prev, [key]: value}));
  }, []);

  const addFaq = () => {
    setFaq(prev => [...prev, {id: uuidv4(), published: false, question: '', answer: ''}]);
    requestAnimationFrame(() => {
      document.querySelector('.content')?.scrollTo({top: 99999, behavior: 'smooth'});
    });
  };

  const updateFaq = useCallback((index: number, field: 'question' | 'answer', value: string) => {
    setFaq(prev => prev.map((item, i) => i === index ? {...item, [field]: value} : item));
  }, []);

  const removeFaq = useCallback((index: number) => {
    setFaq(prev => prev.filter((_, i) => i !== index));
  }, []);

  const publishFaq = useCallback((index: number) => {
    setFaq(prev => prev.map((item, i) => i === index ? {...item, published: !item.published} : item));
  }, []);

  const currentProject: Project = useMemo(() => ({
    id: id || uuidv4(),
    title,
    image,
    desc,
    published,
    links,
    faq: faq.filter(f => f.question.trim() && f.answer.trim()),
  }), [id, title, image, desc, published, links, faq]);

  const isFormValid = useMemo(() => {
    if (!title.trim() && !desc.trim() && !image.trim()) return false;
    if (!id) return true;
    return JSON.stringify(currentProject) !== JSON.stringify(initialProjectRef.current);
  }, [id, title, desc, image, currentProject]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (id) {
      dispatch(updateProject(currentProject));
    } else {
      dispatch(addProject(currentProject));
    }

    handleBack();
  };

  return (
    <div className="project-form d-flex flex-column">
      <IconButton
        variant="alpha"
        iconId="arrow-90deg-left"
        text="Back"
        onClick={handleBack}
      />
      <Title text={id ? `Edit ${title}` : '+[n:fə]'} size="2xl" shadow shadowText={title} />
      <form ref={formRef} onSubmit={handleSubmit}>
        <AnimatedBlock
          hideWithoutUnmount={true}
          visible={!showSidebar}
          direction="right"
        >
          <div className="sidebar d-flex flex-column p-1">
            <IconButton
              className="sidebar-toggle absolute"
              iconId={!showSidebar ? 'x-lg' : 'list'}
              variant="primary"
              onClick={() => setShowSidebar(!showSidebar)}
            />
            <div className="d-flex align-c">
              <IconButton
                variant={published ? 'success' : 'secondary'}
                onClick={togglePublished}
                iconId={published ? 'eye' : 'eye-slash'}
              />{published ? 'published' : 'draft'}
            </div>
            {
              id && (
                <div className="d-flex align-c">
                  <IconButton
                    iconId="trash"
                    variant="danger"
                    onClick={() => setShowDeleteConfirm(true)}
                  />delete
                </div>
              )
            }
            <FileInput buttonText="image" onChange={setImage} initialPreview={image} />
            <hr />
            <div className="d-flex align-c">
              <IconButton
                iconId={id ? 'floppy' : 'check-lg'}
                variant="alpha"
                onClick={() => setShowFormConfirm(true)}
                disabled={!isFormValid}
              />{id ? 'save' : 'create'}
            </div>
          </div>
        </AnimatedBlock>

        <div className="d-flex flex-column element-wrapper">
          <div className="d-flex flex-column element-wrapper">
            <Input className="w-100" value={title} placeholder="Title" onChange={setTitle} required />
            <Textarea value={desc} placeholder="Description..." onChange={setDesc} required />
          </div>

          <Title text="Links" size="s" />
          <div className="project-form-links d-flex element-wrapper">
            {
              Object.entries(links).map(([key, value]) => (
                <Input
                  key={key}
                  iconId={linksAlias[key as keyof typeof linksAlias]}
                  value={value}
                  onChange={val => updateLink(key, val)}
                  placeholder={key}
                />
              ))
            }
          </div>

          <Title text="FAQs" size="s" />
          {
            !faq.length && (
              <div className="element-wrapper">
                <IconButton text="add FAQ" iconId="plus-lg" variant="alpha" onClick={addFaq} />
              </div>
            )
          }
          {
            faq.map((item, index) => {
              const isLast = index === faq.length - 1;
              return (
                <div key={index} className="element-wrapper d-flex align-c">
                  <div className="d-flex flex-column">
                    <IconButton
                      variant={item.published ? 'primary' : 'secondary'}
                      onClick={() => publishFaq(index)}
                      iconId={item.published ? 'eye' : 'eye-slash'}
                    />
                    <IconButton
                      className="remove-faq-button"
                      iconId="trash"
                      variant="primary"
                      onClick={() => removeFaq(index)}
                    />
                    {isLast && (
                      <IconButton iconId="plus-lg" variant="primary" onClick={addFaq} />
                    )}
                  </div>
                  <div className="d-flex flex-auto flex-column">
                    <Input
                      iconId="question-lg"
                      value={item.question}
                      onChange={val => updateFaq(index, 'question', val)}
                      placeholder="Question"
                      required
                    />
                    <Textarea
                      iconId="card-text"
                      value={item.answer}
                      placeholder="Answer..."
                      onChange={val => updateFaq(index, 'answer', val)}
                      required
                    />
                  </div>
                </div>
              );
            })
          }
        </div>
      </form>

      <AnimatedBlock visible={showFormConfirm} direction="bottom">
        <div className="popup d-flex flex-column align-c justify-c">
          <Title text="ARE YOU SURE???" size="l" />
          <div className="d-flex">
            <IconButton
              text="yep"
              iconId="check-lg"
              variant="alpha"
              onClick={() => formRef.current?.requestSubmit()}
            />
            <IconButton
              text="nope"
              iconId="x-lg"
              variant="alpha"
              onClick={() => setShowFormConfirm(false)}
            />
          </div>
        </div>
      </AnimatedBlock>

      <AnimatedBlock visible={showDeleteConfirm} direction="bottom">
        <div className="popup d-flex flex-column align-c justify-c">
          <Title text={`Delete ${title}?`} size="l" />
          <div className="d-flex">
            <IconButton
              text="yep"
              iconId="check-lg"
              variant="alpha"
              onClick={handleDelete}
            />
            <IconButton
              text="nope"
              iconId="x-lg"
              variant="alpha"
              onClick={() => setShowDeleteConfirm(false)}
            />
          </div>
        </div>
      </AnimatedBlock>
    </div>
  );
}
