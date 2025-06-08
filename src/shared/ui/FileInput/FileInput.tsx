import './FileInput.css';
import {useState, useEffect, type ChangeEvent} from 'react';
import IconButton from '../IconButton/IconButton'

interface FileInputProps {
  buttonText?: string;
  onChange: (url: string) => void;
  initialPreview?: string;
}

export default function FileInput({buttonText, onChange, initialPreview}: FileInputProps) {
  const [preview, setPreview] = useState(initialPreview || '');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return
    if (file.size > 512 * 1024) {
      alert('File size exceeds 512KB');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, JPEG, or PNG files are allowed');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview('')
    onChange('');
  };

  useEffect(() => {
    if (initialPreview) {
      setPreview(initialPreview);
    }
  }, [initialPreview]);

  return (
    <>
      {
        !preview && (
          <label className="file-input-label d-flex align-c pointer">
            <i className="bi bi-image b-radius" />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              hidden
            />
            {buttonText}
          </label>
        )
      }
      {
        preview && (
          <div className="file-input-preview d-flex">
            <img
              className="b-radius"
              src={
                preview
                  ? preview.startsWith('data:image')
                    ? preview
                    : `${import.meta.env.BASE_URL}${preview}`
                  : `${import.meta.env.BASE_URL}${initialPreview}`
              }
              alt="Preview"
            />
            <IconButton
              className="absolute"
              onClick={handleRemove}
              iconId="dash-lg"
              variant="primary"
            />
          </div>
        )
      }
    </>
  )
}
