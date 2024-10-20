import TechStacks from './TechStacks'

const BentoItemTechStack = () => {
  return (
    <div className='h-full place-content-end space-y-3 p-5 tracking-wider'>
      <TechStacks />
      <div className='space-y-2'>
        <p className='text-lg'>Tech stacks I’ve used</p>
        <p className='text-xs text-slate-400'>
          Primarily focused on the JavaScript ecosystem, but always eager to
          explore and learn new technologies.
        </p>
      </div>
    </div>
  )
}

export default BentoItemTechStack
