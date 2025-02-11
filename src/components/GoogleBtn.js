import React from 'react';
import GoogleButton from 'react-google-button'

const GoogleBtn = () => {
return (
<div>
<GoogleButton
onClick={() => { console.log('Google button clicked') }}
className='w-100'
/>

</div>
);
}

export default GoogleBtn;
