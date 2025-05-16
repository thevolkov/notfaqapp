import { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  addProject,
  updateProject,
  type Project,
  type FAQ,
  type Links
} from '../../entities/project/projectSlice';
import FileInput from '../../shared/ui/FileInput';
import Title from '../../shared/ui/Title';
import './ProjectForm.css';

interface ProjectFormProps {
  project?: Project;
  onClose: () => void;
}

export default function ProjectForm({ project, onClose }: ProjectFormProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(project?.title || '');
  const [image, setImage] = useState(project?.image || '');
  const [desc, setDesc] = useState(project?.desc || '');
  const [links, setLinks] = useState<Links>(project?.links || { tg: '', x: '', web: '', supp: '' });
  const [faq, setFaq] = useState<FAQ[]>(project?.faq || [{ question: '', answer: '' }]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newProject: Project = {
      id: project?.id || '',
      title,
      image,
      desc,
      links,
      faq: faq.filter((item) => item.question.trim() !== '' && item.answer.trim() !== ''),
    };
    if (project) {
      dispatch(updateProject(newProject));
    } else {
      dispatch(addProject(newProject));
    }
    onClose();
  };

  const updateLink = (link: string, value: string) => {
    setLinks(prev => ({ ...prev, [link]: value }));
  };

  const addFaq = () => setFaq([...faq, { question: '', answer: '' }]);
  const updateFaq = (
    index: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    const newFaq = [...faq];
    newFaq[index] = { ...newFaq[index], [field]: value };
    setFaq(newFaq);
  };
  const removeFaq = (index: number) => {
    setFaq(faq.filter((_, i) => i !== index));
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <Title text={project ? 'Edit Project' : 'Create Project'} />
        <form onSubmit={handleSubmit}>

            <input value={title} onChange={(e) => setTitle(e.target.value)} required />

            <FileInput
              buttonText="Choose Image"
              onChange={setImage}
              initialPreview={image}
            />
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required />
          <div className="form-section links-row">
            <Title text={'Links'} />
            {Object.entries(links).map((link, index) => (
              <div key={index} className="form-row">
                <input
                  value={link[1]}
                  onChange={(e) => updateLink(link[0], e.target.value)}
                  placeholder={link[0]}
                />
              </div>
            ))}
          </div>
          <div className="form-section">
            <Title text={'FAQ'} />
            {faq.map((item, index) => (
              <div key={index} className="form-row faq-row">
                <input
                  value={item.question}
                  onChange={(event) => updateFaq(index, 'question', event.target.value)}
                  placeholder="Question"
                  required
                />
                <input
                  value={item.answer}
                  onChange={(event) => updateFaq(index, 'answer', event.target.value)}
                  placeholder="Answer"
                  required
                />
                <button type="button" onClick={() => removeFaq(index)} className="remove-button">
                  Remove FAQ
                </button>
              </div>
            ))}
            <button type="button" onClick={addFaq}>
              Add FAQ
            </button>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
