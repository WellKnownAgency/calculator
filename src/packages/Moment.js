import moment from 'moment'
moment.locale();
import momentDurationFormatSetup from "moment-duration-format"
momentDurationFormatSetup(moment)

export default moment

