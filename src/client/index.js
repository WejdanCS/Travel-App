import { handleSubmit } from './js/formHandler';
import { isNotEmpty } from './js/emptyChecker';
import { saveTrip } from "./js/saveTrip";
import { postData } from "./js/postData";
import { displayWeatherStatus } from "./js/tripInfo";
import { displayErrorMsg } from "./js/displayErrorMsg";


import "./styles/header.scss"
import "./styles/content.scss"
import './styles/resetes.scss'
import './styles/footer.scss'


export {
    handleSubmit,
    isNotEmpty,
    saveTrip,
    postData,
    displayWeatherStatus,
    displayErrorMsg
}