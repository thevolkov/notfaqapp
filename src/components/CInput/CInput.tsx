import "./CInput.css"

export const CInput = ({ text = 'Type here...' }: { text?: string }) => {
  return (
    <input
      className="custom-input"
      type="text"
      placeholder={text}
    />
  );
};