const TypingDetail = () => {
  return (
    <div className=''>
      <p className='capitalize'>time</p>
      <p>30s</p>
    </div>
  )
}

const TypingSpeed = () => {
  return (
    <div>
      <div className='flex items-baseline gap-4'>
        <p className='text-7xl'>128</p>
        <p>WPM</p>
      </div>
      <TypingDetail />
    </div>
  )
}

export default TypingSpeed
