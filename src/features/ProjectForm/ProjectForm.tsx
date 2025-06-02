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
    setFaq(prev => [...prev, {id: '', published: false, question: '', answer: ''}]);
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
    id: id || String(Date.now()),
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (id) {
      dispatch(updateProject(currentProject));
    } else {
      dispatch(addProject(currentProject));
    }

    handleBack();
  };

  return (
    <div className="project-form relative">
      <Title text={id ? `Edit ${title}` : '+[n:fə]'} size="2xl" shadow shadowText={title} />

      <IconButton iconId="list" variant="alpha" onClick={() => setShowSidebar(!showSidebar)}/>
      <form ref={formRef} className="d-flex" onSubmit={handleSubmit}>

        <AnimatedBlock visible={!showSidebar} direction="right">
        <div className="sidebar d-flex flex-column p-1">
          <FileInput buttonText=": Image" onChange={setImage} initialPreview={image} />

          <div className="d-flex align-c">
            <IconButton
              variant={published ? 'success' : 'secondary'}
              onClick={togglePublished}
              iconId={published ? 'eye' : 'eye-slash'}
            /> : {published ? 'Published' : 'Draft'}
          </div>

          {
            id && (
              <div className="d-flex align-c">
                <IconButton
                  iconId="trash"
                  variant="danger"
                  onClick={() => setShowDeleteConfirm(true)}
                /> : Delete
              </div>
            )
          }

          <hr />

          <div className="d-flex">
            <IconButton
              text={id ? 'save' : 'create'}
              iconId={id ? 'floppy' : 'check-lg'}
              variant="alpha"
              onClick={() => setShowFormConfirm(true)}
              disabled={!isFormValid}
            />
            <IconButton
              variant="alpha"
              iconId="arrow-90deg-left"
              text="Back"
              onClick={handleBack}
            />
          </div>
        </div>
        </AnimatedBlock>

        <div className="d-flex flex-column element-wrapper">
          <Title text="Title+Desc" size="s" />
          <div className="d-flex flex-column element-wrapper">
            <Input className="w-100" value={title} placeholder="Title" onChange={setTitle} required />
            <Textarea value={desc} placeholder="Description..." onChange={setDesc} required />
          </div>

          <Title text="Links" size="s" />
          <div className="project-form-links d-flex element-wrapper">
            {Object.entries(links).map(([key, value]) => (
              <Input
                key={key}
                iconId={linksAlias[key as keyof typeof linksAlias]}
                value={value}
                onChange={val => updateLink(key, val)}
                placeholder={key}
              />
            ))}
          </div>

          <Title text="FAQs" size="s" />
          {!faq.length && (
            <IconButton text="add FAQ" iconId="plus-lg" variant="alpha" onClick={addFaq} />
          )}

          {faq.map((item, index) => {
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
          })}
        </div>
      </form>

      {/* Confirm Form */}
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

      {/* Confirm Delete */}
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
      <AnimatedBlock visible={showDeleteConfirm} direction="right">
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
