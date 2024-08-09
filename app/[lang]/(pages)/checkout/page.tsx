import Image from 'next/image';
import Logo from "@/public/İSTANBUL.png";
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import { CheckOutLaunguage } from '@/types/DictionaryTypes/Dictionary';

const page = async ({ params }: { params: { lang: Locale } }) => {
  const dictionary: CheckOutLaunguage = (await getDictionary(params.lang)).CheckOut;

  return (
    <div className="checkout_area section_padding_100">
      <div className="w-4/5 mx-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <div>
            <div className="checkout_details_area mt-52">
              <div className="cart-page-heading">
                <h5>{dictionary.BillingAddress}</h5>
              </div>
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {dictionary.FirstName}
                    </label>
                    <input
                      name='firstname'
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-first-name"
                      type="text"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      {dictionary.LastName}
                    </label>
                    <input
                      name='lastname'
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {dictionary.PhoneNumber} <sup className='text-red-500'>*</sup>
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="phonenumber"
                      type="text"
                      placeholder=""
                    />
                    <p className="text-gray-600 text-xs italic">{dictionary.PhoneNumberDescription}</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {dictionary.Email}
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="email"
                      placeholder=""
                    />
                    <p className="text-gray-600 text-xs italic">{dictionary.EmailDescription}</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {dictionary.Adress} <sup className='text-red-600'>*</sup>
                    </label>
                    <input
                      name='address'
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="text"
                      placeholder=""
                    />
                    <p className="text-gray-600 text-xs italic alert alert-danger">{dictionary.AdressDescription}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="order-details-confirmation">
              <div className="cart-page-heading flex justify-between">
                <div>
                  <h5>{dictionary.order.OrderName}</h5>
                  <p>{dictionary.order.Content}</p>
                </div>
                <div>
                  <Image src={Logo} width={200} height={100} alt='İstanbul Shoes Logo'/>
                </div>
              </div>

              <ul className="order-details-form mb-4">
                <li>
                  <span>{dictionary.order.ProductName}</span>
                  <span>{dictionary.order.ProductSize}</span>
                  <span>{dictionary.order.ProductCount}</span>
                  <span>{dictionary.order.ProductPrice}</span>
                  <span>{dictionary.order.Total}</span>
                </li>
                <li>
                  <span>Cocktail Yellow dress</span>
                  <span>36</span>
                  <span>1</span>
                  <span>36$</span>
                  <span>36$</span>
                </li>
                <li>
                  <span>{dictionary.order.Total}</span> <span>$36.00</span>
                </li>
                <li>
                  <span>{dictionary.order.Shipping}</span> <span>Pulsuz</span>
                </li>
                <li>
                  <span>{dictionary.order.FinalTotal}</span> <span>$36.00</span>
                </li>
              </ul>

              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                defaultValue={"Kuryerə Ödəniş"}
              >
                <FormControlLabel
                  value="Kuryerə Ödəniş"
                  control={<Radio sx={{
                      color: pink[800],
                      '&.Mui-checked': {
                        color: pink[600],
                      },
                    }} />}
                  label="Kuryerə Ödəniş"
                />
                <FormControlLabel
                  value="Kartla Ödəniş"
                  control={<Radio sx={{
                      color: pink[800],
                      '&.Mui-checked': {
                        color: pink[600],
                      },
                    }} />}
                  label="Kartla Ödəniş"
                />
              </RadioGroup>
              <a href="#" className="p-2 karl-checkout-btn flex justify-center items-center my-2">
                {dictionary.order.Button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
