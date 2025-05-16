import { useState, type ChangeEvent } from 'react';
import IconButton from './IconButton'
import './FileInput.css';

interface FileInputProps {
  buttonText: string;
  onChange: (url: string) => void;
  initialPreview?: string;
}

export default function FileInput({ buttonText, onChange, initialPreview }: FileInputProps) {
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

  const handleRemove = () => setPreview('');

  return (
    <div className="file-input">
      {preview && (
        <div className="preview-block">
          <img src={preview} alt="Preview" className="file-preview" />
          <IconButton
            className="remove-button"
            onClick={handleRemove}
            iconId="plus"
            variant="danger"
            rotate
          />
        </div>
      )}

      {!preview && (
        <label className="file-label">
          {buttonText}
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            hidden
          />
        </label>
      )}
    </div>
  );
}
