// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import datepicker from 'js-datepicker';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/overlook-logo.jpg';
import './images/village-on-lake.jpg';
import './images/single room.jpg';
import './images/junior suite.jpg';
import './images/residential.jpg';

console.log('This is the JavaScript entry file - your code begins here.');

//datePicker
const picker = datepicker(selector, options);

const gettingStarted = () => {
  console.log('Starting Overlook Setup');
};
