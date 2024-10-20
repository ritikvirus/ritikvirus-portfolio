import { Stack } from '@/components/icons/Stack'
import BentoBadge from './BentoBadge'
import TechStacks from './TechStacks'

const BentoItemTechStack = () => {
  return (
    <div className='relative h-full place-content-end space-y-3 p-5 tracking-wider'>
      <BentoBadge
        icon={Stack}
        text='Tech stack'
        className={{ component: 'absolute right-2 top-2' }}
      />
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
