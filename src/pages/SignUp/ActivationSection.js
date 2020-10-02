import React from 'react'

const ActivationSection = ({ onInputChange, onSignUpClick, activationCode, validationError }) => (
  <div id={'activation'} className='p-3 p-lg-5'>

    <div className='form-group row'>
      <div className='col-md-12'>
        <label htmlFor='activation-code' className='text-black'>Aktivasyon Kodu <span className='text-danger'>*</span></label>
        <input
          onChange={onInputChange}
          type='text'
          className='form-control'
          id='activation-code'
          name='activationCode'
          placeholder='Aktivasyon kodunuzu giriniz'
          value={activationCode} />
      </div>
    </div>

    <div className='form-group row'>
      <div className='col-lg-12'>
        <button
          className='btn btn-primary btn-lg btn-block'
          onClick={onSignUpClick}
          disabled={validationError}
        >Üye Ol</button>
      </div>
    </div>
  </div>
)

export default ActivationSection