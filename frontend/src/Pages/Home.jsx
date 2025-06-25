import logo from '../assets/Logo CivicConnect.png'
import { Link } from 'react-router-dom';
import community from '../assets/community.png';

export default function Home(){
    const logoImg = logo;
    const communityImg = community;
    return(
        <>
        <div className="border-5 border-lime-100 h-screen w-screen fixed top-0 left-0 z-[-1]">

        </div>
        <div 
  className="container h-screen mx-auto w-screen flex flex-col items-center text-center justify-center bg-white"
  style={{ 
    backgroundImage: `url(${communityImg})`, 
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "center", 
    backgroundAttachment: 'fixed', 
    backgroundSize: "auto",

  }}
>
  <div className="bg-line"></div>

  {/* Hero Text Container */}
  <div className="hero-text relative h-100 w-1/2 p-5 bg-white rounded-md  shadow-md shadow-black flex flex-col items-center justify-center">

    {/* Background Overlay */}
    {/* <div className="absolute inset-0 rounded-md"></div> */}

    {/* Actual Text Content (opaque) */}
    <div className="relative z-10 text-center text-xl font-bold text-black p-5">
      
        Welcome to <span className="font-bold">&nbsp;PULSE</span> <br />
      (People Uniting for Local Safety and Environment) <br />
      Join our community and talk to us about any and everything troubling you and your neighbourhood. <br/>
      <button className='bg-offBlue border-1 shadow-lg text-black  hover:bg-teal-950 hover:text-white  mt-2 p-2 rounded-md'> <Link to='/report-issue'>Report an Issue</Link></button>
    </div>
  </div>
</div>

        
        </>
    )
}



// import logo from '../assets/Logo CivicConnect.png';
// import { Link } from 'react-router-dom';
// import community from '../assets/community.png';

// export default function Home() {
//   return (
//     <div className="h-screen w-screen relative overflow-hidden">
//       {/* Background Layer */}
//       <div
//         className="absolute inset-0 z-0 bg-white"
//         style={{
//           backgroundImage: `url(${community})`,
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           backgroundAttachment: 'fixed',
//           backgroundSize: "cover",
//         }}
//       ></div>

//       {/* Overlay to dim background */}
//       <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm z-10"></div>

//       {/* Content */}
//       <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
//         <div className="bg-white bg-opacity-80 rounded-xl shadow-xl p-8 md:max-w-2xl w-full">
//           <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4">
//             Welcome to <span className="text-lime-700">&nbsp;PULSE</span>
//           </h1>
//           <p className="text-base md:text-lg text-gray-700 mb-6">
//             (People Uniting for Local Safety and Environment) <br />
//             Join our community and talk to us about anything troubling you or your neighbourhood.
//           </p>
//           <Link to="/report-issue">
//             <button className="bg-offBlue text-black border border-gray-300 shadow hover:shadow-lg hover:translate-y-[-2px] transition-all duration-200 px-4 py-2 rounded-md">
//               Report an Issue
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
