import Image from 'next/image';
import Logo from "@/public/İSTANBUL.png";
import { FormControlLabel, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
              <div className='order-details-form mb-4'>

              <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Məhsul Kodu</TableCell>
            <TableCell align="right">Məhsul adı</TableCell>
            <TableCell align="right">Ölçü</TableCell>
            <TableCell align="right">Say</TableCell>
            <TableCell align="right">Qiymət</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               Name
              </TableCell>
              <TableCell align="right">calories</TableCell>
              <TableCell align="right">fat</TableCell>
              <TableCell align="right">carbs</TableCell>
              <TableCell align="right">protein</TableCell>
            </TableRow>
           
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              <TableCell component="th" scope="row">
               Name
              </TableCell>
              <TableCell align="right">calories</TableCell>
              <TableCell align="right">fat</TableCell>
              <TableCell align="right">carbs</TableCell>
              <TableCell align="right">protein</TableCell>
            </TableRow>   
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               Name
              </TableCell>
              <TableCell align="right">calories</TableCell>
              <TableCell align="right">fat</TableCell>
              <TableCell align="right">carbs</TableCell>
              <TableCell align="right">protein</TableCell>
            </TableRow>   
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               Name
              </TableCell>
              <TableCell align="right">calories</TableCell>
              <TableCell align="right">fat</TableCell>
              <TableCell align="right">carbs</TableCell>
              <TableCell align="right">protein</TableCell>
            </TableRow> 
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell component="th" scope="row">
              Catdirilma 
              </TableCell>
              <TableCell ></TableCell>
              <TableCell align="right">10 Azn</TableCell>
             
            </TableRow>  
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell component="th" scope="row">
              Cəmi
              </TableCell>
              <TableCell ></TableCell>
              <TableCell align="right">110 Azn</TableCell>
             
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
              </div>
           

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
