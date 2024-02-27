import React from 'react'
// import FOF from '../Home/Assets/emprty.png'
import FOF from '../../assets/images/imgpsh_fullsize_anim.png';



const Event = () => {
return (
  <div id="evnet_booking">
  <div className="md:container md:mx-auto">
    <div className="relative p-4 bg-color rounded-lg shadow dark:bg-gray-800 sm:p-5">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <section class="bg-transparent dark:bg-gray-900">
          <div class="mx-auto max-w-screen-sm text-center">
              <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                <div>
                  {/* <img src={FOF} alt="404" /> */}
                </div>
              </h1>
              {/* <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry we cant find that page. You'll find lots to explore on the home page </p> */}
              <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">plase check your venue id </p>
              <a href="/" class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Event Page</a>
          </div>  
        </section> 
    </div>
    </div>
  </div>
</div>
  );
};

export default Event