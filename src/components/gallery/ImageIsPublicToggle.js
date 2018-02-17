import React from 'react'
// import  Toggle  from 'react-input-toggle';
// import 'react-input-toggle/dist/react-input-toggle.css';
 
const ImageIsPublicToggle = ({ toggle, isPublic }) =>  {
  const handleToggle = (e) => {
    const checkedVal = e.target.value
    toggle(checkedVal)
  }
  return (
    <div className='toggle'>
      <div>Would you like this image to appear publicly?</div>
      {/* <Toggle checked={isPublic} onChange={handleToggle} label={'PublicToggle'} effect={'sierra'} labelPosition={'right'} /> */}
      <label className='switch'>
        <input type='checkbox' />
        <span className='slider'></span>
      </label>
    </div>
  )
}

export default ImageIsPublicToggle