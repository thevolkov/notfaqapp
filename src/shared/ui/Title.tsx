import './Title.css'

export default function Title({ text, size, color }: { text: string; size?: string; color?: string }) {
  return (
    <div className={`title ${size} ${color}`}>
      {text}
    </div>
  )
}
