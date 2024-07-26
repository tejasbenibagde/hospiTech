import { FiArrowRight } from "react-icons/fi";
import propTypes from 'prop-types'


const HomeCards = ( props ) => {
  return (
    <>
      <div className="inline-block bg-card-bg bg-opacity-35 backdrop-blur-sm  border-none h-36 w-15 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow-xl ">
        <div className="flex  w-full h-full flex-col justify-center -space-y-3.5 items-start">
          <p className="title text-white m-5 leading-6   text-lg">{props.title}</p>
          <div className="flex items-end justify-end w-full mb-0 content-end">
            <button className="bg-red-500 text-teal-50 border-none arrow-button border w-20 h-20 rounded-full flex justify-center items-center font-bold text-3xl shadow-xl text-right">
              <FiArrowRight />
            </button>
            </div>
        </div>
      </div>
    </>
  )
}
HomeCards.propTypes = {
  title: propTypes.string,
  } 
  HomeCards.defaultProps={
      title: "Management",
      
     }
export default HomeCards