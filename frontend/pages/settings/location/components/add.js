import { Dialog } from 'primereact/dialog';


const Add = ({ header, handleClose, visible, content }) => {

    return (
        <Dialog
            header={header}
            visible={visible}
            style={{ width: '25vw' }}
            onHide={handleClose}
            maskClassName='bg-dim'
            headerClassName='p-4'
            keepInViewport
            modal={true}
            dismissableMask={true}
            className='bg-white shadow-2xl rounded-2xl'>
            <div className=' border-solid border-b-[0.1px] border-gray-200 rounded-lg'></div>
            {content}
        </Dialog>
    )
}

export default Add;