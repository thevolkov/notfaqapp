import "./LForm.css"

const LForm = (props: any) => {
  return (

        <form className="form-layout">
          {props.children}
        </form>

  );
};

export default LForm;