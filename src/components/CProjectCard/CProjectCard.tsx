import './CProjectCard.css'

export const CProjectCard = (props: any) => {
  return (
    <div className="project-card">
      <img className="project-card__image" id={props.id} src={props.image} alt={props.title}/>
      <div className="project-card__title text-36">{props.title}</div>
    </div>
  )
}
