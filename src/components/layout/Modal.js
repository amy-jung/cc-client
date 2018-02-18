import React from 'react'

export default ({ type, methods }) => {
  let thisInput
  const renderFormArea = () => {
    switch (type) {
      case 'upload' :
        return {
          label: '', 
          inputType: 'file',
          buttonTxt: 'Upload',
          buttonAction: e => { methods.upload(e, thisInput) }
        }
      default : 
        return
    }
  }
  const { label, inputType, buttonTxt, buttonAction } = renderFormArea()
  return (
    <div className='modal'>
      <div className='modal-logo-wrapper'><img alt='logo' src='/CC_Logo.png'/></div>
      <div className='form-field-wrapper'>
        <div className='label'>{ label }</div>
        <input ref={ref => {thisInput = ref}} type={inputType} />
        <div className='btn' onClick={buttonAction}>{ buttonTxt }</div>
      </div>

    </div>
  )
}
