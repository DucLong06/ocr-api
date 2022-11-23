import loadingIcon from '../../assets/media/general/loading.svg'

type Props = {}

const Loading = ({...props}: Props) => {
  return (
        <div className='flex justify-center' {...props}>
            <img src={loadingIcon} alt="loading icon"/>
        </div>
  )
}

export default Loading