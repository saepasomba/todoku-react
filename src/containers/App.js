import './App.css';
import SearchBar from '../components/SearchBar'
import CustomButton from '../components/CustomButton';


export function addButtonClicked() {
    console.log('hello')
}

function App() {
  return (
    <div className="container w-1/2 mx-auto text-center">
      <h1 className='font-bold text-5xl m-3'>Todoku</h1>
      <div className='container header grid grid-cols-[70%_30%] gap-5 justify-center items-end mx-auto p-5 rounded-lg border border-gray-500'>
        <div className='header-left flex flex-col gap-2'>
          <SearchBar />
          <CustomButton content='Search' />
        </div>
        <div className='container header-right'>
          <CustomButton content='Add new task' />
        </div>
      </div>
    </div>
  );
}

export default App;
