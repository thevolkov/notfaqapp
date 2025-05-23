import './ProjectForm.css';
import {useState, useEffect, type FormEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProject,
  updateProject,
  type Project,
  type FAQ,
  type Links
} from '../../entities/project/projectSlice';
import FileInput from '../../shared/ui/FileInput/FileInput';
import Title from '../../shared/ui/Title/Title';
import IconButton from '../../shared/ui/IconButton/IconButton';
import {useBackButton} from '../../shared/lib';
import Input from '../../shared/ui/Input/Input';
import Textarea from '../../shared/ui/Textarea/Textarea';
import {type RootState} from '../../app/store';
import {useParams} from 'react-router-dom';
import {linksAlias} from '../../shared/constants';

export default function ProjectForm() {
  const dispatch = useDispatch();
  const {id} = useParams<{id: string}>();
  const projects = useSelector((state: RootState) => state.projects.projects);

  const {handleBack} = useBackButton();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [links, setLinks] = useState<Links>({
    telegram: '',
    community: '',
    x: '',
    web: '',
    support: ''
  });
  const [faq, setFaq] = useState<FAQ[]>([{id: '', question: '', answer: ''}]);

  useEffect(() => {
    if (!id) return;
    const projectData = projects.find((p) => p.id === id);
    if (projectData) {
      console.log(projectData.image)

      setTitle(projectData.title);
      setImage(projectData.image);
      setDesc(projectData.desc);
      setLinks(projectData.links);
      setFaq(projectData.faq);
    }
  }, [id, projects]);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newProject: Project = {
      id: id || String(Date.now()),
      title,
      image,
      desc,
      links,
      faq: faq.filter((item) => item.question.trim() && item.answer.trim())
    };

    if (id) {
      dispatch(updateProject(newProject));
    } else {
      dispatch(addProject(newProject));
    }

    handleBack();
    // onClose?.();
  };

  const updateLink = (key: string, value: string) => {
    setLinks((prev) => ({...prev, [key]: value}));
  };

  const addFaq = () => {
    setFaq((prev) => [...prev, {id: '', question: '', answer: ''}]);
  };

  const updateFaq = (
    index: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    setFaq((prev) =>
      prev.map((item, i) =>
        i === index ? {...item, [field]: value} : item
      )
    );
  };

  const removeFaq = (index: number) => {
    setFaq((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Title text={id ? 'Edit' : '+[n:fə]'} size="4xl" shadow shadowText={title} />
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-section dark-bg-wrapper">
          <Input
            value={title}
            placeholder="Title"
            onChange={setTitle}
            required
          />
          <Textarea
            value={desc}
            placeholder="Description..."
            onChange={setDesc}
            required
          />
          <FileInput
            // buttonText="Image"
            onChange={setImage}
            initialPreview={image}
          />
        </div>

        <Title text="Links" size="xl" />
        <div className="form-section links-row dark-bg-wrapper">
          {
            Object.entries(links).map(([key, value]) => (
              <Input
                key={key}
                iconId={linksAlias[key as keyof typeof linksAlias]}
                value={value}
                onChange={(val) => updateLink(key, val)}
                placeholder={key}
              />
            ))
          }
        </div>

        <Title text="FAQ's" size="xl" />
        {
          !faq.length && (
            <IconButton
              iconId="plus-lg"
              variant="light-alpha"
              onClick={addFaq}
              full
            />
          )
        }
        <div className="form-section">
          {
            faq.map((item, index) => (
              <div key={index} className="form-row faq-row dark-bg-wrapper">
                <div className="faq-row-buttons">
                  <IconButton
                    className="remove-faq-button"
                    iconId="trash"
                    variant="danger"
                    onClick={() => removeFaq(index)}
                  />
                  {
                    index === faq.length - 1 && (
                      <IconButton
                        iconId="plus-lg"
                        variant="light-alpha"
                        onClick={addFaq}
                        full
                      />
                    )
                  }
                </div>
                <div className="form-section">
                  <Input
                    iconId="question-lg"
                    value={item.question}
                    onChange={(value) => updateFaq(index, 'question', value)}
                    placeholder="Question"
                    required
                  />
                  <Textarea
                    iconId="card-text"
                    value={item.answer}
                    placeholder="Answer..."
                    onChange={(value) => updateFaq(index, 'answer', value)}
                    required
                  />
                </div>
              </div>
            ))
          }
        </div>

        <div className="form-actions">
          <IconButton
            text={id ? 'save' : 'create'}
            type="submit"
            iconId="check-lg"
            variant="dark-alpha"
            className="blur-bg"
            // half
          />
          <IconButton
            text="cancel"
            iconId="x-lg"
            variant="light-alpha"
            onClick={handleBack}
            className="blur-bg"
            // half
          />
        </div>
      </form>
    </>
  );
}
