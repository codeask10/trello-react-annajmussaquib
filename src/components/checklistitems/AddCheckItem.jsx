import { createCheckItems } from '../../TrelloApi.jsx';
import Form from '../ListForm.jsx';

const AddCheckItem = ({ setShowCheckItem, checkListId, checkItemData, setCheckItemData }) => {
    const handleCreateCheckItem = async name => {
        try {
            const res = await createCheckItems(checkListId, name);
            const data = await res.data;
            setCheckItemData([...checkItemData, data]);
            setShowCheckItem(false);
        } catch (error) {
            console.error("Error occured", error);
        }
    }

    const handleCancelCheckItem = () => {
        setShowCheckItem(false)
    }
    return (
        <Form
            handleAddTo={handleCreateCheckItem}
            handleCancel={handleCancelCheckItem}
        />
    )
}

export default AddCheckItem