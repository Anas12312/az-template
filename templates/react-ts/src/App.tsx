
function App() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center select-none'>
      <div className='absolute w-full h-full pointer-events-none overflow-hidden'></div>
      <img className='w-96' src="../logo.png" alt="" />
      <div className='mt-10 text-xl'>This <span className='text-2xl font-bold'>AZ</span> Template For Typescript React Application + TailwindCSS</div>
      <div className='flex mt-10'>
        <div className='mx-5 bg-gray-200 py-5 px-10 rounded-lg font-semibold border border-black cursor-pointer hover:bg-gray-400'>Click Me</div>
      </div>
    </div>
  )
}

export default App
