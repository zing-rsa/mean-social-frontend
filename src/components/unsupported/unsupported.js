import useWindowDimensions from '../../hooks/useWindowDimensions';
import './unsupported.css'

function Unsupported() {

    const { width } = useWindowDimensions();

    return (
        <>
            {width < 350 &&
                <div className='unsupported-container'>
                    <div className='unsupported-main'>Unsupported viewport dimensions</div>
                    <div className='unsupported-text'>why{'y'.repeat((350-width)/2) + '?'.repeat((350-width)/2)}</div>
                </div>
            }
        </>
    )
}

export default Unsupported;