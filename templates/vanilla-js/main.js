import './style.css'

document.querySelector('#app').innerHTML = `
<div class='h-screen w-screen flex flex-col justify-center items-center select-none'>
<div class='absolute w-full h-full pointer-events-none overflow-hidden'></div>
<img class='w-96' src="../logo.png" alt="" />
<div class='mt-10 text-xl'>This <span class='text-2xl font-bold'>AZ</span> Template For Typescript React Application + TailwindCSS</div>
<div class='flex mt-10'>
  <div class='mx-5 bg-gray-200 py-5 px-10 rounded-lg font-semibold border border-black cursor-pointer hover:bg-gray-400'>Click Me</div>
</div>
</div>
`

