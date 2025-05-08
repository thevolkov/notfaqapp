import './PProjects.css'
import { CProjectCard } from "../../components/CProjectCard/CProjectCard"
import { CInput } from "../../components/CInput/CInput"
import LForm from "../../layouts/LForm/LForm"
import { CTitle } from "../../components/CTitle/CTitle"

export const PProjects = (props: any) => {

  return (
    <div className="projects">
      <CTitle text="Not Projects" />
      <LForm>
      <CInput text={"Search..."}/>
      </LForm>
      
      <div className="projects__list">
    {props.data.map((project: any) => (
            <CProjectCard
              id={project.id}
              title={project.title}
              image={project.image}
              key={project.id}
            />
          ))}
          </div>
    </div>
  )
}
