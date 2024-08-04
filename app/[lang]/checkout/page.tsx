import Image from 'next/image'

import Logo from "@/public/İSTANBUL.png"
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { pink } from '@mui/material/colors'
const checkout = () => {
  return (
<div className="checkout_area section_padding_100">
            <div className="w-4/5 mx-auto">
                <div className="grid md:grid-cols-2  grid-cols-1 gap-2">

                    <div >
                        <div className="checkout_details_area mt-52">

                            <div className="cart-page-heading">
                                <h5>Billing Address</h5>
                                <p>Enter your cupone code</p>
                            </div>
                            <form className="w-full max-w-lg" >
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
    Ad
      </label>
      <input name='firstname' className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  focus:border-gray-500" id="grid-first-name" type="text" />

    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
      Soyad
      </label>
      <input name='lastname' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
       Əlaqə Nömrəsi
       <sup className='text-red-500'>*</sup>
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phonenumber" type="text" placeholder=""/>
      <p className="text-gray-600 text-xs italic">Əmakdaşımızın əlaqə saxlmağı üçün</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
       Email
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder=""/>
      <p className="text-gray-600 text-xs italic">Elektron şəkildə çekinizi göndərməyimiz üçün</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Ünvan
        <sup className='text-red-600'>*</sup>
      </label>
      <input name='address' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder=""/>
      <p className="text-gray-600 text-xs italic alert alert-danger">Ünvanı ətraflı şəkildə qeyd edin.</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        City
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        State
      </label>
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Zip
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
    </div>
  </div>
</form>
                        
                        </div>
                    </div>

                    <div >
                        <div className="order-details-confirmation">

                            <div className="cart-page-heading flex justify-between">
                                <div>
                                <h5>E-Çek</h5>

                                <p>Məzmunu</p>
                                </div>
                                <div>
                                  <Image src={Logo} width={200} height={100} alt='istanbul Shoes Logo'/>
                                </div>
                            </div>

                            <ul className="order-details-form mb-4">
                                <li><span>Məhsul Adı</span><span>ölçüsü</span> <span>Miqdarı</span><span>Ədəd Qiyməti</span> <span>Cəmi</span></li>
                                <li><span>Cocktail Yellow dress</span> <span>36</span> <span>1</span><span>36$</span> <span>36$</span></li>

                                <li><span>Cəmi</span> <span>$36.00</span></li>
                                <li><span>Çatdirilma</span> <span>Pulsuz</span></li>
                                <li><span>Yekun Cəm</span> <span>$36.00</span></li>
                            </ul>

                            <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
defaultValue={"Kuryerə Ödəniş"}
  >
    <FormControlLabel value="Kuryerə Ödəniş" control={<Radio     sx={{
        color: pink[800],
        '&.Mui-checked': {
          color: pink[600],
        },
      }} />} label="Kuryerə Ödəniş" />
    <FormControlLabel value="Kartla Ödəniş" control={<Radio    sx={{
        color: pink[800],
        '&.Mui-checked': {
          color: pink[600],
        },
      }} />} 
      label="Kartla Ödəniş" />
  </RadioGroup>
                            <a href="#" className="p-2 karl-checkout-btn flex justify-center items-center my-2">Ödəniş Et</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default checkout