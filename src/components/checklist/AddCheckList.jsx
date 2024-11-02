import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

import { createCheckListById } from '../../TrelloApi.jsx';
import Form from '../ListForm.jsx';

const AddCheckList = ({ setShowAddChecklist, checkListData, setCheckListData, selectedCardId }) => {
    const navigate = useNavigate();
    const handleCancelCheckList = () => {
        setShowAddChecklist(false);
    }

    const handleCreateCheckList = async (name) => {
        try {
            console.log(name);
            console.log(selectedCardId);
            const res = await createCheckListById(selectedCardId, name);
            setCheckListData([...checkListData, res.data]);
            setShowAddChecklist(false);
            toast.success("Created Checklist Successfully");
        } catch (err) {
            toast.error("Internal Server Error", err);
            navigate("/error-page");
        }
    }
    return (
        <Box border="1px solid gray" padding="1rem">
            <Form
                handleAddTo={handleCreateCheckList}
                handleCancel={handleCancelCheckList}
            />
        </Box>
    )
}

export default AddCheckList;