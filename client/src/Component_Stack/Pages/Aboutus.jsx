import rishi from "../../assets/profiles/rishiprofile.png";
import { useContext } from "react";
import {AuthenticationContext} from "../../Context/Authentication";

export default function AboutUs() {
  const auth = useContext(AuthenticationContext);
  

  const developer = {
    name: 'Rishi Raj',
    role: 'Developer & Manager',
    image: rishi
  }


  return (

    <div className="bg-n-8/90  text-gray-100 py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8 mt-10">
     
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            About Us
          </h1>
          <p className="mt-4 text-xl text-gray-300 sm:mt-6">
            Transforming ideas into reality through innovative software solutions.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Our Story</h2>
            <p className="mt-4 text-lg text-gray-300 sm:mt-6">
              Founded with a passion for technology and problem-solving, this project 
              represents my commitment to creating impactful software solutions. 
              Every line of code is crafted with attention to detail and a drive for excellence.
            </p>
          </div>

          <div className="mt-12 bg-gray-800 rounded-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white text-center sm:text-3xl">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-300 text-center sm:mt-6">
              To deliver high-quality, user-centric software that addresses real-world 
              challenges and enhances digital experiences. Through continuous learning 
              and innovation, we aim to push the boundaries of what's possible in software development.
            </p>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-20">
            <h2 className="text-2xl font-bold text-white text-center mb-8 sm:text-3xl sm:mb-12">
              Meet the Developer
            </h2>
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={developer.image}
                  alt={developer.name}
                />
              </div>
              <div className="mt-6 text-center sm:mt-0 sm:ml-8 sm:text-left">
                <h3 className="text-xl font-semibold text-white">{developer.name}</h3>
                <p className="text-lg text-primary">{developer.role}</p>
                <p className="mt-4 text-gray-300 max-w-2xl">
                  As the sole developer and manager of this project, I bring a unique blend of 
                  technical expertise and creative problem-solving to every challenge. My commitment 
                  to continuous learning and passion for clean, efficient code drives the success of our solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}