import { Box } from '@mui/material';
import { createCheckListById } from '../../TrelloApi.jsx';
import Form from '../ListForm.jsx';

const AddCheckList = ({ setShowAddChecklist, checkListData, setCheckListData, selectedCardId }) => {


    const handleCancelCheckList = () => {
        setShowAddChecklist(false);
    }

    const handleCreateCheckList = async (name) => {
        try {
            console.log(name);
            console.log(selectedCardId);
            const res = await createCheckListById(selectedCardId, name);
            setCheckListData([...checkListData, res.data]);
            setShowAddChecklist(false)
        } catch (err) {
            console.error("Error Occured", err);
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