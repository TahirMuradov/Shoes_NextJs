import Image from "next/image"
import logo from '../../public/İSTANBUL.png'
const Footer:React.FC=()=>{
 
  return   (

  <footer className="footer_area">
      <div className="w-4/5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-2">
             
              <div className="">
                  <div className="single_footer_area">
                      <div className="footer-logo">
                          <Image src={logo} alt=""/>
                      </div>
                      <div className="copywrite_text d-flex align-items-center">
                          <p>
Copyright &copy;<script>Current Date</script> All rights reserved | Made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a> &amp; distributed by <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
</p>
                      </div>
                  </div>
              </div>
            
              <div className="">
                  <div className="single_footer_area">
                      <ul className="footer_widget_menu">
                          <li><a href="#">About</a></li>
                          <li><a href="#">Blog</a></li>
                          <li><a href="#">Faq</a></li>
                          <li><a href="#">Returns</a></li>
                          <li><a href="#">Contact</a></li>
                      </ul>
                  </div>
              </div>
          
              <div className="">
                  <div className="single_footer_area">
                      <ul className="footer_widget_menu">
                          <li><a href="#">My Account</a></li>
                          <li><a href="#">Shipping</a></li>
                          <li><a href="#">Our Policies</a></li>
                          <li><a href="#">Afiliates</a></li>
                      </ul>
                  </div>
              </div>
           
              <div className="">
                  <div className="single_footer_area">
                      <div className="footer_heading mb-30">
                          <h6>Subscribe to our newsletter</h6>
                      </div>
                      <div className="subscribtion_form">
                          <form action="#" method="post">
                              <input type="email" name="mail" className="mail" placeholder="Your email here"/>
                              <button type="submit" className="submit">Subscribe</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <div className="line"></div>

         
          <div className="footer_bottom_area">
              <div className="grid grid-cols-1">
                  <div className="">
                      <div className="footer_social_area text-center">
                          <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                          <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                          <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                          <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </footer>
  )

}
export default Footer