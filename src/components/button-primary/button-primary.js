import './button-primary.css'

const PrimaryButton = (props) => {
    return <button type='submit' className={`button-primary ${props.classes}`} onClick={props.onClick}>{props.text}</button>
}

export default PrimaryButton;