import { useState } from 'react'
import Textarea from '@mui/joy/Textarea'
import Button from '@mui/joy/Button'
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'


const ListForm = ({ handleAddTo, handleCancel }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdder = () => {
        if (inputValue.trim() !== '') {
            handleAddTo(inputValue)
        }
    }

    return (
        <form >
            <Textarea
                required
                size='md'
                name='Size'
                placeholder='Enter title'
                autoFocus
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAdder()
                    }
                }}
                onChange={e => {
                    setInputValue(e.target.value)
                }}
                defaultValue=''
            />

            <Box className='addbutton' sx={{ display: "flex", gap: 5, my: 2 }}>
                <Button
                    type='submit'
                    size='md'
                    onClick={e => {
                        e.preventDefault()
                        handleAdder()
                    }}
                >
                    Add
                </Button>

                <CloseIcon
                    size='lg'
                    className=''
                    onClick={() => {
                        handleCancel()
                    }}
                />
            </Box>
        </form>
    )
}

export default ListForm
