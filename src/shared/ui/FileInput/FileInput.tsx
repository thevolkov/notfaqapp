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
    <div className="file-input">
      {
        preview && (
          <div className="preview-block">
            <img
              className="file-preview b-radius"
              src={preview || initialPreview}
              alt="Preview"
            />
            <IconButton
              className="remove-button blur-bg"
              onClick={handleRemove}
              iconId="x-lg"
              variant="danger"
            />
          </div>
        )
      }
      {
        !preview && (
          <>
            <label className="file-label">
              <i className="bi bi-image" />
              {buttonText}
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                hidden
              />
            </label>
            <div>: FAQ Image</div>
          </>
        )
      }
    </div>
  );
}
